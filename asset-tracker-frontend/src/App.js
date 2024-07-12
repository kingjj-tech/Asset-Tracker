import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import UserDashboard from './components/userDashboard';
import SuperUserDashboard from './components/superUserDashboard';
import CreateAsset from './components/createAsset';
import UpdateAsset from './components/updateAsset';
import DeleteAsset from './components/deleteAsset';
import ViewAssets from './components/viewAsset';
import ViewAssetsDashboard from './components/ViewAssetsDashboard';
import ViewAssetHistory from './components/viewAssetHistory';
import CreateUser from './components/createUser';
import ViewUsers from './components/viewUsers';
import ViewReport from './components/report'
import Profile from './components/profile';



import UpdateUser from './components/updateUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/superuser-dashboard" element={<SuperUserDashboard />} />
        <Route path="/create-asset" element={<CreateAsset />} />
        <Route path="/update-asset/:id" element={<UpdateAsset />} />
        <Route path="/delete-asset/:id" element={<DeleteAsset />} />
        <Route path="/view-assets" element={<ViewAssets />} />
        <Route path="/view-assets-dashboard" element={<ViewAssetsDashboard />} />
        <Route path="/view-asset-history" element={<ViewAssetHistory />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/reports" element={<ViewReport />} />
        <Route path="/view-users" element={<ViewUsers />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
       
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
