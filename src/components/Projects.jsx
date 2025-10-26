import React, { useEffect, useState } from "react";
import AddProjectModal from "./AddProjectModal.jsx";
import UpdateProjectModal from "./UpdateProjectModal";
import "../css/projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const API_URL = "http://localhost:8090";

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/getAllProjects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const response = await fetch(`${API_URL}/deletePrjectById/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Project deleted successfully");
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="projects-container">
      <h2>Projects</h2>
      <button className="add-btn" onClick={() => setShowAddModal(true)}>
        + Add Project
      </button>

      <table className="projects-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>From</th>
            <th>To</th>
            <th>Organisation</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj) => (
            <tr key={proj.id}>
              <td>{proj.name}</td>
              <td>{proj.from}</td>
              <td>{proj.to}</td>
              <td>{proj.organisationId}</td>
              <td>
                <ul>
                  {proj.description?.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setUpdateData(proj);
                    setShowUpdateModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(proj.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <AddProjectModal
          onClose={() => setShowAddModal(false)}
          refresh={fetchProjects}
        />
      )}

      {showUpdateModal && (
        <UpdateProjectModal
          onClose={() => setShowUpdateModal(false)}
          refresh={fetchProjects}
          updateData={updateData}
        />
      )}
    </div>
  );
}

export default Projects;
