import '../css/certifications.css';
import React, { useState, useEffect } from 'react';
import AddCertificationModal from './AddCertificationModal';
import ViewCertificate from './ViewCertificate';
import UpdateCertificationModal from './UpdateCertificationModal';

export default function Certifications() {
    const [certifications, setCertifications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [updateModalData, setUpdateModalData] = useState(null);
    const [viewCertificatePath, setViewCertificatePath] = useState('');

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        try {
            const response = await fetch('http://localhost:8090/getCertifications');
            const data = await response.json();
            setCertifications(data);
        } catch (error) {
            console.error('Error fetching certifications:', error);
        }
    };

    const deleteCertification = async (id) => {
        try {
            await fetch(`http://localhost:8090/deleteCertification/${id}`, {
                method: 'DELETE'
            });
            fetchCertifications();
        } catch (error) {
            console.error('Error fetching certifications:', error);
        }
    };



    return (
        <div className="certifications-section">
            <div className="header">
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
            ))}

            {showModal && (
                <AddCertificationModal 
                    onClose={() => setShowModal(false)} 
                    refresh={fetchCertifications} 
                />
            )}

            {viewCertificatePath !== '' && (
                <ViewCertificate 
                    onClose={() => setViewCertificatePath('')}
                    certificatePath={viewCertificatePath}
                />
            )}

            {updateModalData && (
                <UpdateCertificationModal 
                    onClose={() => setUpdateModalData(null)} 
                    refresh={fetchCertifications} 
                    updateData={updateModalData}
                />
            )}
        </div>
    );
}