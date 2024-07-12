import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  background-color: #f8f9fa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.h2`
  color: #343a40;
  font-size: 2rem;
  font-weight: 600;
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
  background-color: #f8f9fa;
  color: #495057;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  color: #212529;
`;

const Tr = styled.tr`
  background-color: #ffffff;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f1f3f5;
  }
`;

const ViewHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/api/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>History</Title>
      </HeaderContainer>
      <Table>
        <thead>
          <Tr>
            <Th>Action</Th>
            <Th>User</Th>
            <Th>Timestamp</Th>
            <Th>Details</Th>
          </Tr>
        </thead>
        <tbody>
          {history.map(entry => (
            <Tr key={entry._id}>
              <Td>{entry.action}</Td>
              <Td>{entry.user.name}</Td>
              <Td>{new Date(entry.timestamp).toLocaleString()}</Td>
              <Td>{entry.details}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
};

export default ViewHistory;
