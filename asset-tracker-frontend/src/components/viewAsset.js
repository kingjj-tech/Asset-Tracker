import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import io from 'socket.io-client';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const CreateButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  &:hover {
    background-color: #2980b9;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: #3498db;
  color: white;
  padding: 1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ecf0f1;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #ecf0f1;
  }
`;

const ActionLink = styled(Link)`
  text-decoration: none;
  color: #3498db;
  margin-right: 1rem;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const ViewAssets = () => {
  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/assets')
      .then(response => response.json())
      .then(data => setAssets(data))
      .catch(error => console.error('Error fetching assets:', error));
    
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

  const handleDelete = async id => {
    try {
      const response = await fetch(`http://localhost:3000/assets/${id}`, {
        method: 'DELETE',
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
      <Title>Assets</Title>
      <CreateButton onClick={() => navigate('/create-asset')}>Create Asset</CreateButton>
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
