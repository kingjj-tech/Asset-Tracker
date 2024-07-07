import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

const CreateUser = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'user' // default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(''); // Clear error message on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log('Success:', data);
          navigate('/view-users');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Server error, please try again later.');
      });
  };

  return (
    <div className="create-user-container">
      <h2>Create User</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <label>
          Role:
          <select name="role" value={form.role} onChange={handleChange} required>
            <option value="user">User</option>
            <option value="superuser">SuperUser</option>
          </select>
        </label>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
