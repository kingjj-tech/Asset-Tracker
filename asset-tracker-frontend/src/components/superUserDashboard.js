import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  &:hover {
    background: #0056b3;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const StatBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 45%;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2em;
  margin-bottom: 10px;
  color: #343a40;
`;

const StatLabel = styled.div`
  font-size: 1.2em;
  color: #6c757d;
`;

const ChartContainer = styled.div`
  margin: 40px 0;
`;

const ActivityContainer = styled.div`
  margin-top: 40px;
`;

const ActivityHeader = styled.h2`
  margin-bottom: 20px;
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ActivityItem = styled.li`
  background: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const SuperUserDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/stats/counts')
      .then(response => response.json())
      .then(data => {
        setUserCount(data.userCount);
        setItemCount(data.itemCount);
      })
      .catch(error => console.error('Error fetching counts:', error));

    fetch('http://localhost:3000/stats/historical-data')
      .then(response => response.json())
      .then(data => setHistoricalData(data))
      .catch(error => console.error('Error fetching historical data:', error));

    fetch('http://localhost:3000/stats/recent-activities')
      .then(response => response.json())
      .then(data => setRecentActivities(data))
      .catch(error => console.error('Error fetching recent activities:', error));
  }, []);

  return (
    <DashboardContainer>
      <Header>Superuser Dashboard</Header>
      <LinkContainer>
        <StyledLink to="/create-user">Create User</StyledLink>
        <StyledLink to="/view-users">View Users</StyledLink>
        <StyledLink to="/user-dashboard">User Dashboard</StyledLink>
      </LinkContainer>
      <StatsContainer>
        <StatBox>
          <StatNumber>{userCount}</StatNumber>
          <StatLabel>Users</StatLabel>
        </StatBox>
        <StatBox>
          <StatNumber>{itemCount}</StatNumber>
          <StatLabel>Items</StatLabel>
        </StatBox>
      </StatsContainer>
      <ChartContainer>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
            <Line type="monotone" dataKey="items" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <ActivityContainer>
        <ActivityHeader>Recent Activities</ActivityHeader>
        <ActivityList>
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index}>{activity.description}</ActivityItem>
          ))}
        </ActivityList>
      </ActivityContainer>
    </DashboardContainer>
  );
};

export default SuperUserDashboard;
