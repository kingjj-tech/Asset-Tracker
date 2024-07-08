import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #0078d4;
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
  background-color: #f3f2f1;
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
  color: #333;
  padding: 0.5rem 1rem;
  &:hover, &.active {
    background-color: #e1dfdd;
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
  color: #333;
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const WidgetTitle = styled.h3`
  margin-top: 0;
  border-bottom: 1px solid #e1dfdd;
  padding-bottom: 0.5rem;
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
  background-color: #f3f2f1;
  color: #333;
  font-weight: 600;
  text-align: left;
  padding: 12px 16px;
  border-bottom: 2px solid #e1dfdd;
`;

const UserTd = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e1dfdd;
`;

const UserTr = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #0078d4;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
  padding: 4px 8px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
    border-radius: 2px;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 4px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const SearchIcon = styled.i`
  color: #666;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #e1dfdd;
  border-radius: 2px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #0078d4;
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
          <UserName>....</UserName>
        </UserInfo>
      </Header>
      <Nav>
        <NavList>
          <NavItem><NavLink href="#dashboard" className="active">Dashboard</NavLink></NavItem>
          <NavItem><NavLink href="#" onClick={() => navigate('/reports')}>Reports</NavLink></NavItem>
          <NavItem><NavLink href="#" onClick={() => navigate('/settings')}></NavLink></NavItem>
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
          <ActionLink to="/generate-report">
            <ActionIcon className="fas fa-file-alt"></ActionIcon>
            <span>Generate Report</span>
          </ActionLink>
        </QuickActions>
        <Widgets>
          <Widget>
            <WidgetTitle>User Overview</WidgetTitle>
            <p>Total Users: {counts.userCount}</p>
            <p>Total Items: {counts.itemCount}</p>
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
                      <ActionButton onClick={() => handleDelete(user._id)}>
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