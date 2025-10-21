import React, { useState } from 'react';
import '../css/certifications.css';

function AddCertificationModal({ onClose, refresh }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    issuedBy: '',
    issueDate: '',
    certificateImage: null,
    logoImage: null
  });

  const API_URL = 'http://localhost:8090/addCertification';

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
    data.append('description', formData.description);
    data.append('issuedBy', formData.issuedBy);
    data.append('issueDate', formData.issueDate);
    data.append('certificateImage', formData.certificateImage);
    data.append('logoImage', formData.logoImage);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: data // 👈 FormData — no need to set headers!
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      alert('Certification added successfully!');
      refresh();
      onClose();
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add certification');
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Add Certification</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Certification Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="issuedBy"
            placeholder="Issued By"
            value={formData.issuedBy}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="certificateImage"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="logoImage"
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

export default AddCertificationModal;
