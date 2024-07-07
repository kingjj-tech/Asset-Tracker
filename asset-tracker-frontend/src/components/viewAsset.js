import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewAssets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/assets')
      .then(response => response.json())
      .then(data => setAssets(data))
      .catch(error => console.error('Error fetching assets:', error));
  }, []);

  return (
    <div>
      <h2>Assets</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Make</th>
            <th>Model</th>
            <th>Purchase Date</th>
            <th>Warranty End Date</th>
            <th>Status</th>
            <th>Location</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset._id}>
              <td>{asset.type}</td>
              <td>{asset.make}</td>
              <td>{asset.model}</td>
              <td>{new Date(asset.purchase_date).toLocaleDateString()}</td>
              <td>{new Date(asset.warranty_end_date).toLocaleDateString()}</td>
              <td>{asset.status}</td>
              <td>{asset.location}</td>
              <td>{asset.assigned_to}</td>
              <td>
                <Link to={`/update-asset/${asset._id}`}>Edit</Link>
                <Link to={`/delete-asset/${asset._id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAssets;
