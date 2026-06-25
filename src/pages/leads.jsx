import React, { useEffect, useState, useCallback } from "react";
import "./leads.css";
import { SlCalender } from "react-icons/sl";
import axios from "axios";

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
      };
    if (status === "accepted")
      return {
        backgroundColor: "#1a1a3e",
        color: "#7b7bff",
        border: "1px solid #6A727D",
      };
    if (status === "completed")
      return {
        backgroundColor: "#1a1a1a",
        color: "#aaa",
        border: "1px solid #6A727D",
      };
    return {
      backgroundColor: "#16161A",
      border: "1px solid #6A727D",
    };
  };

  return (
    <div>
      <div>
        <h2 style={{ color: "white", marginLeft: "70px" }}>
          Project marketplace
        </h2>
        <p style={{ marginLeft: "70px" }}>
          Browse open briefs from creators and grow your editing business.
        </p>
        <div style={{ marginLeft: "40px" }}>
          <button onClick={() => setActiveFilter("all")}>All</button>
          <button onClick={() => setActiveFilter("active")}>Active</button>
          <button onClick={() => setActiveFilter("delivered")}>
            Delivered
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            padding: "15px",
            paddingLeft: "65px",
          }}
        >
          {filteredProjects.length === 0 ? (
            <p style={{ color: "white" }}>
              {activeFilter === "all"
                ? "No leads yet. Accept a project from Offers page!"
                : `No ${activeFilter} projects`}
            </p>
          ) : (
            filteredProjects.map((project) => {
              const displayStatus =
                project.status === "completed" ? "delivered" : "active";

              return (
                <div key={project._id}>
                  <div
                    style={{
                      border: "1px solid #6A727D",
                      width: "692px",
                      padding: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        style={{
                          border: "1px solid #1F1733",
                          backgroundColor: "#241742",
                          width: "175px",
                          // height: "35px",
                        }}
                      >
                        {project.category}
                      </button>
                      <button style={getStatusStyle(project.status)}>
                        {displayStatus}
                      </button>
                    </div>

                    <h3 style={{ color: "white", textAlign: "left" }}>
                      {project.title}
                    </h3>

                    <p style={{ margin: "0px" }}>{project.description}</p>

                    <div style={{ display: "flex" }}>
                      <div style={{ display: "flex" }}>
                        <SlCalender style={{ margin: "8px 6px 10px 0px" }} />
                        <p style={{ margin: "10px 0px", marginRight: "12px" }}>
                          {new Date(project.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <p style={{ margin: "10px 0px", marginRight: "12px" }}>
                        {project.platform}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      border: "1px solid #6A727D",
                      height: "60px",
                      width: "692px",
                      padding: "15px",
                      display: "flex",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ width: "600px" }}>
                      <p style={{ margin: "0px" }}>Budget</p>
                      <h2 style={{ margin: "0px", color: "white" }}>
                        ₹{project.budget}
                      </h2>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {project.status === "accepted" && (
                        <button
                          style={{
                            margin: "0px",
                            border: "1px solid #6A727D",
                            backgroundColor: "#6a0dad",
                            color: "white",
                            cursor: "pointer",
                            padding: "6px 10px",
                            width: "155px",
                            height: "35px",
                          }}
                          onClick={() => markComplete(project._id)}
                        >
                          Mark Complete
                        </button>
                      )}

                      {project.status === "completed" && (
                        <span
                          style={{
                            margin: "0px",
                            color: "#aaa",
                            fontSize: "18px",
                          }}
                        >
                          ✅ Done
                        </span>
                      )}
                    </div>
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
