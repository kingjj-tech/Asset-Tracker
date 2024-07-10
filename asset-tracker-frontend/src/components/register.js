import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f0f8ff;
`;

const NavBar = styled.nav`
  background-color: #3498db;
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

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
`;

const RegisterForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  border: 1px solid #e0e0e0;
`;

const Title = styled.h2`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const UserTypeSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const UserTypeButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? '#3498db' : '#f0f8ff'};
  color: ${props => props.active ? 'white' : '#34495e'};
  border: 1px solid #3498db;
  cursor: pointer;
  transition: all 0.3s ease;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    background-color: #2980b9;
    color: white;
  }
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [userType, setUserType] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role: userType, department }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.newUser.role);

        if (userType === 'superuser') {
          navigate('/superuser-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <PageContainer>
      <NavBar>
        <NavTitle>Inventory System</NavTitle>
        <NavLinks>
          <NavLink to="/">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </NavLinks>
      </NavBar>
      <RegisterContainer>
        <RegisterForm onSubmit={handleRegister}>
          <Title>Register</Title>
          <UserTypeSelector>
            <UserTypeButton 
              type="button"
              active={userType === 'user'} 
              onClick={() => setUserType('user')}
            >
              User
            </UserTypeButton>
            <UserTypeButton 
              type="button"
              active={userType === 'superuser'} 
              onClick={() => setUserType('superuser')}
            >
              Superuser
            </UserTypeButton>
          </UserTypeSelector>
          <InputGroup>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="department">Department:</Label>
            <Input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </InputGroup>
          <Button type="submit">Register</Button>
        </RegisterForm>
      </RegisterContainer>
    </PageContainer>
  );
};

export default Register;