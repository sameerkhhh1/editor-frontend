// import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signup } from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Admin from "../src/admin/admin";
// import Navbar from "./navbar/navbar";
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

// ✅ Login ke baad hi accessible
const AuthRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return element;
};

function App() {
  // const location = useLocation();
  // const token = localStorage.getItem("token");

  // ✅ Navbar sirf login ke baad dikhao
  // const hideNavbar =
  //   !token || location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div style={{ backgroundColor: "#0D131D" }}>
      {/* {!hideNavbar && <Navbar />} */}
      <Routes>
        {/* Public */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Login zaroori */}
        <Route path="/home" element={<AuthRoute element={<Home />} />} />
        <Route path="/profile" element={<AuthRoute element={<Profile />} />} />
        <Route path="/editors" element={<AuthRoute element={<Editors />} />} />

        {/* Admin only */}
        <Route
          path="/admin"
          element={
            <PrivateRoute element={<Admin />} allowedRoles={["admin"]} />
          }
        />

        {/* Creator only */}
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

        {/* Editor only */}
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
