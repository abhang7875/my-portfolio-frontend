import SocialMediaProfiles from "./components/SocialMediaProfiles.jsx";
import ContactCard from "./components/ContactCard";

export default function LeftPanel() {
  return (
    <div className="col-md-4 col-12">
      <div className="card shadow">
        <div className="card-body bg-white floating-content">
          <div className="profile-holder d-flex justify-content-center">
            <img
              src="./profile-photo.jpg"
              alt="Profile"
              className="profile-pic"
            />
          </div>
        </div>
        <div className="contact-content card-body">
          <h3 className="h3 d-flex justify-content-center mt-3">
            Nilesh Abhang
          </h3>
          <h6 className="h6 d-flex justify-content-center">
            <small className="text-muted">Full Stack Developer</small>
          </h6>

          <div className="card-body bg-white floating-content">
            <SocialMediaProfiles />
            <ContactCard />
          </div>
        </div>
      </div>
    </div>
  );
}
