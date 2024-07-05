import React from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css'; // Make sure to create this CSS file

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Dashboard</h1>
      <div className="dashboard-menu">
        <Link to="/create-asset" className="dashboard-link">
          <div className="dashboard-item">
            <i className="fas fa-plus-circle"></i>
            <span>Create Asset</span>
          </div>
        </Link>
        <Link to="/update-asset" className="dashboard-link">
          <div className="dashboard-item">
            <i className="fas fa-edit"></i>
            <span>Update Asset</span>
          </div>
        </Link>
        <Link to="/delete-asset" className="dashboard-link">
          <div className="dashboard-item">
            <i className="fas fa-trash-alt"></i>
            <span>Delete Asset</span>
          </div>
        </Link>
        <Link to="/view-assets" className="dashboard-link">
          <div className="dashboard-item">
            <i className="fas fa-list"></i>
            <span>View Assets</span>
          </div>
        </Link>
        <Link to="/view-asset-history" className="dashboard-link">
          <div className="dashboard-item">
            <i className="fas fa-history"></i>
            <span>View Asset History</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;