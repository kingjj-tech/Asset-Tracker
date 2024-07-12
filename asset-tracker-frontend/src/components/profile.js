// Profile.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0e6ff;
  min-height: 100vh;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const ProfileTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #4b0082;
`;

const ProfileInfo = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #4b0082;
`;

const Value = styled.span`
  color: #8a2be2;
`;

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      } else {
        console.error('Failed to fetch user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileTitle>User Profile</ProfileTitle>
        {userProfile ? (
          <div>
            <ProfileInfo>
              <Label>Name:</Label> <Value>{userProfile.name}</Value>
            </ProfileInfo>
            <ProfileInfo>
              <Label>Email:</Label> <Value>{userProfile.email}</Value>
            </ProfileInfo>
            <ProfileInfo>
              <Label>Role:</Label> <Value>{userProfile.role}</Value>
            </ProfileInfo>
            {/* Add more profile details as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;
