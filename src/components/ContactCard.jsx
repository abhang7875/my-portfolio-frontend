import "../css/contactcard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaDownload,
} from "react-icons/fa";

function ContactCard() {
  return (
    <div className="contact-card-section container-fluid p-4 mt-4 bg-light">
      <div className="row w-100">
        <div className="d-flex align-items-center mb-3">
          <div className="phone d-flex justify-content-center align-items-center me-3">
            <FaPhoneAlt />
          </div>
          <div>
            <small className="text-muted d-block">Phone</small>
            <span className="fw-semibold">+917875667304</span>
          </div>
        </div>
      </div>
      <div className="row w-100">
        <div className="col-md-12 d-flex align-items-center mb-3">
          <div className="email d-flex justify-content-center align-items-center me-3">
            <FaEnvelope />
          </div>
          <div className="col-md-8">
            <small className="text-muted d-block">Email</small>
            <span className="fw-semibold mb-0">nileshabhang@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="row w-100">
        <div className="d-flex align-items-center mb-4">
          <div className="location d-flex justify-content-center align-items-center me-3">
            <FaMapMarkerAlt />
          </div>
          <div>
            <small className="text-muted d-block">Location</small>
            <span className="fw-semibold mb-0">Pune, India</span>
          </div>
        </div>
      </div>
      <div className="row w-100">
        <div className="text-center">
          <button className="download-resume btn text-white w-100 fw-semibold">
            <FaDownload className="me-2" />
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
