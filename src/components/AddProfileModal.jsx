import React, { useState } from 'react';
import '../css/profiles.css';

function AddProfileModal({ onClose, refresh }) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    image: null
  });

  const API_URL = 'http://localhost:8090/addProfile';

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // If the input is a file, use files[0], otherwise use value
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct multipart/form-data
    const data = new FormData();
    data.append('name', formData.name);
    data.append('url', formData.url);
    data.append('image', formData.image);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: data // 👈 FormData — no need to set headers!
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      alert('Profile added successfully!');
      refresh();
      onClose();
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add profile');
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Add Profile</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Profile Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="url"
            placeholder="URL"
            value={formData.url}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddProfileModal;
