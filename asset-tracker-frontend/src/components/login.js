import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357abd;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          alert('Superuser login is not allowed.');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <Title>Login</Title>
        <InputGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;