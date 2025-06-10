import React, { useState } from "react";
import "./Applications.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const initialJob = {
title: "",
company: "",
location: "",
salary: "",
description: "",
skills: "",
};

export default function Applications() {
const [job, setJob] = useState(initialJob);

const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    alert("Job listed!");
    setJob(initialJob);
};

return (
    <>
    <Navbar />
    <div className="applications-main-layout">
        <Sidebar />
        <main className="applications-main-content">
        <div className="applications-layout">
            <div className="applications-form-section">
            <form className="applications-form" onSubmit={handleSubmit}>
                <h2>List a Job</h2>
                <label>
                Job Title
                <input
                    type="text"
                    name="title"
                    value={job.title}
                    onChange={handleChange}
                    required
                />
                </label>
                <label>
                Company
                <input
                    type="text"
                    name="company"
                    value={job.company}
                    onChange={handleChange}
                    required
                />
                </label>
                <label>
                Location
                <input
                    type="text"
                    name="location"
                    value={job.location}
                    onChange={handleChange}
                    required
                />
                </label>
                <label>
                Salary
                <input
                    type="text"
                    name="salary"
                    value={job.salary}
                    onChange={handleChange}
                />
                </label>
                <label>
                Description
                <textarea
                    name="description"
                    value={job.description}
                    onChange={handleChange}
                    rows={3}
                />
                </label>
                <label>
                Skills
                <textarea
                    name="requirements"
                    value={job.requirements}
                    onChange={handleChange}
                    rows={2}
                />
                </label>
                <button type="submit" className="applications-submit-btn">
                List the Job
                </button>
            </form>
            </div>
            <div className="applications-preview-section">
            <div className="applications-preview-card">
                <h3>{job.title || "Job Title"}</h3>
                <div className="applications-preview-company">
                {job.company || "Company Name"}
                </div>
                <div className="applications-preview-location">
                {job.location || "Location"}
                </div>
                <div className="applications-preview-salary">
                {job.salary && <>Salary: {job.salary}</>}
                </div>
                <div className="applications-preview-description">
                <strong>Description:</strong>
                <div>
                    {job.description || (
                    <span style={{ color: "#aaa" }}> description</span>
                    )}
                </div>
                </div>
                <div className="applications-preview-requirements">
                <strong>Skills:</strong>
                <div>
                    {job.skills || (
                    <span style={{ color: "#aaa" }}>Skills</span>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>
        </main>
    </div>
    </>
);
}