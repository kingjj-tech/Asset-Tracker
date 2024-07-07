import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import UserDashboard from './components/userDashboard';
import SuperUserDashboard from './components/superUserDashboard';
import CreateAsset from './components/createAsset';
import UpdateAsset from './components/updateAsset';
import DeleteAsset from './components/deleteAsset';
import ViewAssets from './components/viewAsset';
import ViewAssetHistory from './components/viewAssetHistory';
import CreateUser from './components/createUser';
import ViewUsers from './components/viewUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/superuser-dashboard" element={<SuperUserDashboard />} />
        <Route path="/create-asset" element={<CreateAsset />} />
        <Route path="/update-asset/:id" element={<UpdateAsset />} />
        <Route path="/delete-asset/:id" element={<DeleteAsset />} />
        <Route path="/view-assets" element={<ViewAssets />} />
        <Route path="/view-asset-history" element={<ViewAssetHistory />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/view-users" element={<ViewUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
