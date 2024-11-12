// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { signup } from "../services/auth";

const { Title, Text } = Typography;

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup({ first_name, last_name, email, password });
      message.success("Signup successful! You can now log in.");
      navigate("/login");
    } catch (error) {
      message.error("Error signing up. Try again.");
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
        <Title level={2} style={{ textAlign: "center" }}>
          Register
        </Title>
        <Form onFinish={handleSignup}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
          <Text style={{ display: "block", textAlign: "center" }}>
            Already have an account?{" "}
            <a onClick={() => navigate("/login")}>Log In</a>
          </Text>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
