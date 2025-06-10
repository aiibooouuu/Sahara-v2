import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './ProfilePage.css';

function ProfilePage() {
const [resume, setResume] = useState(null);

useEffect(() => {
    const data = localStorage.getItem('resumeData');
    if (data) setResume(JSON.parse(data));
}, []);

if (!resume) {
    return (
    <>
        <Navbar />
        <div className="employee-main-layout">
        <Sidebar type="employee" />
        <div className="employee-content-area profile-bento">
            <div className="profile-bento-empty">
            No profile data found. Please build your resume first.
            </div>
        </div>
        </div>
    </>
    );
}

return (
    <>
    <Navbar />
    <div className="employee-main-layout">
        <Sidebar type="employee" />
        <div className="employee-content-area profile-bento">
        <h2 className="profile-title">My Profile</h2>
        <div className="bento-flex-grid">
            <section className="bento-main-card">
            <div className="bento-main-header">
                <div className="bento-main-name">{resume.name}</div>
                <div className="bento-main-role">{resume.info || resume.role}</div>
            </div>
            <div className="bento-main-contact">
                <span>{resume.email}</span>
                <span>{resume.phone}</span>
                <span>{resume.location}</span>
                {resume.github && (
                <span>
                    <a href={resume.github} target="_blank" rel="noopener noreferrer" className="bento-link">
                    {resume.github}
                    </a>
                </span>
                )}
            </div>
            </section>
            <section className="bento-card">
            <div className="bento-section-title">About Me</div>
            <div className="bento-section-content">{resume.info || "—"}</div>
            </section>
            <section className="bento-card">
            <div className="bento-section-title">Skills</div>
            <div className="bento-section-content">
                {resume.skills && resume.skills.length > 0
                ? resume.skills.map((s, i) => (
                    <span className="bento-skill" key={i}>{s}</span>
                    ))
                : "—"}
            </div>
            </section>
            <section className="bento-card">
            <div className="bento-section-title">Education</div>
            <div className="bento-section-content">
                {resume.education && resume.education.length > 0
                ? resume.education.map((ed, i) => (
                    <div key={i} className="bento-edu">
                        <b>{ed.type || ed.degree}</b>
                        <span className="bento-edu-year">{ed.year}</span>
                        <div>{ed.institution || ed.location}</div>
                        {ed.grade && <div>Grade: {ed.grade}</div>}
                    </div>
                    ))
                : "—"}
            </div>
            </section>
            <section className="bento-card">
            <div className="bento-section-title">Experience</div>
            <div className="bento-section-content">
                {resume.work && resume.work.length > 0
                ? resume.work.map((ex, i) => (
                    <div key={i} className="bento-exp">
                        <b>{ex.position}</b> at {ex.place}
                        <span className="bento-exp-year">{ex.period}</span>
                        <div>{ex.description}</div>
                    </div>
                    ))
                : "—"}
            </div>
            </section>
            <section className="bento-card">
            <div className="bento-section-title">Projects</div>
            <div className="bento-section-content">
                {resume.projects && resume.projects.length > 0
                ? resume.projects.map((pr, i) => (
                    <div key={i} className="bento-proj">
                        <b>{pr.title}</b>
                        <div>{pr.description}</div>
                    </div>
                    ))
                : "—"}
            </div>
            </section>
            <section className="bento-card">
            <div className="bento-section-title">Courses</div>
            <div className="bento-section-content">
                {resume.courses && resume.courses.length > 0
                ? resume.courses.map((c, i) => (
                    <div key={i} className="bento-course">
                        <b>{c.title}</b>
                        <div>{c.description}</div>
                    </div>
                    ))
                : "—"}
            </div>
            </section>
            <section className="bento-card">
            <div className="bento-section-title">Certificates</div>
            <div className="bento-section-content">
                {resume.certificates && resume.certificates.length > 0
                ? resume.certificates.map((c, i) => (
                    <div key={i} className="bento-cert">
                        <b>{c.name}</b>
                        <span className="bento-cert-year">{c.year}</span>
                    </div>
                    ))
                : "—"}
            </div>
            </section>
            <section className="bento-card">
            <div className="bento-section-title">Links</div>
            <div className="bento-section-content">
                {resume.links && resume.links.length > 0
                ? resume.links.map((l, i) => (
                    <div key={i}>
                        <a href={l} target="_blank" rel="noopener noreferrer" className="bento-link">{l}</a>
                    </div>
                    ))
                : "—"}
            </div>
            </section>
        </div>
        </div>
    </div>
    </>
);
}

export default ProfilePage;