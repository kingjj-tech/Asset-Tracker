import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e6e0e9;
`;

const NavBar = styled.nav`
  background-color: #4a0e4e;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f3e5f5;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #9c27b0;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #9c27b0;
`;

const Title = styled.h2`
  color: #4a0e4e;
  font-size: 2rem;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1rem;
  background-color: #9c27b0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #7b1fa2;
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #545b62;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 0.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #9c27b0;
  border-radius: 4px;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #4a0e4e;
    box-shadow: 0 0 0 2px rgba(74, 14, 78, 0.2);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #9c27b0;
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #9c27b0;
  color: #212529;
`;

const Tr = styled.tr`
  background-color: #ffffff;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f3e5f5;
  }
`;

const ActionLink = styled(Link)`
  text-decoration: none;
  color: #9c27b0;
  margin-right: 1rem;
  font-weight: 500;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  &:hover {
    color: #7b1fa2;
    text-decoration: underline;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  &:hover {
    color: #a71d2a;
    text-decoration: underline;
  }
`;

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
      <NavBar>
        <NavTitle>Inventory System</NavTitle>
      </NavBar>
      <ContentContainer>
        <HeaderContainer>
          <Title>Registered Users</Title>
          <ButtonContainer>
            <BackButton onClick={() => navigate(-1)}>
              <ButtonIcon>⬅️</ButtonIcon>
              Back
            </BackButton>
            <Button onClick={() => navigate('/create-user')}>
              <ButtonIcon>➕</ButtonIcon>
              Create User
            </Button>
          </ButtonContainer>
        </HeaderContainer>
        <SearchInput 
          type="text" 
          placeholder="Search users..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
                  <ActionLink to={`/update-user/${user._id}`}>
                    <ButtonIcon>✏️</ButtonIcon>
                    Edit
                  </ActionLink>
                  <ActionButton onClick={() => handleDelete(user._id)}>
                    <ButtonIcon>🗑️</ButtonIcon>
                    Delete
                  </ActionButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </ContentContainer>
    </PageContainer>
  );
};

export default ViewUsers;