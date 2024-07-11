import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import io from 'socket.io-client';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e6e0e9;
  min-height: 100vh;
`;

const Title = styled.h2`
  color: #4a0e4e;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CreateButton = styled.button`
  background-color: #9c27b0;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #7b1fa2;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #9c27b0;
  border-radius: 4px;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #4a0e4e;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f3e5f5;
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #7b1fa2;
  color: white;
  padding: 1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #d1c4e9;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #ede7f6;
  }
  &:hover {
    background-color: #d1c4e9;
  }
`;

const ActionLink = styled(Link)`
  text-decoration: none;
  color: #7b1fa2;
  margin-right: 1rem;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = styled.button`
  background-color: #4a0e4e;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #3a0a3e;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 0.5rem;
`;

const ViewAssets = () => {
  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/assets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();

    const socket = io('http://localhost:3000');

    socket.on('assetRegistered', (newAsset) => {
      setAssets(prevAssets => [...prevAssets, newAsset]);
    });

    socket.on('assetUpdated', (updatedAsset) => {
      setAssets(prevAssets => prevAssets.map(asset => asset._id === updatedAsset._id ? updatedAsset : asset));
    });

    socket.on('assetDeleted', (deletedAsset) => {
      setAssets(prevAssets => prevAssets.filter(asset => asset._id !== deletedAsset._id));
    });

    return () => socket.disconnect();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/assets/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setAssets(assets.filter(asset => asset._id !== id));
      } else {
        console.error('Error deleting asset');
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const filteredAssets = assets.filter(asset =>
    asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ButtonIcon>⬅️</ButtonIcon>
        Back
      </BackButton>
      <Title>Assets Overview</Title>
      <CreateButton onClick={() => navigate('/create-asset')}>Create New Asset</CreateButton>
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Search assets..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      <Table>
        <thead>
          <Tr>
            <Th>Type</Th>
            <Th>Make</Th>
            <Th>Model</Th>
            <Th>Purchase Date</Th>
            <Th>Warranty End Date</Th>
            <Th>Status</Th>
            <Th>Location</Th>
            <Th>Assigned To</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {filteredAssets.map(asset => (
            <Tr key={asset._id}>
              <Td>{asset.type}</Td>
              <Td>{asset.make}</Td>
              <Td>{asset.model}</Td>
              <Td>{new Date(asset.purchaseDate).toLocaleDateString()}</Td>
              <Td>{new Date(asset.warrantyEndDate).toLocaleDateString()}</Td>
              <Td>{asset.status}</Td>
              <Td>{asset.location}</Td>
              <Td>{asset.assigned_to ? asset.assigned_to : 'N/A'}</Td>
              <Td>
                <ActionLink to={`/update-asset/${asset._id}`}>Edit</ActionLink>
                <ActionLink as="button" onClick={() => handleDelete(asset._id)}>Delete</ActionLink>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
};

export default ViewAssets;