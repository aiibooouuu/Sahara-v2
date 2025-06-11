import React from 'react';
import './JobDetailsModal.css';

function JobDetailsModal({ job, onClose }) {
if (!job) return null;
return (
    <div className="job-details-modal-backdrop" onClick={onClose}>
    <div className="job-details-modal" onClick={e => e.stopPropagation()}>
        <button className="job-details-close-btn" onClick={onClose}>×</button>
        <h2>{job.position} at {job.company}</h2>
        <div className="job-details-section">
        <b>Location:</b> {job.location}
        </div>
        <div className="job-details-section">
        <b>Company Description:</b>
        <div>{job.companyDescription}</div>
        </div>
        <div className="job-details-section">
        <b>Job Description:</b>
        <div>{job.jobDescription}</div>
        </div>
        <div className="job-details-section">
        <b>Skills Required:</b> {job.skills.join(', ')}
        </div>
        <div className="job-details-section">
        <b>Estimated Salary:</b> {job.salary}
        </div>
        <div className="job-details-section">
        <b>Last Date to Apply:</b> {job.lastDate}
        </div>
    </div>
    </div>
);
}

export default JobDetailsModal;