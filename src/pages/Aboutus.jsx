import React from "react";
import "./HomePage.css";
import logo from "/public/logo-clean.png";
import { FaUsers, FaLightbulb, FaHandshake } from "react-icons/fa";
import Navbar from "../components/Navbar";

function AboutUs() {
return (
    <div className="google-homepage">
        <Navbar />
    <div className="center-content">
        <img src={logo} alt="Sahara Logo" style={{ width: 80, marginBottom: 16 }} />
        <h1 className="google-title">About Sahara</h1>
        <div className="tagline" style={{ marginBottom: "2.5rem" }}>
        <FaLightbulb style={{ color: "#1976d2", marginRight: 8 }} />
        Empowering Connections, Enabling Careers
        </div>
        <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 16px rgba(21, 101, 192, 0.08)",
        padding: "2rem",
        color: "#1b263b",
        maxWidth: 400,
        textAlign: "center"
        }}>
        <p>
            <FaUsers style={{ color: "#1565c0", fontSize: 22, verticalAlign: "middle" }} />{" "}
            <b>Sahara</b> is a modern platform designed to bridge the gap between talented students and forward-thinking employers.
            Our mission is to simplify the job search and recruitment process for both graduates and companies.
        </p>
        <p>
            <FaHandshake style={{ color: "#1976d2", fontSize: 22, verticalAlign: "middle" }} />{" "}
            Whether you are a student looking for your first opportunity or an employer seeking fresh talent, Sahara is here to connect you and help you grow.
        </p>
        </div>
    </div>
    </div>
);
}

export default AboutUs;