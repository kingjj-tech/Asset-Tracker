import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e6e0e9; // Light purple background
`;

const NavBar = styled.nav`
  background-color: #4a0e4e; // Dark purple
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
    background-color: #7b1fa2; // Medium purple
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
`;

const LoginForm = styled.form`
  background: #f3e5f5; // Very light purple
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  border: 1px solid #9c27b0; // Medium purple
`;

const Title = styled.h2`
  color: #4a0e4e; // Dark purple
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #9c27b0; // Medium purple
  padding-bottom: 0.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a0e4e; // Dark purple
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #9c27b0; // Medium purple
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #4a0e4e; // Dark purple
    box-shadow: 0 0 0 2px rgba(74, 14, 78, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #9c27b0; // Medium purple
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7b1fa2; // Darker purple
  }
`;

const UserTypeSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const UserTypeButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? '#9c27b0' : '#e6e0e9'};
  color: ${props => props.active ? 'white' : '#4a0e4e'};
  border: 1px solid #9c27b0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
  }

  &:hover {
    background-color: #7b1fa2;
    color: white;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);

        if (data.user.role === 'superuser') {
          navigate('/superuser-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        alert(data.message || 'Login failed');
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
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </NavLinks>
      </NavBar>
      <LoginContainer>
        <LoginForm onSubmit={handleLogin}>
          <Title>Login</Title>
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
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit">Login</Button>
        </LoginForm>
      </LoginContainer>
    </PageContainer>
  );
};

export default Login;