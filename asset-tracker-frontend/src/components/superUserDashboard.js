import React from 'react';
import { Link } from 'react-router-dom';

const SuperuserDashboard = () => {
  return (
    <div>
      <h1>Superuser Dashboard</h1>
      <Link to="/create-user">Create User</Link>
      <Link to="/view-users">View Users</Link>
      <Link to="/user-dashboard">User Dashboard</Link>
    </div>
  );
};

export default SuperuserDashboard;
