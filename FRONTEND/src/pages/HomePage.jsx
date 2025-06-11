import React, { useState } from "react";
import Typical from "react-typical";
import "./HomePage.css";
import logo from "/public/logo-clean.png";
import Navbar from "../components/Navbar";
import { FaUser, FaGraduationCap, FaMapMarkerAlt, FaBirthdayCake, FaEnvelope, FaBuilding, FaIndustry, FaInfoCircle, FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Modal({ show, onClose, children }) {
if (!show) return null;
return (
    <div className="modal-backdrop">
    <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
    </div>
    </div>
);
}

function HomePage() {
const [modalType, setModalType] = useState(null);
const navigate = useNavigate();
return (
    <div className="google-homepage">
    <Navbar />
    <div className="center-content">
        <h1 className="google-title"><img src={logo} alt="logo" /></h1>
        <div className="tagline">
        Are you&nbsp;
        <Typical
            steps={[
            "a graduate student?", 2000,
            "a diploma student?", 2000,
            "looking for a job?", 2000,
            ]}
            loop={Infinity}
            wrapper="span"
        />
        </div>
        <div className="role-box">
        <div className="role-label">Choose your role</div>
        <div className="role-buttons">
            <button className="role-btn" onClick={() => setModalType("employee")}>Employee</button>
            <button className="role-btn" onClick={() => setModalType("employer")}>Employer</button>
        </div>
        </div>
    </div>

    {/* Modal for Employee */}
    <Modal show={modalType === "employee"} onClose={() => setModalType(null)}>
        <h2>Employee Details</h2>
        <form className="popup-form"
        onSubmit={(e) => {
            e.preventDefault();
            setModalType(null);
            navigate("/employee");}}>
        <fieldset className="styled-fieldset">
            <legend><FaUser /> Name</legend>
            <input type="text" placeholder="Enter your name" required />
        </fieldset>
        <fieldset className="styled-fieldset">
            <legend><FaGraduationCap /> Education</legend>
            <input type="text" placeholder="Your education" required />
        </fieldset>
        <fieldset className="styled-fieldset">
            <legend><FaMapMarkerAlt /> Location</legend>
            <input type="text" placeholder="Your location" required />
        </fieldset>
        <fieldset className="styled-fieldset">
            <legend><FaCalendar /> Date of Birth</legend>
            <input type="date" required />
        </fieldset>
        <fieldset className="styled-fieldset">
            <legend><FaEnvelope /> Email</legend>
            <input type="email" placeholder="Your email" required />
        </fieldset>
        <button type="submit" className="role-btn">Submit</button>
        </form>
    </Modal>

    {/* Modal for Employer */}
    <Modal show={modalType === "employer"} onClose={() => setModalType(null)}>
        <h2>Employer Details</h2>
        <form className="popup-form"
        onSubmit={(e) => {
            e.preventDefault();
            setModalType(null);
            navigate("/employer");}}>
        <fieldset className="styled-fieldset">
            <legend><FaBuilding /> Company Name</legend>
            <input type="text" placeholder="Company name" required />
        </fieldset>
        <fieldset className="styled-fieldset">
            <legend><FaIndustry /> Company Field</legend>
            <input type="text" placeholder="Industry/Field" required />
        </fieldset>
        <fieldset className="styled-fieldset">
            <legend><FaInfoCircle /> Description</legend>
            <textarea placeholder="Short description" required />
        </fieldset>
        <button type="submit" className="role-btn">Submit</button>
        </form>
    </Modal>
    </div>
);
}

export default HomePage;