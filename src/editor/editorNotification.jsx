import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../pages/sidebar";

const EditorNotifications = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/notifications/${userId}`,
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const editorNotifs = data.filter((n) =>
    ["offer_accepted", "offer_rejected", "project_completed"].includes(n.type),
  );

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
          padding: "30px",
        }}
      >
        <h2 style={{ color: " white" }}>Notifications</h2>

        {editorNotifs.length === 0 ? (
          <p>No notifications yet</p>
        ) : (
          editorNotifs.map((n) => (
            <div
              key={n._id}
              style={{
                border: "1px solid #6A727D",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            >
              <p style={{ margin: "0 0 8px 0", color: "#aaa" }}>{n.message}</p>
              <p style={{ margin: "0", fontSize: "12px", color: "#aaa" }}>
                {new Date(n.createdAt).toLocaleString()}
              </p>

              {n.type === "offer_accepted" && (
                <Link
                  to="/leads"
                  style={{
                    display: "inline-block",
                    marginTop: "8px",
                    padding: "5px 12px",
                    backgroundColor: "#1a1a3e",
                    color: "white",
                    border: "1px solid #6A727D",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontSize: "13px",
                  }}
                >
                  View in Leads →
                </Link>
              )}

              {n.type === "offer_rejected" && (
                <Link
                  to="/offers"
                  style={{
                    display: "inline-block",
                    marginTop: "8px",
                    padding: "5px 12px",
                    backgroundColor: "#3e1a1a",
                    color: "white",
                    border: "1px solid #6A727D",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontSize: "13px",
                  }}
                >
                  Browse More Projects →
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EditorNotifications;
