import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    background-color: #7b1fa2;
  }
`;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
`;

const RegisterForm = styled.form`
  background: #f3e5f5;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  border: 1px solid #9c27b0;
`;

const Title = styled.h2`
  color: #4a0e4e;
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #9c27b0;
  padding-bottom: 0.5rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a0e4e;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #9c27b0;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #4a0e4e;
    box-shadow: 0 0 0 2px rgba(74, 14, 78, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #9c27b0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7b1fa2;
  }
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role: 'user', department }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.newUser.role);
        navigate('/user-dashboard');
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
          <InputGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="department">Department</Label>
            <Input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit">Register</Button>
        </RegisterForm>
      </RegisterContainer>
    </PageContainer>
  );
};

export default Register;