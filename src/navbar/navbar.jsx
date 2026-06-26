import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { IoMagnetSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { SiMicroeditor } from "react-icons/si";

const Navbar = () => {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const location = useLocation();

  const syncFromStorage = () => {
    setRole(localStorage.getItem("role") || "");
    setStatus(localStorage.getItem("status") || "");
  };

  useEffect(() => {
    syncFromStorage();
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const isAccepted = status === "accepted";

  const notifPath =
    role === "creator"
      ? "/creatorNotification"
      : role === "editor"
        ? "/editorNotification"
        : "/home";

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className={`nav-link ${isActive(to) ? "nav-link-active" : ""}`}
    >
      {icon}
      <span className="nav-label">{label}</span>
    </Link>
  );

  const LockedItem = ({ label }) => (
    <div className="nav-link nav-locked">
      <IoIosLock size={17} />
      <span className="nav-label">{label}</span>
    </div>
  );

  return (
    <div className="nav-con">
      {/* Brand */}
      <div className="nav-brand">
        <SiMicroeditor size={22} color="#8b5cf6" />
        <span className="nav-brand-name">RentAEditor</span>
      </div>

      <div className="nav-links">
        {/* Home */}
        <NavLink to="/home" icon={<MdOutlineHome size={20} />} label="Home" />

        {/* Editors */}
        <NavLink
          to="/editors"
          icon={<FaUserEdit size={18} />}
          label="Editors"
        />

        {/* CREATOR accepted */}
        {role === "creator" && isAccepted && (
          <>
            <NavLink
              to="/projects"
              icon={<IoMagnetSharp size={18} />}
              label="Projects"
            />
            <Link
              to={notifPath}
              className={`nav-icon-btn ${isActive(notifPath) ? "nav-icon-active" : ""}`}
            >
              <FaRegBell size={20} />
            </Link>
          </>
        )}

        {/* CREATOR locked */}
        {role === "creator" && !isAccepted && (
          <>
            <LockedItem label="Projects" />
            <LockedItem label="Notifications" />
          </>
        )}

        {/* EDITOR accepted */}
        {role === "editor" && isAccepted && (
          <>
            <NavLink
              to="/leads"
              icon={<IoMagnetSharp size={18} />}
              label="Leads"
            />
            <NavLink
              to="/offers"
              icon={<IoMagnetSharp size={18} />}
              label="Offers"
            />
            <Link
              to={notifPath}
              className={`nav-icon-btn ${isActive(notifPath) ? "nav-icon-active" : ""}`}
            >
              <FaRegBell size={20} />
            </Link>
          </>
        )}

        {/* EDITOR locked */}
        {role === "editor" && !isAccepted && (
          <>
            <LockedItem label="Leads" />
            <LockedItem label="Offers" />
            <LockedItem label="Notifications" />
          </>
        )}

        {/* Admin */}
        {role === "admin" && (
          <NavLink to="/admin" icon={null} label="Admin Panel" />
        )}
      </div>

      {/* Profile */}
      <Link
        to="/profile"
        className={`nav-icon-btn ${isActive("/profile") ? "nav-icon-active" : ""}`}
      >
        <FaUserCircle size={26} />
      </Link>
    </div>
  );
};

export default Navbar;
