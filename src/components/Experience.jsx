import React, { useEffect, useState } from "react";
import AddExperienceModal from "./AddExperienceModal";
import UpdateExperienceModal from "./UpdateExperienceModal";
import "../css/experience.css";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  useEffect(() => {
    fetchAllExperiences();
  }, []);

  const fetchAllExperiences = async () => {
    const res = await fetch("http://localhost:8090/getAllExperiences");
    const data = await res.json();
    setExperiences(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      await fetch(`http://localhost:8090/deleteExperience/${id}`, {
        method: "DELETE",
      });
      fetchAllExperiences();
    }
  };

  const handleUpdate = (exp) => {
    setSelectedExperience(exp);
    setShowUpdateModal(true);
  };

  return (
    <div className="experience-container">
      <h2>Experience Details</h2>
      <button onClick={() => setShowAddModal(true)} className="btn-add">
        + Add Experience
      </button>

      <div className="experience-list">
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-card">
            <h3>{exp.designation}</h3>
            <p>
              <b>Client:</b> {exp.client}
            </p>
            <p>
              <b>From:</b> {exp.from}
            </p>
            <p>
              <b>To:</b> {exp.to}
            </p>
            <ul>
              {exp.responsibilities?.map((r) => (
                <li>{r}</li>
              ))}
            </ul>
            <button onClick={() => handleUpdate(exp)} className="btn-edit">
              Edit
            </button>
            <button onClick={() => handleDelete(exp.id)} className="btn-delete">
              Delete
            </button>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddExperienceModal
          onClose={() => setShowAddModal(false)}
          refresh={fetchAllExperiences}
        />
      )}

      {showUpdateModal && (
        <UpdateExperienceModal
          onClose={() => setShowUpdateModal(false)}
          refresh={fetchAllExperiences}
          updateData={selectedExperience}
        />
      )}
    </div>
  );
}
