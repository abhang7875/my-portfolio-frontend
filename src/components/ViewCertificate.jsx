import '../css/certifications.css';

function ViewCertificate({ onClose, certificatePath }) {
  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={certificatePath} alt="Certificate" className="certificate-image" />
      </div>
    </div>
  );
}

export default ViewCertificate;
