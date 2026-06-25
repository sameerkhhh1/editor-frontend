import React from "react";
import { SiMicroeditor } from "react-icons/si";
// import { IoIosLock } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { IoMagnetSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import "./editors.css";
import { CgProfile } from "react-icons/cg";

const Editors = () => {
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
            <FaUserCircle size={35} />
            <h4>Profile</h4>
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
            <FaUserEdit size={35} />
            <h4>Editors</h4>
            {/* <IoIosLock size={30} /> */}
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
            <IoMagnetSharp size={35} />
            <h4>Leads</h4>
            {/* <IoIosLock size={30} /> */}
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
      <div className="upper-con">
        <h1>Browse Editors</h1>
        <p>
          Filter by niche,budget,ratings and delivery speed. Hire verified
          editors for your project
        </p>
        <div
          style={{
            display: "flex",
            border: "1px solid #3b3447",
            alignItems: "center",
            marginBottom: "15px",
            borderRadius: "10px",
            width: "1200px",
          }}
        >
          <CiSearch size={25} style={{ marginLeft: "15px" }} />
          <input
            placeholder="Search editors.."
            style={{
              width: "1090px",
              border: "none",
              fontSize: "18px",
              outline: "none",
            }}
          ></input>
        </div>
        <div
          style={{
            //  border: "1px solid gold",
            width: "1250px",
          }}
        >
          <button>All</button>
          <button>Shorts</button>
          <button>Gaming</button>
          <button>Podcast</button>
          <button>Travel</button>
          <button>Meme</button>
          <button>Commercial</button>
          <button>Music</button>
          <button style={{ width: "120px" }}>Documentary</button>
          <button>Fitness</button>
        </div>

        <div
          style={{
            // border: "1px solid red",
            height: "500px",
            width: "1210px",
            display: "grid",
            padding: "25px",
            margin: "25px",

            gridTemplateColumns: "repeat(3,1fr)",
          }}
        >
          <div
            style={{
              //  border: "1px solid blue",
              height: "440px",
            }}
          >
            <div
              style={{
                height: "390px",
                width: "390px",
                marginRight: "20px",
                borderRadius: "20px",

                border: "1px solid #5A616A",

                // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  // border: "1px solid green",
                  alignItems: "center",
                  height: "100px",
                  width: "350px",
                  marginLeft: "15px",
                }}
              >
                <CgProfile size={45} />
                <div
                  style={{
                    display: "flex",
                    // border: "1px solid yellow",
                    flexDirection: "column",
                    marginLeft: "20px",
                  }}
                >
                  <h3 style={{ margin: "0px" }}>Kavya Reddy</h3>
                  <p style={{ margin: "0px" }}>⭐ 4.9 . Gaming </p>
                </div>
              </div>

              <img
                src="https://tse1.mm.bing.net/th/id/OIP.jarFwnq8wAOMNzXVyI5YQwHaD4?pid=Api&P=0&h=180"
                style={{
                  objectFit: "cover",
                  height: "200px",
                  width: "358px",
                  paddingLeft: "15px",
                }}
                alt="gaming"
              ></img>
              <p style={{ margin: "0px", paddingLeft: "15px" }}>Starting at</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // paddingLeft: "15px",
                }}
              >
                <h4
                  style={{
                    margin: "0px",
                    marginTop: "6px",
                    paddingLeft: "15px",
                  }}
                >
                  ₹750
                </h4>
                <button
                  style={{
                    border: "1px solid #392559",
                    backgroundColor: "#392559",
                    color: "white",
                    width: "80px",
                    marginRight: "15px",
                  }}
                >
                  Hire
                </button>
              </div>
            </div>

            <button
              style={{
                border: "1px solid #392559",
                backgroundColor: "#392559",
                color: "white",
                width: "180px",
                marginRight: "15px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              View Profile
            </button>
            <button
              style={{
                border: "1px solid #392559",
                backgroundColor: "#392559",
                color: "white",
                width: "180px",
                marginRight: "15px",
              }}
            >
              Hire
            </button>
          </div>
          <div
            style={{
              //  border: "1px solid blue",
              height: "440px",
            }}
          >
            <div
              style={{
                height: "390px",
                width: "390px",
                marginRight: "20px",
                borderRadius: "20px",

                border: "1px solid #5A616A",
                // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  // border: "1px solid green",
                  alignItems: "center",
                  height: "100px",
                  width: "350px",
                  marginLeft: "15px",
                }}
              >
                <CgProfile size={45} />
                <div
                  style={{
                    display: "flex",
                    // border: "1px solid yellow",
                    flexDirection: "column",
                    marginLeft: "20px",
                  }}
                >
                  <h3 style={{ margin: "0px" }}>Divya Nair</h3>
                  <p style={{ margin: "0px" }}>⭐ 4.9 . Commercial </p>
                </div>
              </div>

              <img
                src="https://tse2.mm.bing.net/th/id/OIP.g4xllmwNnQoj4JNbBBuYbgHaEK?pid=Api&P=0&h=180"
                style={{
                  height: "200px",
                  width: "358px",
                  paddingLeft: "15px",
                  objectFit: "cover",
                }}
                alt="commercial"
              ></img>
              <p style={{ margin: "0px", paddingLeft: "15px" }}>Starting at</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // paddingLeft: "15px",
                }}
              >
                <h4
                  style={{
                    margin: "0px",
                    marginTop: "6px",
                    paddingLeft: "15px",
                  }}
                >
                  ₹1200
                </h4>
                <button
                  style={{
                    border: "1px solid #392559",
                    backgroundColor: "#392559",
                    color: "white",
                    width: "80px",
                    marginRight: "15px",
                  }}
                >
                  Hire
                </button>
              </div>
            </div>

            <button
              style={{
                border: "1px solid #392559",
                backgroundColor: "#392559",
                color: "white",
                width: "180px",
                marginRight: "15px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              View Profile
            </button>
            <button
              style={{
                border: "1px solid #392559",
                backgroundColor: "#392559",
                color: "white",
                width: "180px",
                marginRight: "15px",
              }}
            >
              Hire
            </button>
          </div>
          <div
            style={{
              //  border: "1px solid blue",
              height: "440px",
            }}
          >
            <div
              style={{
                height: "390px",
                width: "390px",
                marginRight: "20px",
                borderRadius: "20px",

                border: "1px solid #5A616A",
                // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  // border: "1px solid green",
                  alignItems: "center",
                  height: "100px",
                  width: "350px",
                  marginLeft: "15px",
                }}
              >
                <CgProfile size={45} />
                <div
                  style={{
                    display: "flex",
                    // border: "1px solid yellow",
                    flexDirection: "column",
                    marginLeft: "20px",
                  }}
                >
                  <h3 style={{ margin: "0px" }}>Isha Verma</h3>
                  <p style={{ margin: "0px" }}>⭐ 4.9 . Podcast </p>
                </div>
              </div>

              <img
                src="https://tse4.mm.bing.net/th/id/OIP.5lYd8ugJ33dXlXhYIdsznQHaEK?pid=Api&P=0&h=180"
                style={{
                  height: "200px",
                  width: "358px",
                  paddingLeft: "15px",
                  objectFit: "cover",
                }}
                alt="podcast"
              ></img>
              <p style={{ margin: "0px", paddingLeft: "15px" }}>Starting at</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // paddingLeft: "15px",
                }}
              >
                <h4
                  style={{
                    margin: "0px",
                    marginTop: "6px",
                    paddingLeft: "15px",
                  }}
                >
                  ₹800
                </h4>
                <button
                  style={{
                    border: "1px solid #392559",
                    backgroundColor: "#392559",
                    color: "white",
                    width: "80px",
                    marginRight: "15px",
                  }}
                >
                  Hire
                </button>
              </div>
            </div>

            <button
              style={{
                border: "1px solid #392559",
                backgroundColor: "#392559",
                color: "white",
                width: "180px",
                marginRight: "15px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              View Profile
            </button>
            <button
              style={{
                border: "1px solid #392559",
                backgroundColor: "#392559",
                color: "white",
                width: "180px",
                marginRight: "15px",
              }}
            >
              Hire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editors;
