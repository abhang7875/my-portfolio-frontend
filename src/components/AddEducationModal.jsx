import React, { useState } from "react";
import "../css/certifications.css";

function AddEducationModal({ onClose, refresh }) {
  const [formData, setFormData] = useState({
    organisation: "",
    degree: "",
    from: "",
    to: "",
  });

  const API_URL = "http://localhost:8090/addEducation";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      alert("Certification added successfully!");
      refresh();
      onClose();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add certification");
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h3>Add Education</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="organisation"
            placeholder="Organisation Name"
            value={formData.organisation}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={formData.degree}
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
            value={formData.To}
            onChange={handleChange}
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddEducationModal;
