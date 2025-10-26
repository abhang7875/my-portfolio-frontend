import React, { useState, useEffect } from "react";
import AddProfileModal from "./AddProfileModal";
import UpdateProfileModal from "./UpdateProfileModal";

export default function SocialMediaProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(null);

  useEffect(() => {
    fetchSocialMediaProfiles();
  }, []);

  const fetchSocialMediaProfiles = async () => {
    try {
      const response = await fetch("http://localhost:8090/getAllProfiles");
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching social media profiles:", error);
    }
  };

  const deleteProfile = async (id) => {
    try {
      await fetch(`http://localhost:8090/deleteProfile/${id}`, {
        method: "DELETE",
      });
      fetchSocialMediaProfiles();
    } catch (error) {
      console.error("Error fetching social media profiles:", error);
    }
  };

  return (
    <div className="social-media-section">
      {/* <div className="header">
                <h2> Links </h2>
                <button className="add-btn" onClick={() => setShowModal(true)}> + Add Profile </button>
            </div> */}
      <div className="d-flex justify-content-center">
        <div className="row w-100">
          {profiles.map((profile) => (
            <div className="profile-container col-md-4">
              <div>
                <a
                  className="profile-link d-flex justify-content-center"
                  href={profile.url}
                  title={profile.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={"http://localhost:3000/images/" + profile.imagePath}
                    alt="Profile Logo"
                    className="icon"
                  />
                </a>
              </div>
              {/* <div className="actions">
            <button
              className="edit-btn"
              onClick={() => setUpdateModalData(profile)}
            >
              {" "}
              Edit{" "}
            </button>
            <a
              href={profile.url}
              title="Profile"
              target="_blank"
              className="profile-image"
              rel="noopener noreferrer"
            >
              <button className="view-btn"> View </button>
            </a>
            <button
              className="delete-btn"
              onClick={() => deleteProfile(profile.id)}
            >
              {" "}
              Delete{" "}
            </button>
          </div> */}
            </div>
          ))}
        </div>
      </div>
      {/* {showModal && (
        <AddProfileModal
          onClose={() => setShowModal(false)}
          refresh={fetchSocialMediaProfiles}
        />
      )}
      {updateModalData && (
        <UpdateProfileModal
          onClose={() => setUpdateModalData(null)}
          refresh={fetchSocialMediaProfiles}
          updateData={updateModalData}
        />
      )} */}
    </div>
  );
}
