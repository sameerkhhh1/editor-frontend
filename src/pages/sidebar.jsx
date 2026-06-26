import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHandshakeSimple } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { FaBullseye } from "react-icons/fa";
import { SiMicroeditor } from "react-icons/si";
import { FaUserCircle, FaUserEdit } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
// import { IoMagnetSharp } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { MdOutlineNotifications, MdOutlineHome } from "react-icons/md";

import "./sidebar.css";
import AdminSidebar from "../admin/AdminSidebar";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/profile/${userId}`,
        );

        setRole(res.data.role);
        setStatus(res.data.status);

        localStorage.setItem("role", res.data.role);
        localStorage.setItem("status", res.data.status);
      } catch (err) {
        console.log(err);

        localStorage.clear();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const isAccepted = status === "accepted";

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return null;
  if (role === "admin") {
    return <AdminSidebar />;
  }

  return (
    <div className="left-con">
      <div className="left-child">
        {/* Brand */}

        <div className="sidebar-brand">
          <div className="brand-logo">
            <SiMicroeditor size={18} color="white" />
          </div>

          <div className="brand-text">
            <span className="brand-name">RentAEditor</span>
            <span className="brand-tagline">Find your editor</span>
          </div>
        </div>

        {/* Home */}

        <Link
          to="/home"
          className={`sidebar-link ${
            isActive("/home") ? "sidebar-link-active" : ""
          }`}
        >
          <MdOutlineHome size={20} />
          <span>Home</span>
        </Link>

        {/* Profile */}

        <Link
          to="/profile"
          className={`sidebar-link ${
            isActive("/profile") ? "sidebar-link-active" : ""
          }`}
        >
          <FaUserCircle size={20} />
          <span>Profile</span>
        </Link>

        {/* Editors */}

        <Link
          to="/editors"
          className={`sidebar-link ${
            isActive("/editors") ? "sidebar-link-active" : ""
          }`}
        >
          <FaUserEdit size={20} />
          <span>Editors</span>
        </Link>

        {/* ===========================
              CREATOR
        ============================ */}

        {role === "creator" && (
          <>
            {isAccepted ? (
              <>
                <Link
                  to="/projects"
                  className={`sidebar-link ${
                    isActive("/projects") ? "sidebar-link-active" : ""
                  }`}
                >
                  <LuNotebookText size={20} />
                  <span>Projects</span>
                </Link>

                <Link
                  to="/creatorNotification"
                  className={`sidebar-link ${
                    isActive("/creatorNotification")
                      ? "sidebar-link-active"
                      : ""
                  }`}
                >
                  <MdOutlineNotifications size={20} />
                  <span>Notifications</span>
                </Link>
              </>
            ) : (
              <>
                <div className="sidebar-locked">
                  <LuNotebookText size={20} />
                  <span>Projects</span>
                  <IoIosLock size={15} />
                </div>

                <div className="sidebar-locked">
                  <MdOutlineNotifications size={20} />
                  <span>Notifications</span>
                  <IoIosLock size={15} />
                </div>
              </>
            )}
          </>
        )}

        {/* ===========================
              EDITOR
        ============================ */}

        {role === "editor" && (
          <>
            {isAccepted ? (
              <>
                <Link
                  to="/leads"
                  className={`sidebar-link ${
                    isActive("/leads") ? "sidebar-link-active" : ""
                  }`}
                >
                  <FaBullseye size={20} />
                  <span>Leads</span>
                </Link>

                <Link
                  to="/offers"
                  className={`sidebar-link ${
                    isActive("/offers") ? "sidebar-link-active" : ""
                  }`}
                >
                  <FaHandshakeSimple size={20} />
                  <span>Offers</span>
                </Link>

                <Link
                  to="/editorNotification"
                  className={`sidebar-link ${
                    isActive("/editorNotification") ? "sidebar-link-active" : ""
                  }`}
                >
                  <MdOutlineNotifications size={20} />
                  <span>Notifications</span>
                </Link>
              </>
            ) : (
              <>
                <div className="sidebar-locked">
                  <FaBullseye size={20} />
                  <span>Leads</span>
                  <IoIosLock size={15} />
                </div>

                <div className="sidebar-locked">
                  <FaHandshakeSimple size={20} />
                  <span>Offers</span>
                  <IoIosLock size={15} />
                </div>

                <div className="sidebar-locked">
                  <MdOutlineNotifications size={20} />
                  <span>Notifications</span>
                  <IoIosLock size={15} />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Logout */}

      <div className="logout-area" onClick={handleLogout}>
        <TbLogout size={20} />
        <button className="logout-btn">Sign Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
