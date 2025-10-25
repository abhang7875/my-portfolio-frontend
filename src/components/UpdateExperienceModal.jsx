import React, { useState } from "react";
import "../css/experience.css";

function UpdateExperienceModal({ onClose, refresh, updateData }) {
  const [formData, setFormData] = useState(updateData);

  const API_URL = `http://localhost:8090/updateExperience/${formData.id}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResponsibilityChange = (index, value) => {
    const updated = [...formData.responsibilities];
    updated[index] = value;
    setFormData({ ...formData, responsibilities: updated });
  };

  const addResponsibilityField = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, { responsibility: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    refresh();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Update Experience</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="client"
            placeholder="Client"
            value={formData.client}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="from"
            placeholder="From"
            value={formData.from}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="to"
            placeholder="To"
            value={formData.to}
            onChange={handleChange}
            required
          />

          <h4>Responsibilities</h4>
          {formData.responsibilities.map((r, index) => (
            <input
              key={index}
              type="text"
              value={r}
              onChange={(e) =>
                handleResponsibilityChange(index, e.target.value)
              }
            />
          ))}
          <button type="button" onClick={addResponsibilityField}>
            + Add More
          </button>

          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateExperienceModal;
