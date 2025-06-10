import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./ViewApplications.css";

// Example: Replace this with fetch from API or import from JSON/db
// const dummyApplications = [
//   {
//     name: "Riya Mehta",
//     email: "riya.mehta@email.com",
//     phone: "+91 9876543210",
//     jobTitle: "Frontend Developer",
//     resume: "https://example.com/resume/riya.pdf",
//     status: "Pending",
//     appliedOn: "2025-06-10"
//   }
//   // Add more objects or fetch from backend
// ];

export default function ViewApplications() {
  // Simulate fetching data (replace with real fetch if needed)
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Simulate async fetch
    setTimeout(() => {
      // setApplications([]); // Uncomment to test "no applications"
      setApplications(dummyApplications); // Comment to test "no applications"
    }, 500);
  }, []);

  return (
    <>
      <Navbar />
      <div className="view-applications-layout">
        <Sidebar />
        <main className="view-applications-main-content">
          <h2 className="view-applications-title">Job Applications</h2>
          <div className="view-applications-list">
            {applications.length === 0 ? (
              <>
                <div className="view-applications-empty">
                  No one has registered for any job yet.
                </div>
                <div className="view-applications-card view-applications-card--dummy">
                  <div className="view-applications-card-header">
                    <div className="dummy-avatar"></div>
                    <div>
                      <div className="dummy-line" style={{ width: "120px" }}></div>
                      <div className="dummy-line" style={{ width: "80px", marginTop: "0.5rem" }}></div>
                    </div>
                  </div>
                  <div className="dummy-line" style={{ width: "90%" }}></div>
                  <div className="dummy-line" style={{ width: "60%", marginTop: "0.5rem" }}></div>
                  <div className="dummy-line" style={{ width: "70%", marginTop: "0.5rem" }}></div>
                  <div className="dummy-line" style={{ width: "50%", marginTop: "0.5rem" }}></div>
                </div>
              </>
            ) : (
              applications.map((app, idx) => (
                <div className="view-applications-card" key={idx}>
                  <div className="view-applications-card-header">
                    <div className="view-applications-avatar">
                      {app.name[0]}
                    </div>
                    <div>
                      <div className="view-applications-name">{app.name}</div>
                      <div className="view-applications-job">{app.jobTitle}</div>
                    </div>
                  </div>
                  <div className="view-applications-info">
                    <div><strong>Email:</strong> {app.email}</div>
                    <div><strong>Phone:</strong> {app.phone}</div>
                    <div><strong>Status:</strong> {app.status}</div>
                    <div><strong>Applied On:</strong> {app.appliedOn}</div>
                    <div>
                      <a href={app.resume} target="_blank" rel="noopener noreferrer" className="view-applications-resume-link">
                        View Resume
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </>
  );
}