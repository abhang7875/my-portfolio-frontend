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
    <>
      <section className="container-fluid py-5" id="experience">
        <div className="row justify-content-center">
          <div className="col-10 text-start">
            <h2 className="h2 mb-3">
              Experience Details{" "}
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
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="experience-card mx-auto my-3 p-3 shadow-sm"
                >
                  <h3 className="h3">{exp.client}</h3>
                  <small className="text-muted fw-semibold mb-1">
                    {exp.from}–{exp.to}
                  </small>
                  <h6 className="fw-semibold mb-1">{exp.designation}</h6>

                  <ul className="responsibility-list mb-0">
                    {exp.responsibilities?.map((item, index) => (
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
    </>
  );
}
