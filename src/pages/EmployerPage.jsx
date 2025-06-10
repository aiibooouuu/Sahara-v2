import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './EmployerPage.css';
import companyData from '../data/company.json';
import employees from '../data/employees.json';

function EmployerPage() {
return (
    <>
    <Navbar />
    <div className="employer-layout">
        <Sidebar type="employer" />
        <main className="employer-main-content">
        <div className="employer-row">
            <div className="employer-box company-info modern-card">
            <div className="company-header">
                <img
                src={companyData.logo || "https://ui-avatars.com/api/?name=" + encodeURIComponent(companyData.name)}
                alt="Company Logo"
                className="company-logo"
                />
                <div>
                <h2 className="company-title">{companyData.name}</h2>
                <div className="company-industry">{companyData.industry}</div>
                </div>
            </div>
            <div className="company-details-grid">
                <div>
                <span className="company-label">Founded:</span>
                <span>{companyData.foundingDate}</span>
                </div>
                <div>
                <span className="company-label">CEO:</span>
                <span>{companyData.ceo}</span>
                </div>
                <div>
                <span className="company-label">Headquarters:</span>
                <span>{companyData.headquarters}</span>
                </div>
                <div>
                <span className="company-label">Location:</span>
                <span>{companyData.location}</span>
                </div>
                <div>
                <span className="company-label">Revenue:</span>
                <span>{companyData.revenue}</span>
                </div>
                <div>
                <span className="company-label">Stock Symbol:</span>
                <span>{companyData.stockSymbol}</span>
                </div>
                <div>
                <span className="company-label">Global Offices:</span>
                <span>{companyData.globalOffices}</span>
                </div>
                <div>
                <span className="company-label">Contact:</span>
                <span>{companyData.contact}</span>
                </div>
                <div>
                <span className="company-label">Email:</span>
                <a href={`mailto:${companyData.email}`}>{companyData.email}</a>
                </div>
                <div>
                <span className="company-label">Website:</span>
                <a href={companyData.website} target="_blank" rel="noopener noreferrer">{companyData.website}</a>
                </div>
                <div className="company-social">
                <span className="company-label">Social:</span>
                <span>
                    {companyData.linkedin && <a href={companyData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                    {companyData.twitter && <> | <a href={companyData.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></>}
                    {companyData.facebook && <> | <a href={companyData.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></>}
                </span>
                </div>
            </div>
            <div className="company-about">
                <span className="company-label">About:</span>
                <span>{companyData.about}</span>
            </div>
            </div>
            <div className="employer-box company-strength modern-card">
            <div className="strength-icon-circle">
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <circle cx="19" cy="19" r="19" fill="#e3eafc"/>
                <path d="M12 28v-2a4 4 0 014-4h6a4 4 0 014 4v2" stroke="#415a77" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="19" cy="16" r="4" stroke="#415a77" strokeWidth="2"/>
                </svg>
            </div>
            <div className="strength-label">Current Strength</div>
            <div className="strength-number">{employees.length}</div>
            <div className="strength-subtext">Employees</div>
            <div className="strength-extra">
                <div>
                <span className="strength-extra-label">Avg. Salary:</span>
                <span>
                    {
                    employees.length > 0
                        ? "₹" + (
                            employees
                            .map(e => Number((e.salary || "0").replace(/[^\d]/g, "")))
                            .reduce((a, b) => a + b, 0) /
                            employees.length
                        ).toLocaleString("en-IN", { maximumFractionDigits: 0 })
                        : "—"
                    }
                </span>
                </div>
                <div>
                <span className="strength-extra-label">Departments:</span>
                <span>
                    {
                    [...new Set(employees.map(e => e.post))].slice(0, 3).join(", ")
                    }
                    {employees.length > 0 && employees.map(e => e.post).filter((v, i, a) => a.indexOf(v) === i).length > 3 ? "..." : ""}
                </span>
                </div>
                <div>
                <span className="strength-extra-label">Last Joined:</span>
                <span>
                    {
                    employees.length > 0
                        ? employees
                            .map(e => e.dateJoined)
                            .sort()
                            .reverse()[0]
                        : "—"
                    }
                </span>
                </div>
            </div>
            </div>
        </div>
        
        <div className="employer-row">
          <div className="employer-table-container modern-card">
            <h3>Employee List</h3>
            <div className="employer-table-scroll">
              <table className="employer-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date Joined</th>
                    <th>Salary</th>
                    <th>Post</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td>{emp.name}</td>
                      <td>{emp.dateJoined}</td>
                      <td>{emp.salary}</td>
                      <td>{emp.post}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </main>
    </div>
    </>
);
}

export default EmployerPage;