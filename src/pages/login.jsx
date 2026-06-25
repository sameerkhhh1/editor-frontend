import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const loginSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  const handlelogin = async () => {
    setErrors({});
    try {
      setLoading(true);
      await loginSchema.validate({ email, password }, { abortEarly: false });
      const responce = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      if (responce.status === 200) {
        alert("Login Successfull");
        localStorage.setItem("token", responce.data.jwtToken);
        localStorage.setItem("userId", responce.data.userId);
        localStorage.setItem("role", responce.data.role);
        localStorage.setItem("status", responce.data.status);
        window.dispatchEvent(new Event("storage"));
        if (responce.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
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
        alert("Login Failed");
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
  };

  const errorStyle = {
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
          minHeight: "560px",
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
            src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?w=1200"
            alt="Login"
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
              Welcome Back
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
              Sign in to manage your projects, connect with editors, and keep
              your creative work moving forward.
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
              Log In
            </h2>
            <p
              style={{
                color: "#8b9199",
                textAlign: "center",
                marginBottom: "28px",
                fontSize: "18px",
              }}
            >
              Welcome back! Please sign in
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
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
            </div>

            <button
              onClick={handlelogin}
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
              Log In
            </button>

            <p
              style={{
                color: "#8b9199",
                textAlign: "center",
                marginTop: "18px",
                fontSize: "18px",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#8b5cf6",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
