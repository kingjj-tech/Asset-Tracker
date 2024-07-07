import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/assets/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        console.log('Asset deleted:', data);
        navigate('/view-assets');
      })
      .catch(error => console.error('Error deleting asset:', error));
  }, [id, navigate]);

  return <h1>Deleting Asset...</h1>;
};

export default DeleteAsset;
