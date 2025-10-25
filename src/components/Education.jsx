import "../css/certifications.css";
import React, { useState, useEffect } from "react";
import AddEducationModal from "./AddEducationModal";
import UpdateEducatioModal from "./UpdateEducationModal";

export default function Education() {
  const [education, setEducation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(null);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await fetch("http://localhost:8090/getAllEducations");
      const data = await response.json();
      setEducation(data);
    } catch (error) {
      console.error("Error fetching education:", error);
    }
  };

  const deleteEducation = async (id) => {
    try {
      await fetch(`http://localhost:8090/deleteEducation/${id}`, {
        method: "DELETE",
      });
      fetchEducations();
    } catch (error) {
      console.error("Error fetching educations:", error);
    }
  };

  return (
    <div className="certifications-section">
      <div className="header">
        <h2> Education </h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Education
        </button>
      </div>
      {education &&
        education.length > 0 &&
        education.map((edu) => (
          <div className="cert-card">
            <div className="details">
              <h3>{edu.orgnisation}</h3>
              <p> {edu.degree} </p>
              <p>
                {" "}
                From: {edu.from} - To: {edu.to}{" "}
              </p>
            </div>
            <div className="actions">
              <button
                className="edit-btn"
                onClick={() => setUpdateModalData(edu)}
              >
                {" "}
                Edit{" "}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteEducation(edu.id)}
              >
                {" "}
                Delete{" "}
              </button>
            </div>
          </div>
        ))}

      {showModal && (
        <AddEducationModal
          onClose={() => setShowModal(false)}
          refresh={fetchEducations}
        />
      )}

      {updateModalData && (
        <UpdateEducatioModal
          onClose={() => setUpdateModalData(null)}
          refresh={fetchEducations}
          updateData={updateModalData}
        />
      )}
    </div>
  );
}
