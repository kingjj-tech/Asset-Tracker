import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  background-color: #f0f8ff;
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #2c3e50;
  padding: 1rem 2rem;
  border-radius: 10px;
`;

const Title = styled.h1`
  color: #ecf0f1;
  font-size: 2.5rem;
`;

const CreateButton = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c0392b;
  }
`;

const StatContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const StatBox = styled.div`
  padding: 1.5rem;
  background-color: #3498db;
  border-radius: 10px;
  text-align: center;
  width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  color: #ecf0f1;
  font-weight: bold;
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
  color: #ecf0f1;
  margin-top: 0.5rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #3498db;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: #2980b9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  background-color: #34495e;
  color: white;
  padding: 1.5rem;
  text-align: left;
  font-size: 1.1rem;
`;

const Td = styled.td`
  padding: 1.5rem;
  background-color: white;
  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const Tr = styled.tr`
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ActionLink = styled(Link)`
  text-decoration: none;
  color: #3498db;
  margin-right: 1rem;
  font-weight: bold;
  transition: color 0.3s;
  &:hover {
    color: #2980b9;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s;
  &:hover {
    color: #c0392b;
  }
`;

const SuperuserDashboard = () => {
  const [counts, setCounts] = useState({ userCount: 0, itemCount: 0 });
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCounts();
    fetchUsers();
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await fetch('http://localhost:3000/stats/counts');
      const data = await response.json();
      setCounts(data);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== id));
        fetchCounts(); // Refresh counts after deletion
      } else {
        console.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>Superuser Dashboard</Title>
        <CreateButton onClick={() => navigate('/create-user')}>Create User</CreateButton>
      </HeaderContainer>
      <StatContainer>
        <StatBox>
          <StatNumber>{counts.userCount}</StatNumber>
          <StatLabel>Total Users</StatLabel>
        </StatBox>
        <StatBox>
          <StatNumber>{counts.itemCount}</StatNumber>
          <StatLabel>Total Items</StatLabel>
        </StatBox>
      </StatContainer>
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Search users by name, email, or role..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      <Table>
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <Tr key={user._id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <ActionLink to={`/update-user/${user._id}`}>Edit</ActionLink>
                <ActionButton onClick={() => handleDelete(user._id)}>Delete</ActionButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
};

export default SuperuserDashboard;