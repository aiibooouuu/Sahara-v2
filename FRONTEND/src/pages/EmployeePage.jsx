import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './EmployeePage.css';
import ResumeBuilder from '../components/ResumeBuilder';
import jobsData from '../data/jobs.json';
import { FaSearch } from 'react-icons/fa';
import JobDetailsModal from '../components/JobDetailsModal'; // <-- New component
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function EmployeePage() {
const [showResumeBuilder, setShowResumeBuilder] = useState(false);
const [search, setSearch] = useState('');
const [selectedJob, setSelectedJob] = useState(null);
const navigate = useNavigate();

// Filter jobs by search (skills or position/company)
const filteredJobs = jobsData.filter(job =>
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.position.toLowerCase().includes(search.toLowerCase()) ||
    job.skills.join(' ').toLowerCase().includes(search.toLowerCase())
);


// useEffect(() => {
// axios.get("http://localhost:8000/api/check-auth/", { withCredentials: true })
//     .then(response => {
//     console.log("Authenticated:", response.data);
//     })
//     .catch(error => {
//     if (error.response && error.response.status === 401) {
//         console.warn("Not authenticated. Redirecting...");
//         navigate("/login");
//     } else {
//         console.error("Error:", error);
//     }
//     });
// }, [navigate]);

return (
    <>
    <Navbar />
    <div className="employee-main-layout">
        <Sidebar type="employee" />
        <div className="employee-content-area">
        <button
            className="build-resume-btn top-right"
            onClick={() => setShowResumeBuilder(true)}
        >
            Build Your Resume
        </button>
        <ResumeBuilder
            show={showResumeBuilder}
            onClose={() => setShowResumeBuilder(false)}
        />

        {/* Job Search Section */}
        <div className="job-search-section">
            <div className="job-search-bar-wrapper">
            <input
                type="text"
                className="job-search-bar"
                placeholder="Search jobs by skill, company, or position..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button
                className="job-search-btn"
                tabIndex={-1}
                type="button"
                aria-label="Search"
                onClick={() => {}}
            >
                <FaSearch />
            </button>
            </div>
            <div className="job-cards-container">
            {filteredJobs.length === 0 && (
                <div className="no-jobs-found">No jobs found.</div>
            )}
            {filteredJobs.map((job, idx) => (
                <div className="job-card" key={idx}>
                <div className="job-company">{job.company}</div>
                <div className="job-position">{job.position}</div>
                <div className="job-skills">
                    <b>Skills:</b> {job.skills.join(', ')}
                </div>
                <div className="job-salary">
                    <b>Estimated Salary:</b> {job.salary}
                </div>
                <div className="job-last-date">
                    <b>Last Date to Apply:</b> {job.lastDate}
                </div>
                <div className="job-card-actions">
                    <button
                    className="job-view-details-btn"
                    onClick={() => setSelectedJob(job)}
                    >
                    View Details
                    </button>
                    <button
                    className="job-apply-btn"
                    onClick={() => {
                        // Save application to localStorage
                        const prev = JSON.parse(localStorage.getItem('jobApplications') || '[]');
                        const alreadyApplied = prev.some(
                        a => a.company === job.company && a.position === job.position
                        );
                        if (!alreadyApplied) {
                        prev.push({
                            ...job,
                            appliedDate: new Date().toLocaleDateString(),
                            status: 'screening' // default status
                        });
                        localStorage.setItem('jobApplications', JSON.stringify(prev));
                        alert('Application submitted!');
                        } else {
                        alert('You have already applied to this job.');
                        }

                    }}
                    >
                    Apply Now
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
        {/* Job Details Modal */}
        {selectedJob && (
            <JobDetailsModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            />
        )}
        </div>
    </div>
    </>
);
}

export default EmployeePage;
