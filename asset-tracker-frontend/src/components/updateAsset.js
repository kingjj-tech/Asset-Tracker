import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import io from 'socket.io-client';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #34495e;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #2980b9;
  }
`;

const BackButton = styled.button`
  background-color: #34495e;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #2c3e50;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 0.5rem;
`;

const UpdateAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: '',
    make: '',
    model: '',
    purchase_date: '',
    warranty_end_date: '',
    status: '',
    location: '',
    assigned_to: ''
  });

  useEffect(() => {
    fetch(`http://localhost:3000/assets/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setForm(data))
      .catch(error => console.error('Error fetching asset:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/assets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        navigate('/view-assets');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ButtonIcon>⬅️</ButtonIcon>
        Back
      </BackButton>
      <Title>Update Asset</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Type</Label>
        <Input type="text" name="type" value={form.type} onChange={handleChange} required />

        <Label>Make</Label>
        <Input type="text" name="make" value={form.make} onChange={handleChange} required />

        <Label>Model</Label>
        <Input type="text" name="model" value={form.model} onChange={handleChange} required />

        <Label>Purchase Date</Label>
        <Input type="date" name="purchase_date" value={form.purchase_date} onChange={handleChange} required />

        <Label>Warranty End Date</Label>
        <Input type="date" name="warranty_end_date" value={form.warranty_end_date} onChange={handleChange} required />

        <Label>Status</Label>
        <Select name="status" value={form.status} onChange={handleChange} required>
          <option value="in use">In Use</option>
          <option value="in storage">In Storage</option>
          <option value="disposed">Disposed</option>
          <option value="expired">Expired</option>
        </Select>

        <Label>Location</Label>
        <Input type="text" name="location" value={form.location} onChange={handleChange} required />

        <Label>Assigned To</Label>
        <Input type="text" name="assigned_to" value={form.assigned_to} onChange={handleChange} />

        <Button type="submit">Update Asset</Button>
      </Form>
    </PageContainer>
  );
};

export default UpdateAsset;
