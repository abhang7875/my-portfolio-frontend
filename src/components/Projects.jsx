import React, { useEffect, useState } from "react";
import AddProjectModal from "./AddProjectModal.jsx";
import UpdateProjectModal from "./UpdateProjectModal";
import "../css/projects.css";
import { API_URLS } from "../constants.jsx";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URLS.PROJECTS.VIEW_ALL);
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
      const response = await fetch(API_URLS.PROJECTS.DELETE({ id }), {
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
    <>
      <section className="container-fluid py-5" id="experience">
        <div className="row justify-content-center">
          <div className="col-10 text-start">
            <h2 className="h2 mb-3">
              Projects{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "240px",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, #fcde19, #ff3d00, #fcde19)",
                  marginLeft: "10px",
                  verticalAlign: "middle",
                }}
              ></span>
            </h2>
            <div className="experience-list">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="experience-card mx-auto my-3 p-3 shadow-sm"
                >
                  <h3 className="h3">{project.name}</h3>
                  <small className="text-muted fw-semibold mb-1">
                    {project.from}–{project.to}
                  </small>
                  <h6 className="fw-semibold mb-1">{project.origanisation}</h6>

                  <ul className="responsibility-list mb-0">
                    {project.description?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  {/* <button
                        onClick={() => handleUpdate(exp)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="experience-container">
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
    </>
  );
}

export default Projects;
