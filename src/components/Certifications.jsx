import "../css/certifications.css";
import React, { useState, useEffect } from "react";
import AddCertificationModal from "./AddCertificationModal";
import ViewCertificate from "./ViewCertificate";
import UpdateCertificationModal from "./UpdateCertificationModal";
import { API_URLS } from "../constants";

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(null);
  const [viewCertificatePath, setViewCertificatePath] = useState("");

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch(API_URLS.CERTIFICATION.VIEW_ALL);
      const data = await response.json();
      setCertifications(data);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
  };

  const deleteCertification = async (id) => {
    try {
      await fetch(API_URLS.CERTIFICATION.DELETE({ id }), {
        method: "DELETE",
      });
      fetchCertifications();
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
  };

  return (
    // <div className="certifications-section">
    <section className="container-fluid" id="about">
      <div className="row justify-content-center">
        <div className="col-10 text-start">
          <h2 className="h2 mb-3">
            Certifications{" "}
            <span
              style={{
                display: "inline-block",
                width: "240px",
                height: "2px",
                background: "linear-gradient(90deg, #fcde19, #ff3d00, #fcde19)",
                marginLeft: "10px",
                verticalAlign: "middle",
              }}
            ></span>
          </h2>
        </div>
      </div>
      {certifications.map((cert) => (
        <div className="row justify-content-header">
          <div className="cert-card justify-content-header bg-light shadow-sm">
            <div className="col-1">
              <img
                src={"http://localhost:3000/images/" + cert.logoPath}
                alt="Certificate Logo"
                className="certificate-logo"
              />
            </div>
            <div className="details col-8">
              <h3>{cert.name}</h3>
              <p> {cert.description} </p>
              <p>
                {" "}
                Issued By: {cert.issuedBy}, On:{" "}
                {new Date(cert.issueDate).toLocaleDateString()}{" "}
              </p>
            </div>
            <div className="actions col-2">
              <button
                className="view-btn"
                onClick={() =>
                  setViewCertificatePath(
                    "http://localhost:3000/images/" + cert.certificatePath
                  )
                }
              >
                {" "}
                View{" "}
              </button>
            </div>
          </div>
        </div>
      ))}
      {viewCertificatePath !== "" && (
        <ViewCertificate
          onClose={() => setViewCertificatePath("")}
          certificatePath={viewCertificatePath}
        />
      )}
    </section>
  );
  {
    /* <div className="header">
                <h2> Certifications </h2>
                <button className="add-btn" onClick={() => setShowModal(true)}> + Add Certification </button>
            </div>
            {certifications.map(cert =>(
                <div className="cert-card">
                    <img src={'http://localhost:3000/images/' + cert.logoPath} alt="Certificate Logo" className='icon'/>
                    <div className='details'>
                        <h3>{cert.name}</h3>
                        <p> {cert.description} </p>
                        <p> Issued By: {cert.issuedBy}, On: {new Date(cert.issueDate).toLocaleDateString()} </p>
                    </div>
                    <div className="actions">
                        <button className="edit-btn" onClick={() => setUpdateModalData(cert)}> Edit </button>
                        <button className="view-btn" onClick={() =>setViewCertificatePath('http://localhost:3000/images/' + cert.certificatePath)}> View </button>
                        <button className="delete-btn" onClick={() => deleteCertification(cert.id)}> Delete </button>
                    </div>
                </div>
            ))} */
  }

  {
    /* {showModal && (
                <AddCertificationModal 
                    onClose={() => setShowModal(false)} 
                    refresh={fetchCertifications} 
                />
            )} */
  }

  {
    /* {updateModalData && (
                <UpdateCertificationModal 
                    onClose={() => setUpdateModalData(null)} 
                    refresh={fetchCertifications} 
                    updateData={updateModalData}
                />
            )} */
  }
  {
    /* </div> */
  }
}
