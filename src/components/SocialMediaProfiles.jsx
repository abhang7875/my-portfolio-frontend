import '../css/profiles.css';
import React, { useState, useEffect } from 'react';

export default function SocialMediaProfiles() {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        fetchSocialMediaProfiles();
    }, []);

    const fetchSocialMediaProfiles = async () => {
        try {
            const response = await fetch('http://localhost:8090/getAllProfiles');
            const data = await response.json();
            setProfiles(data);
        } catch (error) {
            console.error('Error fetching social media profiles:', error);
        }
    };

    return (
        <div className="social-media-section">
            <div className="header">
                <h2> Links </h2>
            </div>
            {profiles.map(profile =>(
                <div className="links-card">
                    <img src={'http://localhost:3000/images/' + profile.imagePath} alt="Profile Logo" className='icon'/>
                    <div className='details'>
                        <h3>{profile.name}</h3>
                        <p> {profile.url} </p>
                    </div>
                    <div className="actions">
                        <a href={profile.url} title="Profile" target="_blank" className="profile-image" rel="noopener noreferrer">
                        <button className="view-btn"> View </button>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}