import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const CreatorNotifications = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.API_URL}/notifications/${userId}`,
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // ✅ UI se bhi hata do, DB se bhi
  const removeNotification = async (notifId) => {
    try {
      await axios.delete(`${import.meta.env.API_URL}/notifications/${notifId}`);
      setData((prev) => prev.filter((n) => n._id !== notifId));
    } catch (err) {
      console.log(err);
    }
  };

  const acceptOffer = async (projectId, offerId, notifId) => {
    try {
      await axios.post(`${import.meta.env.API_URL}/projects/acceptOffer`, {
        projectId,
        offerId,
      });
      alert("Offer Accepted! Editor has been notified.");
      await removeNotification(notifId);
    } catch (err) {
      console.log(err);
      alert("Failed to accept offer");
    }
  };

  const rejectOffer = async (projectId, offerId, notifId) => {
    try {
      await axios.post(`${import.meta.env.API_URL}/projects/rejectOffer`, {
        projectId,
        offerId,
      });
      alert("Offer Rejected. Editor has been notified.");
      await removeNotification(notifId);
    } catch (err) {
      console.log(err);
      alert("Failed to reject offer");
    }
  };

  const creatorNotifs = data.filter((n) =>
    ["offer_received", "project_completed"].includes(n.type),
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "white" }}>Notifications</h2>

      {creatorNotifs.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        creatorNotifs.map((n) => (
          <div
            key={n._id}
            style={{
              border: "1px solid #6A727D",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
            }}
          >
            <p style={{ margin: "0 0 8px 0" }}>{n.message}</p>
            <p style={{ margin: "0", fontSize: "12px", color: "#aaa" }}>
              {new Date(n.createdAt).toLocaleString()}
            </p>

            {n.type === "offer_received" && n.offerId && (
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={() => acceptOffer(n.projectId, n.offerId, n._id)}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "5px 12px",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "4px",
                    width: "165px",
                    height: "40px",
                  }}
                >
                  ✅ Accept Offer
                </button>
                <button
                  onClick={() => rejectOffer(n.projectId, n.offerId, n._id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px 12px",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "4px",
                    width: "165px",
                    height: "40px",
                  }}
                >
                  ❌ Reject Offer
                </button>
              </div>
            )}

            {n.type === "project_completed" && (
              <span style={{ color: "#aaa", fontSize: "13px" }}>
                ✅ Project completed
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CreatorNotifications;
