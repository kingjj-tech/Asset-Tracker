import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e6e0e9;
  min-height: 100vh;
`;
const LogoutButton = styled.button`
  background-color: #7b1fa2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #9c27b0;
  }
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
  background-color: #7b1fa2;
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

const ActivityList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ActivityItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #d1c4e9;
  &:last-child {
    border-bottom: none;
  }
`;

const UserDashboard = () => {
  const [totalAssets, setTotalAssets] = useState(0);
  const [assetsInUse, setAssetsInUse] = useState(0);
  const [availableAssets, setAvailableAssets] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssetOverview();
    fetchRecentActivities();
    fetchUserName();
  }, []);

  const fetchAssetOverview = async () => {
    try {
      const response = await fetch('http://localhost:3000/stats/asset-overview');
      const data = await response.json();
      setTotalAssets(data.totalAssets);
      setAssetsInUse(data.assetsInUse);
      setAvailableAssets(data.availableAssets);
    } catch (error) {
      console.error('Error fetching asset overview:', error);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const response = await fetch('http://localhost:3000/stats/recent-activities');
      const data = await response.json();
      setRecentActivities(data);
    } catch (error) {
      console.error('Error fetching recent activities:', error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
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

  return (
    <DashboardContainer>
      <Header>
        <Title>Inventory Management System</Title>
        <UserInfo>
          <div onClick={() => navigate('/profile')}>
            <UserAvatar src="/avatar-placeholder.png" alt="User Avatar" />
            <UserName>{userName}</UserName>
          </div>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </UserInfo>
      </Header>
      <Nav>
        <NavList>
          <NavItem><NavLink className="active">Dashboard</NavLink></NavItem>
          <NavItem><NavLink onClick={() => navigate('/reports')}>Reports</NavLink></NavItem>
        </NavList>
      </Nav>
      <Content>
        <h2>Quick Actions</h2>
        <QuickActions>
          <ActionLink to="/create-asset">
            <ActionIcon className="fas fa-plus-circle"></ActionIcon>
            <span>Create Asset</span>
          </ActionLink>
          <ActionLink to="/view-assets-dashboard">
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
            <WidgetTitle>Asset Overview</WidgetTitle>
            <div>
              <p>Total Assets: {totalAssets}</p>
              <p>Assets in Use: {assetsInUse}</p>
              <p>Available Assets: {availableAssets}</p>
            </div>
          </Widget>
          <Widget>
            <WidgetTitle>Recent Activities</WidgetTitle>
            <ActivityList>
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index}>{activity}</ActivityItem>
              ))}
            </ActivityList>
          </Widget>
        </Widgets>
      </Content>
    </DashboardContainer>
  );
};

export default UserDashboard;
