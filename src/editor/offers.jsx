import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

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
      const res = await axios.get("http://localhost:8080/projects/offers");
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
      await axios.post("http://localhost:8080/projects/reOffers", {
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
      await axios.post("http://localhost:8080/projects/reOffers", {
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
    <div style={{ padding: "20px" }}>
      <h1>Available Projects</h1>

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
          <h2 style={{ color: "#6a727b" }}>
            <strong>Title:</strong> {project.title}
          </h2>
          <p>
            <strong>Description:</strong> {project.description}
          </p>
          <p>
            <strong>Category:</strong> {project.category}
          </p>
          <p>
            <strong>Platform:</strong> {project.platform}
          </p>
          <p>
            <strong>Budget:</strong> ₹{project.budget}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(project.deadline).toDateString()}
          </p>

          <hr />

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
              }}
            >
              ✅ Accept at ₹{project.budget}
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
              }}
            >
              💬 {openForm[project._id] ? "Cancel" : "Send ReOffer"}
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
  );
};

export default Offers;
