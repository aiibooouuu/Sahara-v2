import React, { useState } from "react";
import skillsData from "../data/skills.json";
import "./ResumeBuilder.css";
import { FaPhone, FaEnvelope, FaGithub, FaMapMarkerAlt } from "react-icons/fa";

function ResumeBuilder({ show, onClose }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    github: "",
    info: "",
    education: [],
    work: [],
    skills: [],
    projects: [],
    courses: [],
    certificates: []
  });

  // For adding education/work/skills
  const [edu, setEdu] = useState({ type: "", year: "", grade: "", location: "" });
  const [work, setWork] = useState({ place: "", period: "", position: "" });
  const [project, setProject] = useState({ title: "", description: "" });
  const [course, setCourse] = useState({ title: "", description: "" });
  const [certificate, setCertificate] = useState({ year: "", name: "" });

  // Save handler (you can lift this state up or use context for global access)
  const handleSave = () => {
    // Ensure all fields are arrays before saving
    const safeForm = {
      ...form,
      education: Array.isArray(form.education) ? form.education : [],
      work: Array.isArray(form.work) ? form.work : [],
      skills: Array.isArray(form.skills) ? form.skills : [],
      projects: Array.isArray(form.projects) ? form.projects : [],
      courses: Array.isArray(form.courses) ? form.courses : [],
      certificates: Array.isArray(form.certificates) ? form.certificates : []
    };
    localStorage.setItem("resumeData", JSON.stringify(safeForm));
    alert("Resume data saved!");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="resume-modal-backdrop" onClick={onClose}>
      <div className="resume-modal-content resume-builder-modal" onClick={e => e.stopPropagation()}>
        <button className="resume-modal-close" onClick={onClose}>×</button>
        <div className="resume-builder-left">
          <h3>Build Your Resume</h3>
          <form
            onSubmit={e => e.preventDefault()}
            className="resume-form"
            autoComplete="off"
          >
            <label>Name:</label>
            <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
            />
            <label>Location (Region, Country):</label>
            <input
                type="text"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                placeholder="e.g. Mumbai, India"
                required
            />
            <label>Phone:</label>
            <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                required
            />
            <label>Gmail:</label>
            <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
            />
            <label>GitHub:</label>
            <input
                type="text"
                value={form.github}
                onChange={e => setForm(f => ({ ...f, github: e.target.value }))}
                placeholder="github.com/username"
            />
            <label>About You:</label>
            <textarea
                value={form.info}
                onChange={e => setForm(f => ({ ...f, info: e.target.value }))}
                rows={3}
                placeholder="A short paragraph about yourself"
            />
            <div className="resume-section-label">Education</div>
            <div className="resume-inline-group">
            <input
                type="text"
                placeholder="Type (e.g. B.Tech)"
                value={edu.type}
                onChange={e => setEdu(ed => ({ ...ed, type: e.target.value }))}
            />
            <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={e => setEdu(ed => ({ ...ed, year: e.target.value }))}
            />
            <input
                type="text"
                placeholder="Grade/Percentage"
                value={edu.grade}
                onChange={e => setEdu(ed => ({ ...ed, grade: e.target.value }))}
            />
            <input
                type="text"
                placeholder="Location"
                value={edu.location}
                onChange={e => setEdu(ed => ({ ...ed, location: e.target.value }))}
            />
            <button
                type="button"
                onClick={() => {
                if (edu.type && edu.year) {
                    setForm(f => ({ ...f, education: [...f.education, edu] }));
                    setEdu({ type: "", year: "", grade: "", location: "" });
                }
                }}
            >Add</button>
            </div>
            <ul className="resume-list">
            {form.education.map((e, i) => (
                <li key={i}>
                {e.type} ({e.year}) - {e.grade} - {e.location}
                <button type="button" onClick={() => setForm(f => ({
                    ...f,
                    education: f.education.filter((_, idx) => idx !== i)
                }))}>×</button>
                </li>
            ))}
            </ul>
            <div className="resume-section-label">Work Experience</div>
            <div className="resume-inline-group">
            <input
                type="text"
                placeholder="Place of Work"
                value={work.place}
                onChange={e => setWork(w => ({ ...w, place: e.target.value }))}
            />
            <input
                type="text"
                placeholder="Time Period"
                value={work.period}
                onChange={e => setWork(w => ({ ...w, period: e.target.value }))}
            />
            <input
                type="text"
                placeholder="Position"
                value={work.position}
                onChange={e => setWork(w => ({ ...w, position: e.target.value }))}
            />
            <button
                type="button"
                onClick={() => {
                if (work.place && work.period) {
                    setForm(f => ({ ...f, work: [...f.work, work] }));
                    setWork({ place: "", period: "", position: "" });
                }
                }}
            >Add</button>
            </div>
            <ul className="resume-list">
            {form.work.map((w, i) => (
                <li key={i}>
                {w.place} ({w.period}) - {w.position}
                <button type="button" onClick={() => setForm(f => ({
                    ...f,
                    work: f.work.filter((_, idx) => idx !== i)
                }))}>×</button>
                </li>
            ))}
            </ul>
            <div className="resume-section-label">Skills</div>
            <div className="resume-skill-categories">
            {Object.entries(skillsData).map(([category, skills]) => (
                <div key={category} className="resume-skill-category-block">
                <div className="resume-skill-category-title">{category}</div>
                <div className="resume-skill-list">
                    {skills.map(skill => (
                    <button
                        type="button"
                        key={skill}
                        className={`resume-skill-btn${form.skills.includes(skill) ? " selected" : ""}`}
                        onClick={() => {
                        setForm(f =>
                            f.skills.includes(skill)
                            ? { ...f, skills: f.skills.filter(s => s !== skill) } // Remove if already selected
                            : { ...f, skills: [...f.skills, skill] }              // Add if not selected
                        );
                        }}
                    >
                        {skill}
                    </button>
                    ))}
                </div>
                </div>
            ))}
            </div>
            <ul className="resume-list">
            {form.skills.map((s, i) => (
                <li key={i}>
                {s}
                <button type="button" onClick={() => setForm(f => ({
                    ...f,
                    skills: f.skills.filter((_, idx) => idx !== i)
                }))}>×</button>
                </li>
            ))}
            </ul>
            <div className="resume-section-label">Projects</div>
            <div className="resume-inline-group">
              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={e => setProject(p => ({ ...p, title: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Description"
                value={project.description}
                onChange={e => setProject(p => ({ ...p, description: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => {
                  if (project.title && project.description) {
                    setForm(f => ({
                      ...f,
                      projects: [...(Array.isArray(f.projects) ? f.projects : []), project]
                    }));
                    setProject({ title: "", description: "" });
                  }
                }}
              >Add</button>
            </div>
            <ul className="resume-list">
              {(Array.isArray(form.projects) ? form.projects : []).map((p, i) => (
                <li key={i}>
                  <b>{p.title}</b>: {p.description}
                  <button type="button" onClick={() => setForm(f => ({
                    ...f,
                    projects: f.projects.filter((_, idx) => idx !== i)
                  }))}>×</button>
                </li>
              ))}
            </ul>
            <div className="resume-section-label">Courses</div>
            <div className="resume-inline-group">
              <input
                type="text"
                placeholder="Course Title"
                value={course.title}
                onChange={e => setCourse(c => ({ ...c, title: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Description"
                value={course.description}
                onChange={e => setCourse(c => ({ ...c, description: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => {
                  if (course.title && course.description) {
                    setForm(f => ({
                      ...f,
                      courses: [...(Array.isArray(f.courses) ? f.courses : []), course]
                    }));
                    setCourse({ title: "", description: "" });
                  }
                }}
              >Add</button>
            </div>
            <ul className="resume-list">
              {(Array.isArray(form.courses) ? form.courses : []).map((c, i) => (
                <li key={i}>
                  <b>{c.title}</b>: {c.description}
                  <button type="button" onClick={() => setForm(f => ({
                    ...f,
                    courses: f.courses.filter((_, idx) => idx !== i)
                  }))}>×</button>
                </li>
              ))}
            </ul>
            <div className="resume-section-label">Certificates</div>
            <div className="resume-inline-group">
              <input
                type="text"
                placeholder="Year"
                value={certificate.year}
                onChange={e => setCertificate(c => ({ ...c, year: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Certificate Name"
                value={certificate.name}
                onChange={e => setCertificate(c => ({ ...c, name: e.target.value }))}
              />
              <button
                type="button"
                onClick={() => {
                  if (certificate.year && certificate.name) {
                    setForm(f => ({
                      ...f,
                      certificates: [...(Array.isArray(f.certificates) ? f.certificates : []), certificate]
                    }));
                    setCertificate({ year: "", name: "" });
                  }
                }}
              >Add</button>
            </div>
            <ul className="resume-list">
              {(Array.isArray(form.certificates) ? form.certificates : []).map((c, i) => (
                <li key={i}>
                  <b>{c.year}</b>: {c.name}
                  <button type="button" onClick={() => setForm(f => ({
                    ...f,
                    certificates: f.certificates.filter((_, idx) => idx !== i)
                  }))}>×</button>
                </li>
              ))}
            </ul>
            <button className="resume-save-btn" type="button" onClick={handleSave}>
                Save
            </button>
        </form>
        </div>
        <div className="resume-builder-right">
        <div className="resume-preview">
            <h1>{form.name || "Your Name"}</h1>
            <div className="resume-contact">
            {form.location && (
                <span>
                <FaMapMarkerAlt style={{ marginRight: 4, color: "#1976d2" }} />
                {form.location}
                </span>
            )}
            {form.phone && (
                <span>
                | <FaPhone style={{ marginRight: 4, color: "#1976d2" }} />
                {form.phone}
                </span>
            )}
            {form.email && (
                <span>
                | <FaEnvelope style={{ marginRight: 4, color: "#1976d2" }} />
                {form.email}
                </span>
            )}
            {form.github && (
                <span>
                | <FaGithub style={{ marginRight: 4, color: "#1976d2" }} />
                {form.github}
                </span>
            )}
            </div>
            <hr />
            <div className="resume-section">
            <h2>Profile</h2>
            <p>{form.info || "A short professional summary about yourself."}</p>
            </div>
            <hr />
            <div className="resume-section">
            <h2>Education</h2>
            <ul>
                {form.education.length === 0 && <li>Education details will appear here.</li>}
                {form.education.map((e, i) => (
                <li key={i}>
                    <b>{e.type}</b> ({e.year}) - {e.grade} - {e.location}
                </li>
                ))}
            </ul>
            </div>
            <hr />
            <div className="resume-section">
            <h2>Work Experience</h2>
            <ul>
                {form.work.length === 0 && <li>Work experience will appear here.</li>}
                {form.work.map((w, i) => (
                <li key={i}>
                    <b>{w.position}</b> at {w.place} ({w.period})
                </li>
                ))}
            </ul>
            </div>
            <hr />
            <div className="resume-section">
            <h2>Skills</h2>
            <ul className="resume-skills-list">
                {form.skills.length === 0 && <li>Skills will appear here.</li>}
                {form.skills.map((s, i) => (
                <li key={i}>{s}</li>
                ))}
            </ul>
            </div>
            <hr />
            <div className="resume-section">
              <h2>Projects</h2>
              <ul>
                {Array.isArray(form.projects) && form.projects.length === 0 && <li>Project details will appear here.</li>}
                {Array.isArray(form.projects) && form.projects.map((p, i) => (
                  <li key={i}><b>{p.title}</b>: {p.description}</li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="resume-section">
              <h2>Courses</h2>
              <ul>
                {Array.isArray(form.courses) && form.courses.length === 0 && <li>Courses will appear here.</li>}
                {Array.isArray(form.courses) && form.courses.map((c, i) => (
                  <li key={i}><b>{c.title}</b>: {c.description}</li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="resume-section">
              <h2>Certificates</h2>
              <ul>
                {Array.isArray(form.certificates) && form.certificates.length === 0 && <li>Certificates will appear here.</li>}
                {Array.isArray(form.certificates) && form.certificates.map((c, i) => (
                  <li key={i}><b>{c.year}</b>: {c.name}</li>
                ))}
              </ul>
            </div>
            <hr />
            <button className="resume-save-btn" type="button" onClick={handleSave}>
                Save
            </button>
        </div>
        </div>
    </div>
    </div>
);
}

export default ResumeBuilder;