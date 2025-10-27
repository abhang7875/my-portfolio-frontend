import "../css/certifications.css";
import React, { useState, useEffect } from "react";
import AddEducationModal from "./AddEducationModal";
import UpdateEducatioModal from "./UpdateEducationModal";
import Certifications from "./Certifications";

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
    <div className="certifications-section-remove">
      <section className="container-fluid py-5" id="about">
        <div className="row justify-content-center">
          <div className="col-10 text-start">
            <h2 className="h2 mb-3">
              Education{" "}
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
          </div>
          <div className="row w-100">
            {education &&
              education.length > 0 &&
              education.map((edu) => (
                <div className="col-md-5 col-xl-5 cert-card mx-auto my-3 p-3 shadow-sm">
                  <div className="details">
                    <h6 className="h6">{edu.organisation}</h6>
                    <p className="fw-semibold mb-1"> {edu.degree} </p>
                    <p className="fw-semibold mb-1">
                      {" "}
                      {edu.from} - {edu.to}{" "}
                    </p>
                  </div>
                  {/* <div className="actions">
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
            </div> */}
                </div>
              ))}
          </div>
        </div>
      </section>
      <Certifications />
      {/* <div className="header">
        <h2> Education </h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Education
        </button>
      </div>
      {showModal && (
        <AddEducationModal
          onClose={() => setShowModal(false)}
          refresh={fetchEducations}
        />
      )} */}

      {/* {updateModalData && (
        <UpdateEducatioModal
          onClose={() => setUpdateModalData(null)}
          refresh={fetchEducations}
          updateData={updateModalData}
        />
      )} */}
    </div>
  );
}
