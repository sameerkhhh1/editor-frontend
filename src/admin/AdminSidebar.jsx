import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHandshakeSimple } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { FaBullseye } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineHome,
  MdOutlineNotifications,
  MdPeople,
} from "react-icons/md";

import { FaUserCircle, FaUserEdit } from "react-icons/fa";

import { TbLogout } from "react-icons/tb";

// import { IoMagnetSharp } from "react-icons/io5";

import { SiMicroeditor } from "react-icons/si";

import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-sidebar">
      <div>
        {/* Logo */}

        <div className="admin-brand">
          <div className="admin-logo">
            <SiMicroeditor size={18} color="white" />
          </div>

          <div>
            <h3>RentAEditor</h3>

            <p>Admin Panel</p>
          </div>
        </div>

        {/* Dashboard */}

        <Link
          to="/admin"
          className={`admin-link ${
            isActive("/admin") ? "admin-link-active" : ""
          }`}
        >
          <MdDashboard size={20} />
          Dashboard
        </Link>

        {/* Home */}

        <Link
          to="/home"
          className={`admin-link ${
            isActive("/home") ? "admin-link-active" : ""
          }`}
        >
          <MdOutlineHome size={20} />
          Home
        </Link>

        {/* Profile */}

        <Link
          to="/profile"
          className={`admin-link ${
            isActive("/profile") ? "admin-link-active" : ""
          }`}
        >
          <FaUserCircle size={20} />
          Profile
        </Link>

        {/* Editors */}

        <Link
          to="/editors"
          className={`admin-link ${
            isActive("/editors") ? "admin-link-active" : ""
          }`}
        >
          <FaUserEdit size={20} />
          Editors
        </Link>

        {/* Projects */}

        <Link
          to="/projects"
          className={`admin-link ${
            isActive("/projects") ? "admin-link-active" : ""
          }`}
        >
          {/* <IoMagnetSharp size={20} /> */}
          <LuNotebookText size={20} />
          Projects
        </Link>

        {/* Leads */}

        <Link
          to="/leads"
          className={`admin-link ${
            isActive("/leads") ? "admin-link-active" : ""
          }`}
        >
          {/* <IoMagnetSharp size={20} /> */}
          <FaBullseye size={20} />
          Leads
        </Link>

        {/* Offers */}

        <Link
          to="/offers"
          className={`admin-link ${
            isActive("/offers") ? "admin-link-active" : ""
          }`}
        >
          {/* <IoMagnetSharp size={20} /> */}
          <FaHandshakeSimple size={20} />
          Offers
        </Link>

        {/* Creator Notifications */}

        <Link
          to="/creatorNotification"
          className={`admin-link ${
            isActive("/creatorNotification") ? "admin-link-active" : ""
          }`}
        >
          <MdOutlineNotifications size={20} />
          Creator Notifications
        </Link>

        {/* Editor Notifications */}

        <Link
          to="/editorNotification"
          className={`admin-link ${
            isActive("/editorNotification") ? "admin-link-active" : ""
          }`}
        >
          <MdOutlineNotifications size={20} />
          Editor Notifications
        </Link>

        {/* Users */}

        <Link
          to="/admin"
          className={`admin-link ${
            isActive("/admin") ? "admin-link-active" : ""
          }`}
        >
          <MdPeople size={20} />
          Manage Users
        </Link>
      </div>

      {/* Logout */}

      <div className="admin-logout" onClick={handleLogout}>
        <TbLogout size={20} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default AdminSidebar;
