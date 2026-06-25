import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { SiMicroeditor } from "react-icons/si";
import { IoIosLock } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { IoMagnetSharp } from "react-icons/io5";
import axios from "axios";

const Home = () => {
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.clear();
    alert("logout successfull");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    gap: "15px",
    paddingLeft: "20px",
    fontSize: "22px",
    alignItems: "center",
  };

  const lockedItemStyle = {
    display: "flex",
    gap: "15px",
    paddingLeft: "20px",
    fontSize: "22px",
    alignItems: "center",
    opacity: 0.4,
    cursor: "not-allowed",
  };

  const isAccepted = status === "accepted";

  // ✅ Sidebar — accepted/locked dono mein same structure
  const renderSidebar = () => (
    <div
      className="left-con"
      style={{ backgroundColor: "#0d131d", borderRight: "1px solid #656d77" }}
    >
      <div className="left-child">
        <div style={linkStyle}>
          <SiMicroeditor size={25} color="white" />
          <h4>Rent A Editor</h4>
        </div>

        {/* Profile — sabko always */}
        <Link to="/profile" style={linkStyle}>
          <FaUserCircle size={35} />
          <h4>Profile</h4>
        </Link>

        {/* ✅ Editors — sabko, no lock */}
        <Link to="/editors" style={linkStyle}>
          <FaUserEdit size={35} />
          <h4>Editors</h4>
        </Link>

        {/* ✅ CREATOR accepted */}
        {role === "creator" && isAccepted && (
          <>
            <Link to="/projects" style={linkStyle}>
              <IoMagnetSharp size={35} />
              <h4>Projects</h4>
            </Link>
            <Link to="/creatorNotification" style={linkStyle}>
              <IoMagnetSharp size={35} />
              <h4>Notifications</h4>
            </Link>
          </>
        )}

        {/* ✅ CREATOR locked */}
        {role === "creator" && !isAccepted && (
          <>
            <div style={lockedItemStyle}>
              <IoMagnetSharp size={35} />
              <h4>Projects</h4>
              <IoIosLock size={20} />
            </div>
            <div style={lockedItemStyle}>
              <IoMagnetSharp size={35} />
              <h4>Notifications</h4>
              <IoIosLock size={20} />
            </div>
          </>
        )}

        {/* ✅ EDITOR accepted */}
        {role === "editor" && isAccepted && (
          <>
            <Link to="/leads" style={linkStyle}>
              <IoMagnetSharp size={35} />
              <h4>Leads</h4>
            </Link>
            <Link to="/offers" style={linkStyle}>
              <IoMagnetSharp size={35} />
              <h4>Offers</h4>
            </Link>
            <Link to="/editorNotification" style={linkStyle}>
              <IoMagnetSharp size={35} />
              <h4>Notifications</h4>
            </Link>
          </>
        )}

        {/* ✅ EDITOR locked */}
        {role === "editor" && !isAccepted && (
          <>
            <div style={lockedItemStyle}>
              <IoMagnetSharp size={35} />
              <h4>Leads</h4>
              <IoIosLock size={20} />
            </div>
            <div style={lockedItemStyle}>
              <IoMagnetSharp size={35} />
              <h4>Offers</h4>
              <IoIosLock size={20} />
            </div>
            <div style={lockedItemStyle}>
              <IoMagnetSharp size={35} />
              <h4>Notifications</h4>
              <IoIosLock size={20} />
            </div>
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          width: "200px",
          height: "60px",
          gap: "20px",
          marginLeft: "20px",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        <TbLogout size={30} />
        <button style={{ backgroundColor: "transparent", fontSize: "20px" }}>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {isAccepted ? (
        <div className="con">
          {renderSidebar()}

          <div className="upper-con">
            <h1
              style={{
                textAlign: "center",
                marginBottom: "25px",
                marginTop: "20px",
              }}
            >
              Home (Application Accepted - Features Unlocked)
            </h1>
            <div className="upper">
              <img
                style={{
                  height: "80px",
                  width: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  backgroundColor: "#151d27",
                }}
                src="https://tse4.mm.bing.net/th/id/OIP.RhaZVy8P8ZwJKWK1Pmw18QHaHa?pid=Api&P=0&h=180"
                alt="application sent"
              />
              <h1
                style={{
                  textAlign: "center",
                  marginBottom: "25px",
                  marginTop: "20px",
                  backgroundColor: "#151d27",
                }}
              >
                Welcome back!
              </h1>
              <p style={{ margin: "0px", backgroundColor: "#151d27" }}>
                Your application has been accepted.
              </p>
              <p style={{ backgroundColor: "#151d27" }}>
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
                <h3 style={{ color: "white", marginBottom: "12px" }}>
                  Project Stats
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: "14px",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#151d27",
                      borderRadius: "10px",
                      padding: "16px 24px",
                      textAlign: "center",
                      width: "100px",
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
                    <p
                      style={{
                        color: "#6a727b",
                        backgroundColor: "transparent",
                      }}
                    >
                      Open
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#151d27",
                      borderRadius: "10px",
                      padding: "16px 24px",
                      textAlign: "center",
                      width: "100px",
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
                    <p
                      style={{
                        color: "#6a727b",
                        backgroundColor: "transparent",
                      }}
                    >
                      Active
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#151d27",
                      borderRadius: "10px",
                      padding: "16px 24px",
                      textAlign: "center",
                      width: "100px",
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
                    <p
                      style={{
                        color: "#6a727b",
                        backgroundColor: "transparent",
                      }}
                    >
                      Completed
                    </p>
                  </div>
                </div>
              </div>
            )}

            <h3>Features</h3>
            <div className="middle-con">
              <div className="middle-child">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#151d27",
                    marginTop: "8px",
                  }}
                >
                  <FaPeopleGroup
                    style={{ backgroundColor: "#151d27" }}
                    size={45}
                  />
                </div>
                <h3 style={{ backgroundColor: "#151d27" }}>Editors</h3>
                <p style={{ backgroundColor: "#151d27" }}>
                  Browse and hire professional editors.
                </p>
              </div>
              <div className="middle-child">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#151d27",
                    marginTop: "8px",
                  }}
                >
                  <MdPeopleAlt
                    style={{ backgroundColor: "#151d27" }}
                    size={45}
                  />
                </div>
                {role === "creator" ? (
                  <h3 style={{ backgroundColor: "#151d27" }}>Projects</h3>
                ) : (
                  <h3 style={{ backgroundColor: "#151d27" }}>Leads</h3>
                )}
                <p style={{ backgroundColor: "#151d27" }}>
                  Manage your leads and queries.
                </p>
              </div>
              <div className="middle-child">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#151d27",
                    marginTop: "8px",
                  }}
                >
                  <AiFillMessage
                    style={{ backgroundColor: "#151d27" }}
                    size={45}
                  />
                </div>
                <h3 style={{ backgroundColor: "#151d27" }}>Messages</h3>
                <p style={{ backgroundColor: "#151d27" }}>
                  Chat with editors and clients
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="con">
          {renderSidebar()}

          <div className="upper-con">
            <h1
              style={{
                textAlign: "center",
                marginBottom: "25px",
                marginTop: "20px",
              }}
            >
              Home (Application Sent - Features Locked)
            </h1>
            <div className="upper">
              <img
                style={{ backgroundColor: "#151d27" }}
                src="https://icons.veryicon.com/png/o/miscellaneous/admin-dashboard-flat-multicolor/send-message.png"
                alt="application sent"
              />
              <h1
                style={{
                  textAlign: "center",
                  marginBottom: "25px",
                  marginTop: "20px",
                  backgroundColor: "#151d27",
                }}
              >
                Your Application has been sent!
              </h1>
              <p style={{ margin: "0px", backgroundColor: "#151d27" }}>
                Please wait while our team reviews your application.
              </p>
              <p style={{ backgroundColor: "#151d27" }}>
                You will get notified once your application is approved.
              </p>
            </div>

            <h3>Features</h3>
            <div className="middle-con">
              <div className="middle-child">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#151d27",
                    marginTop: "8px",
                  }}
                >
                  <IoIosLock style={{ backgroundColor: "#151d27" }} size={45} />
                </div>
                <h3 style={{ backgroundColor: "#151d27" }}>Editors</h3>
                <p style={{ backgroundColor: "#151d27" }}>
                  This feature is locked. Complete your application to unlock
                </p>
              </div>
              <div className="middle-child">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#151d27",
                    marginTop: "8px",
                  }}
                >
                  <IoIosLock style={{ backgroundColor: "#151d27" }} size={45} />
                </div>
                {role === "creator" ? (
                  <h3 style={{ backgroundColor: "#151d27" }}>Projects</h3>
                ) : (
                  <h3 style={{ backgroundColor: "#151d27" }}>Leads</h3>
                )}
                <p style={{ backgroundColor: "#151d27" }}>
                  This feature is locked. Complete your application to unlock
                </p>
              </div>
              <div className="middle-child">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#151d27",
                    marginTop: "8px",
                  }}
                >
                  <IoIosLock style={{ backgroundColor: "#151d27" }} size={45} />
                </div>
                <h3 style={{ backgroundColor: "#151d27" }}>Messages</h3>
                <p style={{ backgroundColor: "#151d27" }}>
                  This feature is locked. Complete your application to unlock
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
