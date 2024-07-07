import React, { useState, useEffect } from 'react';

const ViewAssetHistory = () => {
  const [assetHistories, setAssetHistories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/assetHistories')
      .then(response => response.json())
      .then(data => setAssetHistories(data))
      .catch(error => console.error('Error fetching asset histories:', error));
  }, []);

  return (
    <div>
      <h2>Asset History</h2>
      <table>
        <thead>
          <tr>
            <th>Asset ID</th>
            <th>User ID</th>
            <th>Assigned Date</th>
            <th>Returned Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {assetHistories.map(history => (
            <tr key={history._id}>
              <td>{history.asset_id}</td>
              <td>{history.user_id}</td>
              <td>{new Date(history.assigned_date).toLocaleDateString()}</td>
              <td>{history.returned_date ? new Date(history.returned_date).toLocaleDateString() : 'N/A'}</td>
              <td>{history.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAssetHistory;
