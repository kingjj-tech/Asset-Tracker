import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  color: #2c3e50;
  font-size: 2rem;
`;

const CreateButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
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

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = async id => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== id));
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
        <Title>Registered Users</Title>
        <CreateButton onClick={() => navigate('/create-user')}>Create User</CreateButton>
      </HeaderContainer>
      <SearchContainer>
        <SearchInput 
          type="text" 
          placeholder="Search users..." 
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
                <ActionLink as="button" onClick={() => handleDelete(user._id)}>Delete</ActionLink>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
};

export default ViewUsers;
