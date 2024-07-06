import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import UserDashboard from './components/userDashboard';
import SuperuserDashboard from './components/superUserDashboard';
import CreateAsset from './components/createAsset';
import UpdateAsset from './components/updateAsset';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/superuser-dashboard" element={<SuperuserDashboard />} />
        <Route path="/create-asset" element={<CreateAsset />} />
        <Route path="/update-asset/:id" element={<UpdateAsset />} />
      </Routes>
    </Router>
  );
}

export default App;
