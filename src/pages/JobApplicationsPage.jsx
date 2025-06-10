import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './JobApplicationsPage.css';
import { FaTimesCircle, FaHourglassHalf, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';

const STATUS_COLORS = {
rejected: '#e53935',
screening: '#ff9800',
interview: '#ffd600',
shortlisted: '#43a047'
};
const STATUS_LABELS = {
rejected: 'Rejected',
screening: 'Under Screening',
interview: 'Interview Scheduled',
shortlisted: 'Shortlisted'
};
const STATUS_ICONS = {
rejected: <FaTimesCircle />,
screening: <FaHourglassHalf />,
interview: <FaCalendarCheck />,
shortlisted: <FaCheckCircle />
};

function JobApplicationsPage() {
const [applications, setApplications] = useState([]);
const [detailsIdx, setDetailsIdx] = useState(null);

// Load applications from localStorage
useEffect(() => {
    const data = localStorage.getItem('jobApplications');
    if (data) setApplications(JSON.parse(data));
}, []);

return (
    <>
    <Navbar />
    <div className="employee-main-layout">
        <Sidebar type="employee" />
        <div className="employee-content-area">
        <h2 className="applications-title">My Job Applications</h2>
        <div className="applications-list">
            {applications.length === 0 && (
            <div className="no-applications">You have not applied to any jobs yet.</div>
            )}
            {applications.map((app, idx) => (
            <div className="application-card" key={idx}>
                <div className="application-info">
                <div className="minimalist-job">{app.position}</div>
                <div className="minimalist-company">{app.company}</div>
                <div className="minimalist-location">{app.location}</div>
                <div className="minimalist-date">{app.appliedDate}</div>
                <button
                    className="application-details-btn"
                    onClick={() => setDetailsIdx(detailsIdx === idx ? null : idx)}
                >
                    {detailsIdx === idx ? 'Hide Details' : 'View Details'}
                </button>
                </div>
                <div
                className="application-status"
                style={{ background: STATUS_COLORS[app.status] || '#ccc' }}
                title={STATUS_LABELS[app.status]}
                >
                <span className="status-icon">
                    {React.cloneElement(STATUS_ICONS[app.status], { color: "#fff", size: 22 })}
                </span>
                <span className="status-label">{STATUS_LABELS[app.status]}</span>
                </div>
                {detailsIdx === idx && (
                <div className="application-details-modal-backdrop" onClick={() => setDetailsIdx(null)}>
                    <div className="application-details-modal" onClick={e => e.stopPropagation()}>
                    <button className="application-details-close-btn" onClick={() => setDetailsIdx(null)}>×</button>
                    <h3>{app.position} at {app.company}</h3>
                    <div style={{ margin: "0.7rem 0" }}>
                        <b>Location:</b> {app.location}
                    </div>
                    <div style={{ margin: "0.7rem 0" }}>
                        <b>Company Description:</b> {app.companyDescription}
                    </div>
                    <div style={{ margin: "0.7rem 0" }}>
                        <b>Job Description:</b> {app.jobDescription}
                    </div>
                    <div style={{ margin: "0.7rem 0" }}>
                        <b>Skills:</b> {app.skills && app.skills.join(', ')}
                    </div>
                    <div style={{ margin: "0.7rem 0" }}>
                        <b>Salary:</b> {app.salary}
                    </div>
                    <div style={{ margin: "0.7rem 0" }}>
                        <b>Last Date to Apply:</b> {app.lastDate}
                    </div>
                    <div
                        className="application-status"
                        style={{ color: STATUS_COLORS[app.status] || '#ccc', marginTop: "1.2rem" }}
                        title={STATUS_LABELS[app.status]}
                    >
                        <span className="status-icon">
                        {React.cloneElement(STATUS_ICONS[app.status], { color: STATUS_COLORS, size: 22 })}
                        </span>
                        <span className="status-label">{STATUS_LABELS[app.status]}</span>
                    </div>
                    </div>
                </div>
                )}
            </div>
            ))}
        </div>
        </div>
    </div>
    </>
);
}

export default JobApplicationsPage;