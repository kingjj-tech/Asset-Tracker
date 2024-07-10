import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f0f8ff;
  padding: 2rem;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: #3498db;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
`;

const ViewAssetHistory = () => {
  const [assetHistories, setAssetHistories] = useState([]);

  useEffect(() => {
    console.log('Fetching asset history');
    fetch('/assetHistory', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Asset history data:', data);
        setAssetHistories(data);
      })
      .catch(error => console.error('Error fetching asset histories:', error));
  }, []);

  return (
    <PageContainer>
      <Title>Asset History</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Asset ID</TableHeader>
            <TableHeader>User ID</TableHeader>
            <TableHeader>Assigned Date</TableHeader>
            <TableHeader>Returned Date</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {assetHistories.map(history => (
            <TableRow key={history.history_id}>
              <TableCell>{history.asset_id}</TableCell>
              <TableCell>{history.user_id}</TableCell>
              <TableCell>{new Date(history.assigned_date).toLocaleDateString()}</TableCell>
              <TableCell>{history.returned_date ? new Date(history.returned_date).toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell>{history.status}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
};

export default ViewAssetHistory;
