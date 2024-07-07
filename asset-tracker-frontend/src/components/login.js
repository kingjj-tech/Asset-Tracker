import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-200px'};
  width: 200px;
  height: 100%;
  background-color: #333;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

const SidebarButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: white;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

const BurgerMenu = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;

  div {
    width: 30px;
    height: 3px;
    background-color: white;
    transition: all 0.3s linear;
  }
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: auto;
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        body: JSON.stringify({ email, password, role: userType }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);

        if (userType === 'superuser') {
          navigate('/superuser-dashboard');
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectUserType = (type) => {
    setUserType(type);
    setIsSidebarOpen(false);
  };

  return (
    <LoginContainer>
      <Sidebar isOpen={isSidebarOpen}>
        <SidebarButton onClick={() => selectUserType('user')}>User</SidebarButton>
        <SidebarButton onClick={() => selectUserType('superuser')}>SuperUser</SidebarButton>
      </Sidebar>
      <BurgerMenu onClick={toggleSidebar}>
        <div />
        <div />
        <div />
      </BurgerMenu>
      <LoginForm onSubmit={handleLogin}>
        <Title>Login as {userType}</Title>
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