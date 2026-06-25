import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { IoMagnetSharp } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";

const Navbar = () => {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

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

  const LockedItem = ({ label }) => (
    <div className="nav-child" style={{ opacity: 0.4, cursor: "not-allowed" }}>
      <IoIosLock color="white" size={18} />
      <span style={{ color: "#f8f8f9" }}>{label}</span>
    </div>
  );

  return (
    <div className="nav-con">
      {/* Brand */}
      <div className="nav-child">
        <img
          className="brand-img"
          src="https://img.freepik.com/premium-vector/r-logo-design_731343-266.jpg"
          alt="brand img"
        />
        <p style={{ color: "#f8f8f9", margin: "0px" }}>Rent A Editor</p>
      </div>

      {/* Home — sabko */}
      <div className="nav-child">
        <MdOutlineHome color="white" size={25} />
        <Link style={{ textDecoration: "none", color: "#f8f8f9" }} to="/home">
          Home
        </Link>
      </div>

      {/* ✅ Editors — sabko, no lock, no condition */}
      <div className="nav-child">
        <FaUserEdit color="white" size={25} />
        <Link
          style={{ textDecoration: "none", color: "#f8f8f9" }}
          to="/editors"
        >
          Editors
        </Link>
      </div>

      {/* CREATOR accepted */}
      {role === "creator" && isAccepted && (
        <>
          <div className="nav-child">
            <IoMagnetSharp color="white" size={25} />
            <Link
              style={{ textDecoration: "none", color: "#f8f8f9" }}
              to="/projects"
            >
              Projects
            </Link>
          </div>
          <Link to={notifPath}>
            <FaRegBell color="white" size={25} />
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
          <div className="nav-child">
            <IoMagnetSharp color="white" size={25} />
            <Link
              style={{ textDecoration: "none", color: "#f8f8f9" }}
              to="/leads"
            >
              Leads
            </Link>
          </div>
          <div className="nav-child">
            <IoMagnetSharp color="white" size={25} />
            <Link
              style={{ textDecoration: "none", color: "#f8f8f9" }}
              to="/offers"
            >
              Offers
            </Link>
          </div>
          <Link to={notifPath}>
            <FaRegBell color="white" size={25} />
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
        <div className="nav-child">
          <Link
            style={{ textDecoration: "none", color: "#f8f8f9" }}
            to="/admin"
          >
            Admin Panel
          </Link>
        </div>
      )}

      {/* Profile — sabko */}
      <Link to="/profile">
        <FaUserCircle color="white" size={28} />
      </Link>
    </div>
  );
};

export default Navbar;
