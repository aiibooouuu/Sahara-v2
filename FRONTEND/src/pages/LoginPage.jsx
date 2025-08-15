import React, { useState } from "react";
import { FaUser, FaLock, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";

export default function LoginPage() {
    const [role, setRole] = useState("employee");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/login/",
                { username, password },
                { withCredentials: true } // for cookies/session handling
            );

            if (data.message === "Login Successful") {
                if (role === "employee") {
                    navigate("/employee");
                } else {
                    navigate("/employer");
                }
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Login failed. Please check your details.");
        }
    };


    return (
        <div className="google-homepage">
            <div className="center-content">
                <h1 className="google-title">Login</h1>
                <p className="tagline">Welcome back! Please log in to continue.</p>

                {/* Role Switch */}
                <div className="role-buttons" style={{ marginBottom: "1.5rem" }}>
                    <button
                        className={`role-btn ${role === "employer" ? "active" : ""}`}
                        onClick={() => setRole("employer")}
                        type="button"
                    >
                        <FaBriefcase /> Employer
                    </button>
                    <button
                        className={`role-btn ${role === "employee" ? "active" : ""}`}
                        onClick={() => setRole("employee")}
                        type="button"
                    >
                        <FaUser /> Employee
                    </button>
                </div>

                {/* Login Form */}
                <form className="popup-form" onSubmit={handleLogin}>
                    <fieldset className="styled-fieldset">
                        <legend><FaUser /> Username</legend>
                        <input
                            type="text"
                            placeholder="Your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ outline: "none", border: "none", background: "transparent" }}
                        />
                    </fieldset>

                    <fieldset className="styled-fieldset">
                        <legend><FaLock /> Password</legend>
                        <input
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                outline: "none",
                                border: "none",
                                background: "transparent",
                                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                                boxShadow: "0 0 0px 1000px transparent inset",
                                WebkitTextFillColor: "#22223b",
                                caretColor: "#22223b"
                            }}
                        />
                    </fieldset>

                    <button type="submit" className="role-btn" style={{ width: "100%" }}>
                        Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                </form>
            </div>
        </div>
    );
}
