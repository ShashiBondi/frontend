// src/pages/DeleteAccount.jsx
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteAccount, getProfile } from "../services/auth";

const { Title } = Typography;

const DeleteAccount = () => {
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user email when component mounts
    const fetchUserEmail = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await getProfile(token);
        setUserEmail(response.data.email);
      } catch (error) {
        message.error("Error loading user data.");
        navigate("/login");
      }
    };
    fetchUserEmail();
  }, [navigate]);

  const showModal = () => {
    if (email !== userEmail) {
      message.error("Email does not match the current user's email.");
      return;
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteAccount(email, token);
      message.success("Account deleted successfully.");
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      message.error("Error deleting account. Please check your email.");
    } finally {
      setIsModalVisible(false);
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
          Delete Account
        </Title>
        <Form onFinish={showModal}>
          <Form.Item
            label="Confirm Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter your email.",
              },
            ]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger htmlType="submit" block>
              Delete Account
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="Confirm Delete"
          visible={isModalVisible}
          onOk={handleDeleteAccount}
          onCancel={handleCancel}
          okText="Delete"
          okButtonProps={{ danger: true }}
        >
          <p>
            Are you sure you want to delete your account? This action is
            irreversible.
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default DeleteAccount;
