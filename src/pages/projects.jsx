import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./sidebar";

const Projects = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const userId = localStorage.getItem("userId");
  const categories = [
    "Reels",
    "Shorts",
    "Long Form Video",
    "Documentary",
    "Podcast",
    "Vlog",
    "Gaming",
    "Wedding",
    "Corporate",
    "Advertisement",
    "Music Video",
    "Educational",
  ];

  const platforms = [
    "YouTube",
    "Instagram",
    "TikTok",
    "Facebook",
    "LinkedIn",
    "X (Twitter)",
    "Snapchat",
    "Website",
    "Telegram",
    "Other",
  ];

  const inputStyle = {
    width: "100%",
    padding: "18px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "1px solid #374151",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    outline: "none",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !category ||
      !platform ||
      !budget ||
      !deadline
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/projects/create`, {
        creatorId: userId,
        title,
        description,
        category,
        platform,
        budget,
        deadline,
      });

      alert("Project Created! Editors can now see it on their offers page.");

      setTitle("");
      setDescription("");
      setCategory("");
      setPlatform("");
      setBudget("");
      setDeadline("");
    } catch (err) {
      alert("Failed to create project");
      console.log(err);
    }
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            minHeight: "650px",
            display: "flex",
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "#111827",
            boxShadow: "0px 10px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* LEFT SIDE */}
          <div
            style={{
              width: "50%",
              position: "relative",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
              alt="Create Project"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "40px",
                color: "white",
              }}
            >
              <h1
                style={{
                  fontSize: "42px",
                  marginBottom: "15px",
                  backgroundColor: "transparent",
                }}
              >
                Find The Perfect Editor
              </h1>

              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.7",
                  color: "#d1d5db",
                  backgroundColor: "transparent",
                }}
              >
                Share your project details, set your budget, and receive offers
                from experienced video editors ready to bring your content to
                life.
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
            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                maxWidth: "450px",
              }}
            >
              <h2
                style={{
                  color: "white",
                  marginBottom: "25px",
                  textAlign: "center",
                }}
              >
                Create Project
              </h2>

              <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
              />

              <textarea
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  ...inputStyle,
                  minHeight: "100px",
                  resize: "none",
                }}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  ...inputStyle,
                  padding: "0px",
                  paddingLeft: "15px",
                  height: "45px",
                }}
              >
                <option value="">Select Category</option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                style={{
                  ...inputStyle,
                  padding: "0px",
                  paddingLeft: "15px",
                  height: "45px",
                }}
              >
                <option value="">Select Platform</option>

                {platforms.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Budget (₹)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={inputStyle}
              />

              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style={inputStyle}
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "none",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "10px",
                  height: "45px",
                }}
              >
                Create Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
