import React, { useState, useEffect } from 'react';
import '../css/profiles.css';

function UpdateProfileModal({ onClose, refresh, updateData }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    url: '',
    image: null
  });

  const API_URL = 'http://localhost:8090/updateProfile';

  // Prefill the form when updateData is passed
  useEffect(() => {
    if (updateData) {
      setFormData({
        id: updateData.id || '',
        name: updateData.name || '',
        url: updateData.url || '',
        image: null,
      });
    }
  }, [updateData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('id', formData.id);
    data.append('name', formData.name);
    data.append('url', formData.url);
    if (formData.image) data.append('image', formData.image);

    try {
      await fetch(API_URL, {
        method: 'PUT',
        body: data,
      });
      refresh();
      onClose();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={formData.id} />

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

          <label>Update Profile Image (optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfileModal;
