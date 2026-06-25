import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signup } from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Admin from "../src/admin/admin";
import Navbar from "./navbar/navbar";
import Editors from "./pages/editors";
import { Leads } from "./pages/leads";
import Projects from "./pages/projects";
import Offers from "./editor/offers";
import EditorNotifications from "./editor/editorNotification";
import CreatorNotifications from "./creator/creatorNotificaiton";
import Profile from "./pages/profile";

const PrivateRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const status = localStorage.getItem("status");

  if (!token) return <Navigate to="/login" replace />;
  if (role === "admin") return element;
  if (status !== "accepted") return <Navigate to="/home" replace />;
  if (allowedRoles && !allowedRoles.includes(role))
    return <Navigate to="/home" replace />;

  return element;
};

function App() {
  return (
    <div style={{ backgroundColor: "#0D131D" }}>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Always accessible */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />

        {/* ✅ Editors — login ki zaroorat nahi, seedha accessible */}
        <Route path="/editors" element={<Editors />} />

        {/* Admin only */}
        <Route
          path="/admin"
          element={
            <PrivateRoute element={<Admin />} allowedRoles={["admin"]} />
          }
        />

        {/* Creator only — must be accepted */}
        <Route
          path="/projects"
          element={
            <PrivateRoute element={<Projects />} allowedRoles={["creator"]} />
          }
        />
        <Route
          path="/creatorNotification"
          element={
            <PrivateRoute
              element={<CreatorNotifications />}
              allowedRoles={["creator"]}
            />
          }
        />

        {/* Editor only — must be accepted */}
        <Route
          path="/leads"
          element={
            <PrivateRoute element={<Leads />} allowedRoles={["editor"]} />
          }
        />
        <Route
          path="/offers"
          element={
            <PrivateRoute element={<Offers />} allowedRoles={["editor"]} />
          }
        />
        <Route
          path="/editorNotification"
          element={
            <PrivateRoute
              element={<EditorNotifications />}
              allowedRoles={["editor"]}
            />
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
