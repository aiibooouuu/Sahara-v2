import React, { useState } from "react";
import Typical from "react-typical";
import "./HomePage.css";
import logo from "/public/logo-clean.png";
import Navbar from "../components/Navbar";
import { FaUser, FaMapMarkerAlt, FaBirthdayCake, FaEnvelope, FaBuilding, FaIndustry, FaInfoCircle, FaCalendar, FaLock, FaBriefcase} from "react-icons/fa";
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
        <h2>Employee Registration</h2>
        <form className="popup-form"
        onSubmit={(e) => {
            e.preventDefault();
            setModalType(null);
            navigate("/employee");}}>
        <fieldset className="styled-fieldset">
            <legend><FaUser /> Username</legend>
            <input type="text" placeholder="Enter Username (No Spaces)" required />
        </fieldset>
        <fieldset className="styled-fieldset">
            <legend><FaEnvelope /> Email</legend>
            <input type="text" placeholder="Your email" required />
        </fieldset>
        <fieldset className="styled-fieldset">
            <legend><FaLock /> Password</legend>
            
            <input
            type="password"
            placeholder="Your password"
            required
            style={{
                backgroundColor: "transparent",
                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                boxShadow: "0 0 0px 1000px transparent inset",
                WebkitTextFillColor: "#22223b",
                caretColor: "#22223b",
                outline : "none",
                border : "none"
            }}
            />

        </fieldset>
        <fieldset className="styled-fieldset">
            <legend><FaBriefcase /> Status</legend>
            <select required className="styled-select">
                <option value="">Select status</option>
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
            </select>
        </fieldset>
        <button type="submit" className="role-btn">Submit</button>
        </form>
    </Modal>

    {/* Modal for Employer */}
    <Modal show={modalType === "employer"} onClose={() => setModalType(null)}>
        <h2>Employer Registration</h2>
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