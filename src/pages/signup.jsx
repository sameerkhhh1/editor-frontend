import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPasswrod] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const signupSchema = yup.object({
    fullName: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
    role: yup.string().required("Please select a role"),
  });

  const handleSubmit = async () => {
    setErrors({});
    try {
      setLoading(true);
      await signupSchema.validate(
        { fullName, email, password, confirmPassword, role },
        { abortEarly: false },
      );
      const responce = await axios.post("http://localhost:8080/auth/signup", {
        email,
        password,
        confirmPassword,
        fullName,
        role,
      });
      if (responce.status === 200) {
        alert("SignUp Successfull");
        localStorage.setItem("token", responce.data.jwtToken);
        localStorage.setItem("userId", responce.data.userId);
        localStorage.setItem("role", responce.data.role);
        localStorage.setItem("status", "pending");
        window.dispatchEvent(new Event("storage"));
        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const fieldErrors = {};
        error.inner.forEach((err) => {
          fieldErrors[err.path] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        alert("SignUp Failed");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "18px 18px",
    borderRadius: "12px",
    border: "1px solid #374151",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    // marginBottom: "8px",
  };

  const errorStyle = {
    margin: "0px",
    padding: "0px",
    color: "#f87171",
    fontSize: "12px",
    marginTop: "4px",
    marginLeft: "4px",
  };

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0D131D",
        }}
      >
        <h2 style={{ color: "white" }}>Loading...</h2>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0D131D",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          minHeight: "620px",
          display: "flex",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#111827",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* LEFT SIDE */}
        <div style={{ width: "50%", position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200"
            alt="Signup"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.72))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "48px",
              color: "white",
            }}
          >
            <h1
              style={{
                fontSize: "38px",
                marginBottom: "16px",
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              Join Rent A Editor
            </h1>
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "#d1d5db",
                backgroundColor: "transparent",
                margin: 0,
              }}
            >
              Connect with top video editors or find your next creative project.
              Build your portfolio, grow your business, and collaborate
              seamlessly.
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
          <div style={{ width: "100%", maxWidth: "420px" }}>
            <h2
              style={{
                color: "white",
                marginBottom: "6px",
                textAlign: "center",
                fontSize: "26px",
              }}
            >
              Create Account
            </h2>
            <p
              style={{
                color: "#8b9199",
                textAlign: "center",
                marginBottom: "28px",
                fontSize: "18px",
              }}
            >
              Sign up to get started
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div>
                <input
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: errors.fullName
                      ? "1px solid #f87171"
                      : "1px solid #374151",
                  }}
                />
                {errors.fullName && <p style={errorStyle}>{errors.fullName}</p>}
              </div>

              <div>
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: errors.email
                      ? "1px solid #f87171"
                      : "1px solid #374151",
                  }}
                />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: errors.password
                      ? "1px solid #f87171"
                      : "1px solid #374151",
                  }}
                />
                {errors.password && <p style={errorStyle}>{errors.password}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPasswrod(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: errors.confirmPassword
                      ? "1px solid #f87171"
                      : "1px solid #374151",
                  }}
                />
                {errors.confirmPassword && (
                  <p style={errorStyle}>{errors.confirmPassword}</p>
                )}
              </div>

              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    ...inputStyle,
                    color: role === "" ? "#8b9199" : "#ffffff",
                    border: errors.role
                      ? "1px solid #f87171"
                      : "1px solid #374151",
                  }}
                >
                  <option value="">Select Role</option>
                  <option value="creator">Creator</option>
                  <option value="editor">Editor</option>
                </select>
                {errors.role && <p style={errorStyle}>{errors.role}</p>}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "20px",
                height: "50px",
              }}
            >
              Create Account
            </button>

            <p
              style={{
                color: "#8b9199",
                textAlign: "center",
                marginTop: "18px",
                fontSize: "18px",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#8b5cf6",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
