import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: '',
    make: '',
    model: '',
    purchase_date: '',
    warranty_end_date: '',
    status: '',
    location: '',
    assigned_to: ''
  });

  useEffect(() => {
    fetch(`http://localhost:3000/assets/${id}`)
      .then(response => response.json())
      .then(data => setForm(data))
      .catch(error => console.error('Error fetching asset:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/assets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate('/view-assets');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Update Asset</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input type="text" name="type" value={form.type} onChange={handleChange} required />
        </label>
        <label>
          Make:
          <input type="text" name="make" value={form.make} onChange={handleChange} required />
        </label>
        <label>
          Model:
          <input type="text" name="model" value={form.model} onChange={handleChange} required />
        </label>
        <label>
          Purchase Date:
          <input type="date" name="purchase_date" value={form.purchase_date} onChange={handleChange} required />
        </label>
        <label>
          Warranty End Date:
          <input type="date" name="warranty_end_date" value={form.warranty_end_date} onChange={handleChange} required />
        </label>
        <label>
          Status:
          <select name="status" value={form.status} onChange={handleChange} required>
            <option value="in use">In Use</option>
            <option value="in storage">In Storage</option>
            <option value="disposed">Disposed</option>
            <option value="disposed">Expired</option>
          </select>
        </label>
        <label>
          Location:
          <input type="text" name="location" value={form.location} onChange={handleChange} required />
        </label>
        <label>
          Assigned To:
          <input type="text" name="assigned_to" value={form.assigned_to} onChange={handleChange} />
        </label>
        <button type="submit">Update Asset</button>
      </form>
    </div>
  );
};

export default UpdateAsset;
