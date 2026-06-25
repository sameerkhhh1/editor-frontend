import React, { useEffect, useState } from "react";
import { SiMicroeditor } from "react-icons/si";
import { IoIosLock } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { IoMagnetSharp } from "react-icons/io5";
import "./admin.css";
import axios from "axios";

const Admin = () => {
  const [usersData, setUsersData] = useState([]);
  const [filters, setFilters] = useState("pending");

  const fetchUsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users`);
    setUsersData(res.data);
  };

  const handleAccept = async (id) => {
    await axios.patch(`${process.env.REACT_APP_API_URL}/auth/accept/${id}`);
    fetchUsers();
  };
  const handleReject = async (id) => {
    await axios.patch(`${process.env.REACT_APP_API_URL}/auth/reject/${id}`);
    fetchUsers();
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="con">
      <div
        className="left-con"
        style={{ backgroundColor: "#0d131d", borderRight: "1px solid #656d77" }}
      >
        <div className="left-child">
          <div
            style={{
              display: "flex",
              // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              paddingLeft: "20px",
              gap: "15px",
              // padding: "5px",
              fontSize: "22px",
              alignItems: "center",
            }}
          >
            <SiMicroeditor size={25} color="white" />
            <h4>Rent A Editor</h4>
          </div>

          <div
            style={{
              display: "flex",
              // boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
              paddingLeft: "20px",
              gap: "15px",
              // padding: "5px",
              fontSize: "22px",
              alignItems: "center",
            }}
          >
            <Link to="/profile">
              <FaUserCircle size={35} />
              <h4>Profile</h4>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              // boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
              gap: "15px",
              // padding: "5px",
              paddingLeft: "20px",
              fontSize: "22px",
              alignItems: "center",
            }}
          >
            <Link to="/editors">
              <FaUserEdit size={35} />
              <h4>Editors</h4>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              // border: "1px solid #6a727b",
              // boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
              paddingLeft: "20px",
              gap: "15px",
              // padding: "5px",
              fontSize: "22px",
              alignItems: "center",
            }}
          >
            <Link to="/leads">
              <IoMagnetSharp size={35} />
              <h4>Leads</h4>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              // border: "1px solid #6a727b",
              // boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
              paddingLeft: "20px",
              gap: "15px",
              // padding: "5px",
              fontSize: "22px",
              alignItems: "center",
            }}
          >
            <Link to="/projects" style={linkStyle}>
              <IoMagnetSharp size={35} />
              <h4>Projects</h4>
            </Link>
          </div>
        </div>
        <div
          style={{
            // border: "1px solid black",
            display: "flex",
            width: "200px",

            height: "60px",
            gap: "20px",
            marginLeft: "20px",
            // justifyContent: "space-around",

            // boxShadow: "   rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <TbLogout size={30} />
          <button style={{ backgroundColor: "transparent", fontSize: "20px" }}>
            Logout
          </button>
        </div>
      </div>
      <div style={{ backgroundColor: "#0D131D" }}>
        <h1 style={{ margin: "20px 0px 15px 70px", textAlign: "left" }}>
          Editors Application
        </h1>
        <div className="button-div">
          <button className="buttons" onClick={() => setFilters("pending")}>
            Pending
          </button>

          <button onClick={() => setFilters("accepted")} className="buttons">
            Accepted
          </button>
          <button onClick={() => setFilters("rejected")} className="buttons">
            Rejected
          </button>
        </div>

        <table className="table" border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>

          <tbody>
            {usersData
              .filter((user) => user.status === filters)
              .map((el) => (
                <tr key={el._id}>
                  <td>{el.fullName}</td>
                  <td>{el.email}</td>
                  <td onClick={() => handleAccept(el._id)}>✔️</td>
                  <td onClick={() => handleReject(el._id)}>❌</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
