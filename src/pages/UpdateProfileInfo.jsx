import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { updateProfileInfo } from "../services/auth";

const { Title } = Typography;

const UpdateProfileInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await updateProfileInfo(
        { first_name: firstName, last_name: lastName },
        token
      );
      message.success("Profile updated successfully.");
      navigate("/profile");
    } catch (error) {
      message.error("Error updating profile.");
    }
  };

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
      <div
        style={{
          width: "400px",
          padding: "20px",
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Update Profile Info
        </Title>
        <Form onFinish={handleUpdateProfile}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Profile Info
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfileInfo;
