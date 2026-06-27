import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

import "./home.css";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
// import { SiMicroeditor } from "react-icons/si";
import { IoIosLock } from "react-icons/io";
// import { FaUserCircle } from "react-icons/fa";
// import { FaUserEdit } from "react-icons/fa";
// import { TbLogout } from "react-icons/tb";
// import { IoMagnetSharp } from "react-icons/io5";
// import { MdOutlineNotifications } from "react-icons/md";
// import { MdOutlineHome } from "react-icons/md";
import axios from "axios";
import Sidebar from "./sidebar";

const Home = () => {
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [stats, setStats] = useState({});
  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    const fetchStats = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/projects/stats/${userId}`,
        );
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchHomeUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/profile/${userId}`,
        );
        setStatus(res.data.status);
        setRole(res.data.role);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHomeUser();
  }, []);

  // const handleLogout = () => {
  //   localStorage.clear();
  //   alert("logout successfull");
  //   window.dispatchEvent(new Event("storage"));
  //   navigate("/login");
  // };

  const isAccepted = status === "accepted";
  // const isActive = (path) => location.pathname === path;

  // const renderSidebar = () => (
  //   <div className="left-con">
  //     <div className="left-child">
  //       {/* Brand */}
  //       <div className="sidebar-brand">
  //         <div className="brand-logo">
  //           <SiMicroeditor size={18} color="white" />
  //         </div>
  //         <div className="brand-text">
  //           <span className="brand-name">RentAEditor</span>
  //           <span className="brand-tagline">Find your editor</span>
  //         </div>
  //       </div>

  //       <Link
  //         to="/home"
  //         className={`sidebar-link ${isActive("/home") ? "sidebar-link-active" : ""}`}
  //       >
  //         {/* <FaUserCircle size={20} /> */}
  //         <MdOutlineHome style={{ backgroundColor: "transparent" }} size={20} />
  //         <span style={{ backgroundColor: "transparent" }}>Home</span>
  //       </Link>

  //       {/* Profile */}
  //       <Link
  //         to="/profile"
  //         className={`sidebar-link ${isActive("/profile") ? "sidebar-link-active" : ""}`}
  //       >
  //         <FaUserCircle size={20} />
  //         <span>Profile</span>
  //       </Link>

  //       {/* Editors */}
  //       <Link
  //         to="/editors"
  //         className={`sidebar-link ${isActive("/editors") ? "sidebar-link-active" : ""}`}
  //       >
  //         <FaUserEdit size={20} />
  //         <span>Editors</span>
  //       </Link>

  //       {/* CREATOR accepted */}
  //       {role === "creator" && isAccepted && (
  //         <>
  //           <Link
  //             to="/projects"
  //             className={`sidebar-link ${isActive("/projects") ? "sidebar-link-active" : ""}`}
  //           >
  //             <IoMagnetSharp size={20} />
  //             <span>Projects</span>
  //           </Link>
  //           <Link
  //             to="/creatorNotification"
  //             className={`sidebar-link ${isActive("/creatorNotification") ? "sidebar-link-active" : ""}`}
  //           >
  //             <MdOutlineNotifications size={20} />
  //             <span>Notifications</span>
  //           </Link>
  //         </>
  //       )}

  //       {/* CREATOR locked */}
  //       {role === "creator" && !isAccepted && (
  //         <>
  //           <div className="sidebar-locked">
  //             <IoMagnetSharp size={20} />
  //             <span>Projects</span>
  //             <IoIosLock size={15} />
  //           </div>
  //           <div className="sidebar-locked">
  //             <MdOutlineNotifications size={20} />
  //             <span>Notifications</span>
  //             <IoIosLock size={15} />
  //           </div>
  //         </>
  //       )}

  //       {/* EDITOR accepted */}
  //       {role === "editor" && isAccepted && (
  //         <>
  //           <Link
  //             to="/leads"
  //             className={`sidebar-link ${isActive("/leads") ? "sidebar-link-active" : ""}`}
  //           >
  //             <IoMagnetSharp size={20} />
  //             <span>Leads</span>
  //           </Link>
  //           <Link
  //             to="/offers"
  //             className={`sidebar-link ${isActive("/offers") ? "sidebar-link-active" : ""}`}
  //           >
  //             <IoMagnetSharp size={20} />
  //             <span>Offers</span>
  //           </Link>
  //           <Link
  //             to="/editorNotification"
  //             className={`sidebar-link ${isActive("/editorNotification") ? "sidebar-link-active" : ""}`}
  //           >
  //             <MdOutlineNotifications size={20} />
  //             <span>Notifications</span>
  //           </Link>
  //         </>
  //       )}

  //       {/* EDITOR locked */}
  //       {role === "editor" && !isAccepted && (
  //         <>
  //           <div className="sidebar-locked">
  //             <IoMagnetSharp size={20} />
  //             <span>Leads</span>
  //             <IoIosLock size={15} />
  //           </div>
  //           <div className="sidebar-locked">
  //             <IoMagnetSharp size={20} />
  //             <span>Offers</span>
  //             <IoIosLock size={15} />
  //           </div>
  //           <div className="sidebar-locked">
  //             <MdOutlineNotifications size={20} />
  //             <span>Notifications</span>
  //             <IoIosLock size={15} />
  //           </div>
  //         </>
  //       )}
  //     </div>

  //     {/* Logout */}
  //     <div className="logout-area" onClick={handleLogout}>
  //       <TbLogout size={20} />
  //       <button className="logout-btn">Sign Out</button>
  //     </div>
  //   </div>
  // );

  return (
    <>
      {isAccepted ? (
        <div className="con">
          {/* {renderSidebar()} */}
          <Sidebar />

          <div className="upper-con">
            <span className="page-title">Home — Features Unlocked</span>

            <div className="upper">
              <img
                className="welcome-img"
                src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                // src="https://tse4.mm.bing.net/th/id/OIP.RhaZVy8P8ZwJKWK1Pmw18QHaHa?pid=Api&P=0&h=180"
                alt="welcome"
              />
              <span className="welcome-title">Welcome back!</span>
              <p className="welcome-sub">Your application has been accepted.</p>
              <p className="welcome-sub">
                You now have access to all features.
              </p>
            </div>

            {role === "creator" && (
              <div
                style={{
                  marginBottom: "24px",
                  width: "100%",
                  maxWidth: "680px",
                }}
              >
                <span
                  className="features-heading"
                  style={{
                    textAlign: "center",
                    marginLeft: "280px",
                  }}
                >
                  Project Stats
                </span>
                <div style={{ display: "flex", gap: "14px" }}>
                  <div
                    style={{
                      backgroundColor: "#151d27",
                      borderRadius: "10px",
                      padding: "16px 24px",
                      textAlign: "center",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#4e9eff",
                        backgroundColor: "transparent",
                      }}
                    >
                      {stats.open ?? 0}
                    </p>
                    <p className="welcome-sub">Open</p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#151d27",
                      borderRadius: "10px",
                      padding: "16px 24px",
                      textAlign: "center",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#4ecb71",
                        backgroundColor: "transparent",
                      }}
                    >
                      {stats.active ?? 0}
                    </p>
                    <p className="welcome-sub">Active</p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#151d27",
                      borderRadius: "10px",
                      padding: "16px 24px",
                      textAlign: "center",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#a78bfa",
                        backgroundColor: "transparent",
                      }}
                    >
                      {stats.completed ?? 0}
                    </p>
                    <p className="welcome-sub">Completed</p>
                  </div>
                </div>
              </div>
            )}

            <span
              className="features-heading"
              style={{ textAlign: "center", marginLeft: "240px" }}
            >
              Features
            </span>
            <div className="middle-con">
              <div className="middle-child">
                <div className="feature-icon-wrap">
                  <FaPeopleGroup size={45} />
                </div>
                <p className="feature-title">Editors</p>
                <p className="feature-desc">
                  Browse and hire professional editors.
                </p>
              </div>
              <div className="middle-child">
                <div className="feature-icon-wrap">
                  <MdPeopleAlt size={45} />
                </div>
                <p className="feature-title">
                  {role === "creator" ? "Projects" : "Leads"}
                </p>
                <p className="feature-desc">Manage your leads and queries.</p>
              </div>
              <div className="middle-child">
                <div className="feature-icon-wrap">
                  <AiFillMessage size={45} />
                </div>
                <p className="feature-title">Messages</p>
                <p className="feature-desc">Chat with editors and clients.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="con">
          {/* {renderSidebar()} */}
          <Sidebar />

          <div className="upper-con">
            <span className="page-title">Home — Application Pending</span>

            <div className="upper">
              <img
                className="welcome-img"
                src="https://icons.veryicon.com/png/o/miscellaneous/admin-dashboard-flat-multicolor/send-message.png"
                alt="application sent"
                style={{ borderRadius: 0 }}
              />
              <span className="welcome-title">Application Sent!</span>
              <p className="welcome-sub">
                Please wait while our team reviews your application.
              </p>
              <p className="welcome-sub">
                You will get notified once your application is approved.
              </p>
            </div>

            <span
              className="features-heading"
              style={{ textAlign: "center", marginLeft: "240px" }}
            >
              Features
            </span>
            <div className="middle-con">
              <div className="middle-child">
                <div className="feature-icon-wrap">
                  <IoIosLock size={45} />
                </div>
                <p className="feature-title">Editors</p>
                <p className="feature-desc">
                  Complete your application to unlock.
                </p>
              </div>
              <div className="middle-child">
                <div className="feature-icon-wrap">
                  <IoIosLock size={45} />
                </div>
                <p className="feature-title">
                  {role === "creator" ? "Projects" : "Leads"}
                </p>
                <p className="feature-desc">
                  Complete your application to unlock.
                </p>
              </div>
              <div className="middle-child">
                <div className="feature-icon-wrap">
                  <IoIosLock size={45} />
                </div>
                <p className="feature-title">Messages</p>
                <p className="feature-desc">
                  Complete your application to unlock.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
