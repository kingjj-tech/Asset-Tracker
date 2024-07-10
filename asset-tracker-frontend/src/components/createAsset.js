import React, { useState } from 'react';
import './CreateAsset.css';

const CreateAsset = () => {
  const [type, setType] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warrantyEndDate, setWarrantyEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          assigned_to: username,
        }),
      });

      if (response.ok) {
        alert('Asset created successfully');
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
    <div className="create-asset-container">
      <h1 className="create-asset-title">Create Asset</h1>
      <form onSubmit={handleSubmit} className="create-asset-form">
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="make">Make:</label>
          <input
            id="make"
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="purchaseDate">Purchase Date:</label>
          <input
            id="purchaseDate"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="warrantyEndDate">Warranty End Date:</label>
          <input
            id="warrantyEndDate"
            type="date"
            value={warrantyEndDate}
            onChange={(e) => setWarrantyEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select status</option>
            <option value="in use">In Use</option>
            <option value="in storage">In Storage</option>
            <option value="disposed">Disposed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Create</button>
      </form>
    </div>
  );
};

export default CreateAsset;
