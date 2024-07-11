import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e6e0e9; // Light purple background
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #4a0e4e;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const Nav = styled.nav`
  background-color: #7b1fa2; // Darker purple for nav
  padding: 0.5rem 2rem;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const NavItem = styled.li`
  margin-right: 1rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  padding: 0.5rem 1rem;
  &:hover, &.active {
    background-color: #9c27b0;
    border-radius: 4px;
  }
`;

const Content = styled.main`
  padding: 2rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ActionLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: #9c27b0;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 2px 4px rgba(74, 14, 78, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(74, 14, 78, 0.15);
    background-color: #7b1fa2;
  }
`;

const ActionIcon = styled.i`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Widgets = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const Widget = styled.div`
  background-color: #f3e5f5;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const WidgetTitle = styled.h3`
  margin-top: 0;
  border-bottom: 1px solid #9c27b0;
  padding-bottom: 0.5rem;
  color: #4a0e4e;
`;

const UserManagementWidget = styled(Widget)`
  overflow: hidden;
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

const UserTh = styled.th`
  background-color: #9c27b0;
  color: white;
  font-weight: 600;
  text-align: left;
  padding: 12px 16px;
  border-bottom: 2px solid #7b1fa2;
`;

const UserTd = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #d1c4e9;
`;

const UserTr = styled.tr`
  &:nth-child(even) {
    background-color: #ede7f6;
  }
  &:hover {
    background-color: #d1c4e9;
  }
`;

const ActionButton = styled.button`
  background-color: ${props => props.delete ? '#d32f2f' : '#7b1fa2'};
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  padding: 6px 12px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;

  &:hover {
    background-color: ${props => props.delete ? '#b71c1c' : '#4a0e4e'};
  }
`;

const ButtonIcon = styled.span`
  margin-right: 4px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background-color: white;
  border-radius: 4px;
  padding: 8px;
`;

const SearchIcon = styled.i`
  color: #9c27b0;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  font-size: 14px;

  &:focus {
    outline: none;
  }
`;

const StatsBox = styled.div`
  background-color: #9c27b0;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;


const SuperuserDashboard = () => {
  const [counts, setCounts] = useState({ userCount: 0, itemCount: 0 });
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCounts();
    fetchUsers();
    fetchUserName();
  }, []);

  const fetchCounts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please log in first');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/stats/counts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCounts(data);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please log in first');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserName = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please log in first');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserName(data.name);
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please log in first');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setUsers(users.filter(user => user._id !== id));
        fetchCounts();
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
    <DashboardContainer>
      <Header>
        <Title>Superuser Dashboard</Title>
        <UserInfo onClick={() => navigate('/profile')}>
          <UserAvatar src="/avatar-placeholder.png" alt="User Avatar" />
          <UserName>{userName}</UserName>
        </UserInfo>
      </Header>
      <Nav>
        <NavList>
          <NavItem><NavLink href="#dashboard" className="active">Dashboard</NavLink></NavItem>
          <NavItem><NavLink href="#" onClick={() => navigate('/reports')}>Reports</NavLink></NavItem>
          <NavItem><NavLink href="#" onClick={() => navigate('/user-dashboard')}>User Dashboard</NavLink></NavItem>
        </NavList>
      </Nav>
      <Content>
        <h2>Quick Actions</h2>
        <QuickActions>
          <ActionLink to="/create-user">
            <ActionIcon className="fas fa-user-plus"></ActionIcon>
            <span>Create User</span>
          </ActionLink>
          <ActionLink to="/view-users">
            <ActionIcon className="fas fa-users"></ActionIcon>
            <span>View Users</span>
          </ActionLink>
          <ActionLink to="/view-assets">
            <ActionIcon className="fas fa-list"></ActionIcon>
            <span>View Assets</span>
          </ActionLink>
          <ActionLink to="/generate-report">
            <ActionIcon className="fas fa-file-alt"></ActionIcon>
            <span>Generate Report</span>
          </ActionLink>
        </QuickActions>
        <Widgets>
          <Widget>
            <WidgetTitle>User Overview</WidgetTitle>
            <StatsBox>
              <StatItem>
                <StatNumber>{counts.userCount}</StatNumber>
                <StatLabel>Total Users</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>{counts.itemCount}</StatNumber>
                <StatLabel>Total Items</StatLabel>
              </StatItem>
            </StatsBox>
          </Widget>
          <UserManagementWidget>
            <WidgetTitle>User Management</WidgetTitle>
            <SearchContainer>
              <SearchIcon className="fas fa-search" />
              <SearchInput
                type="text"
                placeholder="Search users by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
            <UserTable>
              <thead>
                <tr>
                  <UserTh>Name</UserTh>
                  <UserTh>Email</UserTh>
                  <UserTh>Role</UserTh>
                  <UserTh>Actions</UserTh>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <UserTr key={user._id}>
                    <UserTd>{user.name}</UserTd>
                    <UserTd>{user.email}</UserTd>
                    <UserTd>{user.role}</UserTd>
                    <UserTd>
                      <ActionButton as={Link} to={`/update-user/${user._id}`}>
                        <ButtonIcon>✏️</ButtonIcon> Edit
                      </ActionButton>
                      <ActionButton onClick={() => handleDelete(user._id)} delete>
                        <ButtonIcon>🗑️</ButtonIcon> Delete
                      </ActionButton>
                    </UserTd>
                  </UserTr>
                ))}
              </tbody>
            </UserTable>
          </UserManagementWidget>
        </Widgets>
      </Content>
    </DashboardContainer>
  );
};

export default SuperuserDashboard;