import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const [totalAssets, setTotalAssets] = useState(0);
  const [assetsInUse, setAssetsInUse] = useState(0);
  const [availableAssets, setAvailableAssets] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch asset overview data
    fetch('http://localhost:3000/stats/asset-overview')
      .then(response => response.json())
      .then(data => {
        setTotalAssets(data.totalAssets);
        setAssetsInUse(data.assetsInUse);
        setAvailableAssets(data.availableAssets);
      })
      .catch(error => console.error('Error fetching asset overview:', error));

    // Fetch recent activities data
    fetch('http://localhost:3000/stats/recent-activities')
      .then(response => response.json())
      .then(data => setRecentActivities(data))
      .catch(error => console.error('Error fetching recent activities:', error));
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Inventory Management System</h1>
        <div className="user-info" onClick={() => handleNavigation('/profile')}>
          <img src="/avatar-placeholder.png" alt="User Avatar" className="user-avatar" />
          <span className="user-name">John Doe</span>
        </div>
      </header>
      <nav className="dashboard-nav">
        <ul>
          <li><a href="#dashboard" className="active">Dashboard</a></li>
          <li><a href="#" onClick={() => handleNavigation('/reports')}>Reports</a></li>
          <li><a href="#" onClick={() => handleNavigation('/settings')}>Settings</a></li>
        </ul>
      </nav>
      <main className="dashboard-content">
        <h2>Quick Actions</h2>
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
          <Link to="/generate-report" className="dashboard-link">
            <div className="dashboard-item">
              <i className="fas fa-file-alt"></i>
              <span>Generate Report</span>
            </div>
          </Link>
        </div>
        <div className="dashboard-widgets">
          <div className="widget">
            <h3>Asset Overview</h3>
            <div className="widget-content">
              <p>Total Assets: {totalAssets}</p>
              <p>Assets in Use: {assetsInUse}</p>
              <p>Available Assets: {availableAssets}</p>
            </div>
          </div>
          <div className="widget">
            <h3>Recent Activities</h3>
            <ul className="activity-list">
              {recentActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;