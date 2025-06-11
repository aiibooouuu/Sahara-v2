import React, { useState } from "react";
import "./ContactUs.css";
import logo from "/public/logo-clean.png";
import { FaEnvelope, FaPhone, FaStar, FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";

function ContactUs() {
const [stars, setStars] = useState(0);

return (
    <div className="google-homepage">
    <Navbar />
    <div className="contactus-main">
        {/* Left Side */}
        <div className="contactus-left">
        <img src={logo} alt="Sahara Logo" className="contactus-logo" />
        <div className="contactus-circles">
            <a
            href={`https://wa.me/919022418384?text=${encodeURIComponent(
                "Hello, this message is in regard to review/feedback for Sahara."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contactus-circle whatsapp"
            title="WhatsApp"
            >
            <FaPhone />
            </a>
            <a
            href="mailto:sahara@example.com"
            className="contactus-circle email"
            title="Email"
            >
            <FaEnvelope />
            </a>
        </div>
        </div>
        {/* Right Side */}
        <div className="contactus-right">
        <h1 className="google-title">Contact Us</h1>
        <div className="tagline" style={{ marginBottom: "2rem" }}>
            We'd love to hear from you!
        </div>
        <form className="popup-form contactus-form">
            <fieldset className="styled-fieldset">
            <legend><FaEnvelope /> Email</legend>
            <input type="email" placeholder="Your email" required />
            </fieldset>
            <fieldset className="styled-fieldset">
            <legend><FaPhone /> Contact Number</legend>
            <input type="tel" placeholder="Your contact number" required />
            </fieldset>
            <fieldset className="styled-fieldset">
            <legend>Review</legend>
            <textarea placeholder="Write your review..." required />
            </fieldset>
            <fieldset className="styled-fieldset">
            <legend>Rating</legend>
            <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                <FaStar
                    key={n}
                    style={{ color: n <= stars ? "#FFD700" : "#b0bec5", cursor: "pointer", fontSize: 22 }}
                    onClick={() => setStars(n)}
                    tabIndex={0}
                    aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                />
                ))}
            </div>
            </fieldset>
            <button type="submit" className="role-btn">Send</button>
        </form>
        </div>
    </div>
    </div>
);
}

export default ContactUs;