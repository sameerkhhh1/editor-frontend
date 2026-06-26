import React, { useEffect, useState, useCallback } from "react";
import "./leads.css";
import { SlCalender } from "react-icons/sl";
import axios from "axios";
import Sidebar from "./sidebar";

export const Leads = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const editorId = localStorage.getItem("userId");

  const fetchLeads = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/myLeads/${editorId}`,
      );
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [editorId]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const markComplete = async (projectId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/projects/completeProject`,
        {
          projectId,
        },
      );
      alert("Project marked as completed! Creator has been notified.");
      fetchLeads();
    } catch (err) {
      console.log(err);
      alert("Failed to mark complete");
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "active") return project.status === "accepted";
    if (activeFilter === "delivered") return project.status === "completed";
    return true;
  });

  const getStatusStyle = (status) => {
    if (status === "open")
      return {
        backgroundColor: "#082921",
        color: "#109a71",
        border: "1px solid #6A727D",
        height: "35px",
        width: "100px",
        borderRadius: "8px",
      };
    if (status === "accepted")
      return {
        backgroundColor: "#1a1a3e",
        color: "#7b7bff",
        border: "1px solid #6A727D",
        height: "35px",
        width: "100px",
        borderRadius: "8px",
      };
    if (status === "completed")
      return {
        backgroundColor: "#1a1a1a",
        color: "#aaa",
        border: "1px solid #6A727D",
        height: "35px",
        width: "100px",
        borderRadius: "8px",
      };
    return {
      backgroundColor: "#16161A",
      border: "1px solid #6A727D",
    };
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0D131D",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "35px 40px",
        }}
      >
        {/* Header */}

        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "32px",
              marginBottom: "8px",
            }}
          >
            Project Marketplace
          </h2>

          <p
            style={{
              color: "#8B95A7",
              fontSize: "16px",
            }}
          >
            Browse your accepted projects and manage deliveries.
          </p>
        </div>

        {/* Filters */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setActiveFilter("all")}
            style={{
              background: activeFilter === "all" ? "#241742" : "transparent",
              border: "1px solid #6A727D",

              // background: "#241742",
              color: "#C89BFF",
              // border: "none",
              width: "auto",
              padding: "8px 18px",
              borderRadius: "8px",
            }}
          >
            All
          </button>

          <button
            onClick={() => setActiveFilter("active")}
            style={{
              background: activeFilter === "active" ? "#40320A" : "transparent",
              border: "1px solid #6A727D",

              borderRadius: "8px",
              color: "#FFD54A",
              // border: "none",
              width: "auto",
              padding: "8px 18px",
            }}
          >
            Active
          </button>

          <button
            onClick={() => setActiveFilter("delivered")}
            style={{
              background:
                activeFilter === "delivered" ? " #1B4332" : "transparent",
              border: "1px solid #6A727D",

              borderRadius: "8px",
              color: "#6EE7B7",
              // border: "none",
              width: "auto",
              padding: "8px 18px",
            }}
          >
            Delivered
          </button>
        </div>

        {/* Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(430px,1fr))",
            gap: "25px",
          }}
        >
          {filteredProjects.length === 0 ? (
            <p style={{ color: "#B8C0CC", fontSize: "18px" }}>
              {activeFilter === "all"
                ? "No leads yet. Accept a project from Offers page!"
                : `No ${activeFilter} projects`}
            </p>
          ) : (
            filteredProjects.map((project) => {
              const displayStatus =
                project.status === "completed" ? "Delivered" : "Active";

              return (
                <div
                  key={project._id}
                  style={{
                    background: "#151D27",
                    border: "1px solid #2B3645",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                >
                  {/* Upper */}

                  <div
                    style={{
                      padding: "22px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        style={{
                          background: "#241742",
                          color: "#C89BFF",
                          border: "none",
                          width: "auto",
                          padding: "8px 18px",
                        }}
                      >
                        {project.category}
                      </button>

                      <button style={getStatusStyle(project.status)}>
                        {displayStatus}
                      </button>
                    </div>

                    <h3
                      style={{
                        color: "#FFFFFF",
                        marginBottom: "12px",
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        color: "#B7C0CC",
                        lineHeight: "26px",
                        marginBottom: "20px",
                      }}
                    >
                      {project.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "25px",
                        flexWrap: "wrap",
                        color: "#9BA6B2",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <SlCalender />

                        <span>
                          {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>

                      <span>{project.platform}</span>
                    </div>
                  </div>

                  {/* Footer */}

                  <div
                    style={{
                      borderTop: "1px solid #2B3645",
                      padding: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          color: "#8E98A8",
                          marginBottom: "5px",
                        }}
                      >
                        Budget
                      </p>

                      <h2
                        style={{
                          color: "#46D369",
                          margin: 0,
                        }}
                      >
                        ₹{project.budget}
                      </h2>
                    </div>

                    {project.status === "accepted" && (
                      <button
                        onClick={() => markComplete(project._id)}
                        style={{
                          background: "#6A0DAD",
                          color: "#fff",
                          border: "none",
                          width: "170px",
                          height: "42px",
                        }}
                      >
                        Mark Complete
                      </button>
                    )}

                    {project.status === "completed" && (
                      <span
                        style={{
                          color: "#33C36B",
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        ✅ Delivered
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
