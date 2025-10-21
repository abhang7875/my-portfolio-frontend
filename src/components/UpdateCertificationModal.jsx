import React, { useState, useEffect } from 'react';
import '../css/certifications.css';

function UpdateCertificationModal({ onClose, refresh, updateData }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    issuedBy: '',
    issueDate: '',
    certificateImage: null,
    logoImage: null,
  });

  const API_URL = 'http://localhost:8090/updateCertification';

  // Prefill the form when updateData is passed
  useEffect(() => {
    if (updateData) {
      setFormData({
        id: updateData.id || '',
        name: updateData.name || '',
        description: updateData.description || '',
        issuedBy: updateData.issuedBy || '',
        issueDate: updateData.issueDate ? updateData.issueDate.split('T')[0] : '',
        certificateImage: null,
        logoImage: null,
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
    data.append('description', formData.description);
    data.append('issuedBy', formData.issuedBy);
    data.append('issueDate', formData.issueDate);
    if (formData.certificateImage) data.append('certificateImage', formData.certificateImage);
    if (formData.logoImage) data.append('logoImage', formData.logoImage);

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        body: data,
      });

      if (!response.ok) throw new Error('Update failed');

      alert('Certification updated successfully!');
      refresh();
      onClose();
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to update certification');
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Update Certification</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={formData.id} />

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

          <label>Update Certificate Image (optional)</label>
          <input
            type="file"
            name="certificateImage"
            accept="image/*"
            onChange={handleChange}
          />

          <label>Update Logo Image (optional)</label>
          <input
            type="file"
            name="logoImage"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateCertificationModal;
