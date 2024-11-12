// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { Button, Typography, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/auth";

const { Title } = Typography;

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await getProfile(token);
        setUser(response.data);
      } catch (error) {
        message.error("Failed to load profile.");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out successfully.");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: "400px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Title level={3}>
          Hello {user.first_name} {user.last_name}
        </Title>
        <p>Below are your profile details:</p>
        <p>
          <strong>First Name:</strong> {user.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {user.last_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <Button
          type="primary"
          style={{ marginTop: "10px" }}
          block
          onClick={() => navigate("/update-profile-info")}
        >
          Update Profile Info
        </Button>
        <Button
          type="default"
          style={{ marginTop: "10px" }}
          block
          onClick={() => navigate("/update-password")}
        >
          Update Password
        </Button>
        <Button
          type="primary"
          danger
          style={{ marginTop: "10px" }}
          block
          onClick={() => navigate("/delete-account")}
        >
          Delete Account
        </Button>
        <Button
          type="primary"
          danger
          style={{ marginTop: "10px" }}
          block
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
