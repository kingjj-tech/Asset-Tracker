import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 2rem;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const ProfileCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
`;

const ProfileTitle = styled.h2`
  margin-top: 0;
  border-bottom: 1px solid #e1dfdd;
  padding-bottom: 0.5rem;
  text-align: center;
`;

const ProfileInfo = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please log in first');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <ProfileContainer>Loading...</ProfileContainer>;
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileTitle>User Profile</ProfileTitle>
        <ProfileInfo><strong>Name:</strong> {user.name}</ProfileInfo>
        <ProfileInfo><strong>Email:</strong> {user.email}</ProfileInfo>
        <ProfileInfo><strong>Role:</strong> {user.role}</ProfileInfo>
        <ProfileInfo><strong>Department:</strong> {user.department}</ProfileInfo>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
