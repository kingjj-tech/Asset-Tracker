import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <Link to="/create-asset">Create Asset</Link>
      <Link to="/update-asset">Update Asset</Link>
      <Link to="/delete-asset">Delete Asset</Link>
      <Link to="/view-assets">View Assets</Link>
      <Link to="/view-asset-history">View Asset History</Link>
    </div>
  );
};

export default UserDashboard;
