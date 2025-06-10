import React from 'react';
import './Sidebar.css';
import { FaHome, FaUser, FaBriefcase, FaFolder, FaFolderOpen } from 'react-icons/fa';

function Sidebar({ type }) {
return (
    <div className="sidebar">

    {type === 'employee' ? (
        <>
        <a href="/employee"><FaHome /> Home</a>
        <a href="/profile"><FaUser /> My Profile</a>
        <a href="/applications"><FaBriefcase /> My Applications</a>
        </>
    ) : (
        <>
        <a href="/employer"><FaHome /> Home</a>
        <a href="/jobsapplications"><FaBriefcase /> List Jobs </a>
        <a href="/viewapplications"><FaFolderOpen /> View Applications</a>
        </>
    )}
    </div>
);
}

export default Sidebar;
