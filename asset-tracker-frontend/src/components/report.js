import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import io from 'socket.io-client';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaDownload } from 'react-icons/fa';

const ReportContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e6e0e9;
  min-height: 100vh;
`;

const ReportTitle = styled.h2`
  color: #4a0e4e;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ReportSection = styled.div`
  background-color: #f3e5f5;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f3e5f5;
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background-color: #7b1fa2;
  color: white;
  padding: 1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #d1c4e9;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #ede7f6;
  }
  &:hover {
    background-color: #d1c4e9;
  }
`;

const GenerateReportForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #9c27b0;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #9c27b0;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7b1fa2;
  }
`;

const DownloadButton = styled(Button)`
  background-color: #4caf50;
  &:hover {
    background-color: #45a049;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #9c27b0;
  border-radius: 4px;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #4a0e4e;
  }
`;

const Report = () => {
  const [reports, setReports] = useState([]);
  const [userIdentifier, setUserIdentifier] = useState('');
  const [users, setUsers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
    fetchUsers();

    const socket = io('http://localhost:3000');

    socket.on('reportGenerated', (newReport) => {
      setReports(prevReports => [...prevReports, newReport]);
    });

    return () => socket.disconnect();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/reports/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        console.error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const userMap = {};
        data.forEach(user => {
          userMap[user._id] = user.name;
        });
        setUsers(userMap);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userIdentifier })
      });
      if (response.ok) {
        alert('Report generated successfully');
        fetchReports();
      } else {
        console.error('Failed to generate report');
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleDownloadReport = async (reportId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/reports/download/${reportId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const doc = new jsPDF();
        doc.text(`Report Type: ${data.type}`, 10, 10);
        doc.text(`Generated By: ${data.generatedBy.name}`, 10, 20);
        doc.autoTable({ html: '#report-table' });
        doc.save('report.pdf');
      } else {
        console.error('Failed to download report');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const filteredReports = reports.filter(report => {
    const userName = users[report.generatedBy?._id];
    return userName && userName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <ReportContainer>
      <ReportTitle>Reports</ReportTitle>
      <GenerateReportForm onSubmit={handleGenerateReport}>
        <Input
          type="text"
          placeholder="Enter User Name or Email"
          value={userIdentifier}
          onChange={(e) => setUserIdentifier(e.target.value)}
        />
        <Button type="submit">Generate Report</Button>
      </GenerateReportForm>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by User Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      <Table>
        <thead>
          <Tr>
            <Th>Report ID</Th>
            <Th>Type</Th>
            <Th>Generated By</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <Tr key={report._id}>
              <Td>{report._id}</Td>
              <Td>{report.type}</Td>
              <Td>{users[report.generatedBy?._id]}</Td>
              <Td>
                <DownloadButton onClick={() => handleDownloadReport(report._id)}>
                  <FaDownload /> Download
                </DownloadButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </ReportContainer>
  );
};

export default Report;
