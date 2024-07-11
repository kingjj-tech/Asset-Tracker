import React, { useState } from 'react';
import styled from 'styled-components';
import { FaLaptop, FaDesktop, FaTabletAlt, FaPhone, FaPrint, FaServer } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreateAssetContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e6e0e9;
  min-height: 100vh;
  padding: 2rem;
`;

const CreateAssetTitle = styled.h1`
  color: #4a0e4e;
  margin-bottom: 2rem;
  text-align: center;
`;

const CreateAssetForm = styled.form`
  background-color: #f3e5f5;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a0e4e;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #9c27b0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a0e4e;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #9c27b0;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a0e4e;
  }
`;

const SubmitButton = styled.button`
  background-color: #9c27b0;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 2rem auto 0;

  &:hover {
    background-color: #7b1fa2;
  }
`;

const AssetTypeSelector = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const AssetTypeButton = styled.button`
  background-color: ${props => props.selected ? '#9c27b0' : '#f3e5f5'};
  color: ${props => props.selected ? 'white' : '#4a0e4e'};
  border: 2px solid #9c27b0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    background-color: #9c27b0;
    color: white;
  }

  svg {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const BackButton = styled.button`
  background-color: #4a0e4e;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #3a0a3e;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 0.5rem;
`;

const CreateAsset = () => {
  const [type, setType] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warrantyEndDate, setWarrantyEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const assetTypes = [
    { icon: <FaLaptop />, label: 'Laptop' },
    { icon: <FaDesktop />, label: 'Desktop' },
    { icon: <FaTabletAlt />, label: 'Tablet' },
    { icon: <FaPhone />, label: 'Phone' },
    { icon: <FaPrint />, label: 'Printer' },
    { icon: <FaServer />, label: 'Server' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!type) newErrors.type = 'Asset type is required';
    if (!make) newErrors.make = 'Make is required';
    if (!model) newErrors.model = 'Model is required';
    if (!purchaseDate) newErrors.purchaseDate = 'Purchase date is required';
    if (!status) newErrors.status = 'Status is required';
    if (!location) newErrors.location = 'Location is required';
    if (!serialNumber) newErrors.serialNumber = 'Serial number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (!token) {
      alert('No token found, please log in first');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          make,
          model,
          purchaseDate,
          warrantyEndDate,
          status,
          location,
          serialNumber,
          assigned_to: username,
        }),
      });

      if (response.ok) {
        alert('Asset created successfully');
        // Reset form fields
        setType('');
        setMake('');
        setModel('');
        setPurchaseDate('');
        setWarrantyEndDate('');
        setStatus('');
        setLocation('');
        setSerialNumber('');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create asset');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the asset. Please try again.');
    }
  };

  return (
    <CreateAssetContainer>
      <BackButton onClick={() => navigate(-1)}>
        <ButtonIcon>⬅️</ButtonIcon>
        Back
      </BackButton>
      <CreateAssetTitle>Create New Office Asset</CreateAssetTitle>
      <CreateAssetForm onSubmit={handleSubmit}>
        <AssetTypeSelector>
          {assetTypes.map((assetType) => (
            <AssetTypeButton
              key={assetType.label}
              type="button"
              selected={type === assetType.label}
              onClick={() => setType(assetType.label)}
            >
              {assetType.icon}
              {assetType.label}
            </AssetTypeButton>
          ))}
        </AssetTypeSelector>
        {errors.type && <ErrorMessage>{errors.type}</ErrorMessage>}

        <FormGroup>
          <Label htmlFor="make">Make:</Label>
          <Input
            id="make"
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
          {errors.make && <ErrorMessage>{errors.make}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="model">Model:</Label>
          <Input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          {errors.model && <ErrorMessage>{errors.model}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="serialNumber">Serial Number:</Label>
          <Input
            id="serialNumber"
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
          {errors.serialNumber && <ErrorMessage>{errors.serialNumber}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="purchaseDate">Purchase Date:</Label>
          <Input
            id="purchaseDate"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
          {errors.purchaseDate && <ErrorMessage>{errors.purchaseDate}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="warrantyEndDate">Warranty End Date:</Label>
          <Input
            id="warrantyEndDate"
            type="date"
            value={warrantyEndDate}
            onChange={(e) => setWarrantyEndDate(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">Status:</Label>
          <Select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select status</option>
            <option value="in use">In Use</option>
            <option value="in storage">In Storage</option>
            <option value="disposed">Disposed</option>
          </Select>
          {errors.status && <ErrorMessage>{errors.status}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="location">Location:</Label>
          <Input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <ErrorMessage>{errors.location}</ErrorMessage>}
        </FormGroup>

        <SubmitButton type="submit">Create Asset</SubmitButton>
      </CreateAssetForm>
    </CreateAssetContainer>
  );
};

export default CreateAsset;