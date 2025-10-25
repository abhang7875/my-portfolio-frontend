import React, { useState, useEffect } from "react";
import "../css/certifications.css";

export default function UpdateEducationModal({ onClose, refresh, updateData }) {
  const [formData, setFormData] = useState({
    organisation: "",
    degree: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    if (updateData) {
      setFormData({
        organisation: updateData.organisation || "",
        degree: updateData.degree || "",
        from: updateData.from || "",
        to: updateData.to || "",
      });
    }
  }, [updateData]);

  const API_URL = `http://localhost:8090/updateEducation/${updateData.id}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      alert("Education updated successfully!");
      refresh();
      onClose();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to update education");
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h3>Update Education</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={updateData.id} />
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
            value={formData.to}
            onChange={handleChange}
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
