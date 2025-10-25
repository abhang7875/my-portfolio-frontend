import React, { useState } from "react";
import "../css/experience.css";

function AddExperienceModal({ onClose, refresh }) {
  const [formData, setFormData] = useState({
    designation: "",
    client: "",
    from: "",
    to: "",
    responsibilities: [""],
  });

  const API_URL = "http://localhost:8090/addExperience";

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
      responsibilities: [...formData.responsibilities, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    refresh();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Experience</h3>
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
              placeholder={`Responsibility ${index + 1}`}
              value={r}
              onChange={(e) =>
                handleResponsibilityChange(index, e.target.value)
              }
              required
            />
          ))}
          <button type="button" onClick={addResponsibilityField}>
            + Add More
          </button>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExperienceModal;
