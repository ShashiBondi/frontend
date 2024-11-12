// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { login } from "../services/auth";

const { Title, Text } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Show success message and redirect to profile
      message.success("Login successful!");
      navigate("/profile"); // Redirect to profile after successful login
    } catch (error) {
      message.error("Error logging in. Check credentials.");
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
          Log In
        </Title>
        <Form onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
          <Text style={{ display: "block", textAlign: "center" }}>
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")}>Register</a>
          </Text>
        </Form>
      </div>
    </div>
  );
};

export default Login;
