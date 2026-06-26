import React, { useEffect, useState } from "react";
import axios from "axios";

// import { Link, useNavigate, useLocation } from "react-router-dom";

// import Sidebar from "../../Components/Sidebar/Sidebar";

import "./admin.css";
import AdminSidebar from "./AdminSidebar";

const Admin = () => {
  const [usersData, setUsersData] = useState([]);
  const [filters, setFilters] = useState("pending");

  // const navigate = useNavigate();
  // const location = useLocation();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users`,
      );

      setUsersData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/auth/accept/${id}`);

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/auth/reject/${id}`);

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-page">
      {/* Sidebar */}

      {/* <Sidebar /> */}
      <AdminSidebar />

      {/* Main */}

      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>

            <p>
              Manage creator/editor applications and monitor platform users.
            </p>
          </div>
        </div>

        {/* Filters */}

        <div className="filter-wrapper">
          <button
            onClick={() => setFilters("pending")}
            className={
              filters === "pending" ? "filter-btn active-filter" : "filter-btn"
            }
          >
            Pending
          </button>

          <button
            onClick={() => setFilters("accepted")}
            className={
              filters === "accepted" ? "filter-btn active-filter" : "filter-btn"
            }
          >
            Accepted
          </button>

          <button
            onClick={() => setFilters("rejected")}
            className={
              filters === "rejected" ? "filter-btn active-filter" : "filter-btn"
            }
          >
            Rejected
          </button>
        </div>

        {/* Stats */}

        <div className="stats">
          <div className="stat-card">
            <h2>
              {usersData.filter((user) => user.status === "pending").length}
            </h2>

            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h2>
              {usersData.filter((user) => user.status === "accepted").length}
            </h2>

            <p>Accepted</p>
          </div>

          <div className="stat-card">
            <h2>
              {usersData.filter((user) => user.status === "rejected").length}
            </h2>

            <p>Rejected</p>
          </div>

          <div className="stat-card">
            <h2>{usersData.length}</h2>

            <p>Total Users</p>
          </div>
        </div>

        {/* Table */}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>

                <th>Email</th>

                <th>Role</th>

                <th>Status</th>

                <th>Accept</th>

                <th>Reject</th>
              </tr>
            </thead>

            <tbody>
              {usersData
                .filter((user) => user.status === filters)
                .map((user) => (
                  <tr key={user._id}>
                    <td>{user.fullName}</td>

                    <td>{user.email}</td>

                    <td
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {user.role}
                    </td>

                    <td>
                      <span className={`status ${user.status}`}>
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="accept-btn"
                        onClick={() => handleAccept(user._id)}
                      >
                        Accept
                      </button>
                    </td>

                    <td>
                      <button
                        className="reject-btn"
                        onClick={() => handleReject(user._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {usersData.filter((user) => user.status === filters).length === 0 && (
            <div className="empty-box">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
