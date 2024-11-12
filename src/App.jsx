// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import UpdatePassword from "./pages/UpdatePassword";
import UpdateProfileInfo from "./pages/UpdateProfileInfo";
import DeleteAccount from "./pages/DeleteAccount";

const App = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-password"
          element={
            isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/update-profile-info"
          element={
            isAuthenticated ? <UpdateProfileInfo /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/delete-account"
          element={
            isAuthenticated ? <DeleteAccount /> : <Navigate to="/login" />
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
