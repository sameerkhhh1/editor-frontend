import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Sidebar from "../pages/sidebar";
// import { MdOutlineDone } from "react-icons/md";

const Offers = () => {
  const [projects, setProjects] = useState([]);

  // Har project ke liye alag price aur message
  const [price, setPrice] = useState({});
  const [message, setMessage] = useState({});

  // Kis project ka reoffer form open hai
  const [openForm, setOpenForm] = useState({});

  const myId = localStorage.getItem("userId");

  // ✅ Saare projects fetch karo
  const fetchProjects = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects/offers`,
      );
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ✅ Listed budget pe seedha accept
  const acceptProject = async (projectId, budget) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/projects/reOffers`, {
        projectId,
        editorId: myId,
        offerPrice: budget,
        message: "I accept this project at the listed budget.",
      });
      alert("Offer sent! Waiting for creator approval.");
      fetchProjects();
    } catch (err) {
      alert("Failed to send offer");
    }
  };

  // ✅ Custom price pe reoffer
  const sendReOffer = async (projectId) => {
    const myPrice = price[projectId];
    const myMessage = message[projectId];

    if (!myPrice || !myMessage) {
      alert("Please enter price and message");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/projects/reOffers`, {
        projectId,
        editorId: myId,
        offerPrice: myPrice,
        message: myMessage,
      });
      alert("ReOffer sent!");

      // Form reset karo
      setPrice((prev) => ({ ...prev, [projectId]: "" }));
      setMessage((prev) => ({ ...prev, [projectId]: "" }));
      setOpenForm((prev) => ({ ...prev, [projectId]: false }));

      fetchProjects();
    } catch (err) {
      alert("Failed to send offer");
    }
  };

  // ✅ Sirf woh projects jo open hain aur maine abhi offer nahi bheja
  const availableProjects = projects.filter((project) => {
    // Closed projects skip karo
    if (project.status !== "open") return false;

    // Check karo maine is project mein offer bheja hai ya nahi
    const iAlreadySent = project.reOffers.find(
      (offer) => offer.editorId === myId || offer.editorId?.toString() === myId,
    );

    // Agar bheja hai to skip karo
    if (iAlreadySent) return false;

    return true;
  });

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
          padding: "25px",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: "34px",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          Available Projects
        </h1>

        {availableProjects.length === 0 && (
          <p>No open projects available right now. Check back later!</p>
        )}

        {availableProjects.map((project) => (
          <div
            key={project._id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
              // height: "auto",
            }}
          >
            <h2
              style={{
                color: "#FFFFFF",
                fontSize: "24px",
                marginBottom: "14px",
              }}
            >
              <strong
                style={{
                  color: "#B8C0CC",
                  fontWeight: "600",
                  marginRight: "6px",
                }}
              >
                Title:
              </strong>
              {project.title}
            </h2>

            <p
              style={{
                color: "#9CA3AF",
                fontSize: "16px",
                lineHeight: "28px",
                marginBottom: "10px",
              }}
            >
              <strong style={{ color: "#D1D5DB" }}>Description:</strong>{" "}
              {project.description}
            </p>

            <p
              style={{
                color: "#9CA3AF",
                fontSize: "16px",
                marginBottom: "8px",
              }}
            >
              <strong style={{ color: "#D1D5DB" }}>Category:</strong>{" "}
              {project.category}
            </p>

            <p
              style={{
                color: "#9CA3AF",
                fontSize: "16px",
                marginBottom: "8px",
              }}
            >
              <strong style={{ color: "#D1D5DB" }}>Platform:</strong>{" "}
              {project.platform}
            </p>

            <p
              style={{
                color: "#9CA3AF",
                fontSize: "16px",
                marginBottom: "8px",
              }}
            >
              <strong style={{ color: "#22C55E" }}>Budget:</strong> ₹
              {project.budget}
            </p>

            <p
              style={{
                color: "#9CA3AF",
                fontSize: "16px",
                marginBottom: "15px",
              }}
            >
              <strong style={{ color: "#FACC15" }}>Deadline:</strong>{" "}
              {new Date(project.deadline).toDateString()}
            </p>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #2A3441",
                marginTop: "18px",
                marginBottom: "18px",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {/* Button 1 — listed price pe accept */}
              <button
                onClick={() => acceptProject(project._id, project.budget)}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "8px 16px",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: "4px",
                  marginRight: "10px",
                  width: "195px",
                  height: "40px",
                  marginTop: "10px",
                }}
              >
                Accept at ₹{project.budget}
              </button>

              {/* Button 2 — reoffer form toggle */}
              <button
                onClick={() =>
                  setOpenForm((prev) => ({
                    ...prev,
                    [project._id]: !prev[project._id],
                  }))
                }
                style={{
                  backgroundColor: "#1a1a3e",
                  color: "white",
                  padding: "8px 16px",
                  cursor: "pointer",
                  border: "1px solid #6A727D",
                  borderRadius: "4px",
                  // position: "fixed",
                  width: "175px",
                  height: "40px",
                  marginTop: "10px",
                }}
              >
                {openForm[project._id] ? "Cancel" : "Send ReOffer"}
              </button>
            </div>

            {/* ReOffer form */}
            {openForm[project._id] && (
              <div
                style={{
                  border: "1px solid #6A727D",
                  padding: "12px",
                  borderRadius: "6px",
                  marginTop: "12px",
                }}
              >
                <input
                  type="number"
                  placeholder="Your Offer Price (₹)"
                  value={price[project._id] || ""}
                  onChange={(e) =>
                    setPrice((prev) => ({
                      ...prev,
                      [project._id]: e.target.value,
                    }))
                  }
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    padding: "6px",
                    width: "250px",
                  }}
                />
                <textarea
                  placeholder="Message to creator"
                  value={message[project._id] || ""}
                  onChange={(e) =>
                    setMessage((prev) => ({
                      ...prev,
                      [project._id]: e.target.value,
                    }))
                  }
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    padding: "6px",
                    width: "250px",
                    color: "white",
                    backgroundColor: "#1a1a2e",
                    border: "1px solid gray",
                  }}
                />
                <button
                  onClick={() => sendReOffer(project._id)}
                  style={{
                    backgroundColor: "#7b7bff",
                    color: "white",
                    padding: "6px 14px",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "4px",
                    width: "150px",
                  }}
                >
                  Send ReOffer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
