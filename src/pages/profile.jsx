import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [tab, setTab] = useState("profile");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      import("axios").then(({ default: axios }) => {
        axios
          .get(`http://localhost:8080/auth/profile/${userId}`)
          .then((res) => setUserData(res.data))
          .catch((err) => console.log(err));
      });
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const activeTab = {
    padding: "9px 20px",
    backgroundColor: "#241742",
    color: "white",
    border: "1px solid #8b5cf6",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
  };

  const inactiveTab = {
    padding: "9px 20px",
    backgroundColor: "transparent",
    color: "#8b9199",
    border: "1px solid #374151",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
  };

  return (
    <div
      style={{
        minHeight: "89vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0D131D",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          minHeight: "560px",
          display: "flex",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#111827",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ width: "50%", position: "relative" }}>
          <img
            src="https://images.pexels.com/photos/3379257/pexels-photo-3379257.jpeg?w=1200"
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.72))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "48px",
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "38px",
                marginBottom: "16px",
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              Your Profile
            </h1>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "#d1d5db",
                backgroundColor: "transparent",
                margin: 0,
              }}
            >
              Manage your account, track your projects, and stay connected with
              the Rent A Editor community.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <div style={{ width: "100%", maxWidth: "420px" }}>
            <h2
              style={{
                color: "white",
                marginBottom: "6px",
                textAlign: "center",
                fontSize: "26px",
              }}
            >
              Account
            </h2>
            <p
              style={{
                color: "#8b9199",
                textAlign: "center",
                marginBottom: "24px",
                fontSize: "14px",
              }}
            >
              View and manage your details
            </p>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
              <button
                onClick={() => setTab("profile")}
                style={tab === "profile" ? activeTab : inactiveTab}
              >
                Profile
              </button>
              <button
                onClick={() => setTab("login")}
                style={tab === "login" ? activeTab : inactiveTab}
              >
                Login
              </button>
              <button
                onClick={() => setTab("signup")}
                style={tab === "signup" ? activeTab : inactiveTab}
              >
                Sign Up
              </button>
            </div>

            {/* Profile Tab */}
            {tab === "profile" && (
              <div
                style={{
                  border: "1px solid #374151",
                  padding: "24px",
                  borderRadius: "14px",
                  backgroundColor: "#1f2937",
                }}
              >
                {userId ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "5px",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=200"
                        alt="profile"
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #8b5cf6",
                          marginTop: "10px",
                          marginLeft: "10px",
                        }}
                      />
                      <div>
                        <p
                          style={{
                            color: "white",
                            fontWeight: "700",
                            fontSize: "17px",
                            margin: 0,
                          }}
                        >
                          {userData ? userData.fullName : "Loading..."}
                        </p>
                        <p
                          style={{
                            color: "#8b9199",
                            fontSize: "13px",
                            margin: 0,
                          }}
                        >
                          {userData ? userData.role : ""}
                        </p>
                      </div>
                    </div>

                    {userData ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          padding: "10px",
                          borderRadius: "8px",
                          // height,
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#111827",
                            borderRadius: "10px",
                            padding: "12px 16px",
                          }}
                        >
                          <p
                            style={{
                              color: "#8b9199",
                              fontSize: "11px",
                              textTransform: "uppercase",
                              letterSpacing: "0.6px",
                              margin: "0 0 4px 0",
                              backgroundColor: "transparent",
                            }}
                          >
                            Email
                          </p>
                          <p
                            style={{
                              color: "white",
                              fontSize: "15px",
                              margin: 0,
                              backgroundColor: "transparent",
                            }}
                          >
                            {userData.email}
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: "#111827",
                            borderRadius: "10px",
                            padding: "12px 16px",
                          }}
                        >
                          <p
                            style={{
                              color: "#8b9199",
                              fontSize: "11px",
                              textTransform: "uppercase",
                              letterSpacing: "0.6px",
                              margin: "0 0 4px 0",
                              backgroundColor: "transparent",
                            }}
                          >
                            Role
                          </p>
                          <p
                            style={{
                              color: "white",
                              fontSize: "15px",
                              margin: 0,
                              textTransform: "capitalize",
                              backgroundColor: "transparent",
                            }}
                          >
                            {userData.role}
                          </p>
                        </div>
                        <div
                          style={{
                            backgroundColor: "#111827",
                            borderRadius: "10px",
                            padding: "12px 16px",
                          }}
                        >
                          <p
                            style={{
                              color: "#8b9199",
                              fontSize: "11px",
                              textTransform: "uppercase",
                              letterSpacing: "0.6px",
                              margin: "0 0 4px 0",
                              backgroundColor: "transparent",
                            }}
                          >
                            Status
                          </p>
                          <p
                            style={{
                              color:
                                userData.status === "accepted"
                                  ? "#4ecb71"
                                  : "#f87171",
                              fontSize: "15px",
                              margin: 0,
                              textTransform: "capitalize",
                              fontWeight: "600",
                              backgroundColor: "transparent",
                            }}
                          >
                            {userData.status}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: "#8b9199" }}>Loading...</p>
                    )}

                    <button
                      onClick={handleLogout}
                      style={{
                        marginTop: "20px",
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#3e1a1a",
                        color: "#f87171",
                        border: "1px solid #7f1d1d",
                        cursor: "pointer",
                        borderRadius: "10px",
                        fontSize: "15px",
                        fontWeight: "600",
                        height: "45px",
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div>
                    <p
                      style={{
                        color: "#8b9199",
                        backgroundColor: "transparent",
                      }}
                    >
                      You are not logged in.
                    </p>
                    <Link to="/login" style={{ color: "#8b5cf6" }}>
                      Go to Login
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Login Tab */}
            {tab === "login" && (
              <div
                style={{
                  border: "1px solid #374151",
                  padding: "24px",
                  borderRadius: "14px",
                  backgroundColor: "#1f2937",
                }}
              >
                <p
                  style={{
                    color: "#8b9199",
                    marginBottom: "16px",
                    fontSize: "14px",
                    backgroundColor: "transparent",
                  }}
                >
                  Already have an account?
                </p>
                <Link
                  to="/login"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "12px",
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Go to Login →
                </Link>
              </div>
            )}

            {/* Signup Tab */}
            {tab === "signup" && (
              <div
                style={{
                  border: "1px solid #374151",
                  padding: "24px",
                  borderRadius: "14px",
                  backgroundColor: "#1f2937",
                }}
              >
                <p
                  style={{
                    color: "#8b9199",
                    marginBottom: "16px",
                    fontSize: "14px",
                    backgroundColor: "transparent",
                  }}
                >
                  New here? Create an account.
                </p>
                <Link
                  to="/signup"
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "12px",
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    color: "white",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Go to Sign Up →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
