import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { SiMicroeditor } from "react-icons/si";
// import { FaUserCircle } from "react-icons/fa";
// import { FaUserEdit } from "react-icons/fa";
// import { TbLogout } from "react-icons/tb";
// import { IoMagnetSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import "./editors.css";
import Sidebar from "./sidebar";

const editorsData = [
  {
    id: 1,
    name: "Kavya Reddy",
    rating: "4.9",
    niche: "Gaming",
    price: "₹750",
    img: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?w=400",
  },
  {
    id: 2,
    name: "Divya Nair",
    rating: "4.8",
    niche: "Commercial",
    price: "₹1200",
    img: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=400",
  },
  {
    id: 3,
    name: "Isha Verma",
    rating: "4.9",
    niche: "Podcast",
    price: "₹800",
    img: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?w=400",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    rating: "4.7",
    niche: "Shorts",
    price: "₹600",
    img: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?w=400",
  },
  {
    id: 5,
    name: "Priya Singh",
    rating: "4.8",
    niche: "Travel",
    price: "₹950",
    img: "https://images.pexels.com/photos/1051747/pexels-photo-1051747.jpeg?w=400",
  },
  {
    id: 6,
    name: "Rahul Das",
    rating: "4.6",
    niche: "Music",
    price: "₹1100",
    img: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?w=400",
  },
  {
    id: 7,
    name: "Sneha Joshi",
    rating: "5.0",
    niche: "Documentary",
    price: "₹1500",
    img: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?w=400",
  },
  {
    id: 8,
    name: "Karan Patel",
    rating: "4.7",
    niche: "Fitness",
    price: "₹700",
    img: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?w=400",
  },
  {
    id: 9,
    name: "Meera Iyer",
    rating: "4.9",
    niche: "Meme",
    price: "₹500",
    img: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?w=400",
  },
];

const categories = [
  "All",
  "Shorts",
  "Gaming",
  "Podcast",
  "Travel",
  "Meme",
  "Commercial",
  "Music",
  "Documentary",
  "Fitness",
];

const Editors = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  // const location = useLocation();
  // const navigate = useNavigate();

  // const isActive = (path) => location.pathname === path;

  // const handleLogout = () => {
  //   localStorage.clear();
  //   window.dispatchEvent(new Event("storage"));
  //   navigate("/login");
  // };

  const filtered = editorsData.filter((e) => {
    const matchFilter = activeFilter === "All" || e.niche === activeFilter;
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.niche.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="editors-con">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="editors-main">
        <span className="editors-title">Browse Editors</span>
        <p className="editors-sub">
          Filter by niche, budget, ratings and delivery speed. Hire verified
          editors for your project.
        </p>

        {/* Search */}
        <div className="editors-search-wrap">
          <CiSearch size={22} color="#8a95a3" />
          <input
            className="editors-search-input"
            placeholder="Search editors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div className="editors-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-btn ${activeFilter === cat ? "filter-btn-active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="editors-grid">
          {filtered.map((editor) => (
            <div key={editor.id} className="editor-card">
              <img
                src={editor.img}
                alt={editor.niche}
                className="editor-card-img"
              />
              <div className="editor-card-body">
                <div className="editor-card-header">
                  <CgProfile size={38} color="#8a95a3" />
                  <div>
                    <p className="editor-name">{editor.name}</p>
                    <p className="editor-meta">
                      ⭐ {editor.rating} · {editor.niche}
                    </p>
                  </div>
                </div>
                <div className="editor-card-footer">
                  <div>
                    <p className="editor-starting">Starting at</p>
                    <p className="editor-price">{editor.price}</p>
                  </div>
                  <div className="editor-card-btns">
                    <button className="btn-secondary">Profile</button>
                    <button className="btn-primary">Hire</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editors;
