import React, { useState, useEffect } from "react";
import "../css/projects.css";

function UpdateProjectModal({ onClose, refresh, updateData }) {
  const [formData, setFormData] = useState(updateData);
  const [organisations, setOrganisations] = useState([]);

  const API_URL = "http://localhost:8090";

  useEffect(() => {
    fetch(`${API_URL}/getAllExperiences`)
      .then((res) => res.json())
      .then((data) => setOrganisations(data));
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "description") {
      const updated = [...formData.description];
      updated[index] = value;
      setFormData({ ...formData, description: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addDescriptionField = () => {
    setFormData({ ...formData, description: [...formData.description, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/updateProject/${formData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Project updated successfully");
      refresh();
      onClose();
    } else {
      alert("Failed to update project");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Update Project</h3>
        <form onSubmit={handleSubmit}>
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />

          <label>From</label>
          <input
            type="text"
            name="from"
            value={formData.from || ""}
            onChange={handleChange}
          />

          <label>To</label>
          <input
            type="text"
            name="to"
            value={formData.to || ""}
            onChange={handleChange}
          />

          <label>Organisation</label>
          <select
            name="organisationId"
            value={formData.organisationId || ""}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            {organisations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.client} ({org.designation})
              </option>
            ))}
          </select>

          <label>Description</label>
          {formData.description?.map((desc, i) => (
            <input
              key={i}
              type="text"
              name="description"
              value={desc}
              onChange={(e) => handleChange(e, i)}
            />
          ))}
          <button type="button" onClick={addDescriptionField}>
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

export default UpdateProjectModal;
