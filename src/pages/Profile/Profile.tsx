import React from "react";
import { Card, Avatar, Typography, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks/useAppSelector";
import styles from "./Profile.module.css";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.authSlice);
  return (
    <div className={styles.profileContainer}>
      <Card
        style={{
          width: 350,
          padding: "30px 20px",
          textAlign: "center",
          borderRadius: 20,
          backgroundColor: "#f7f7f7",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Avatar
          size={120}
          icon={<UserOutlined />}
          className={styles.avatar}
          style={{
            marginBottom: 20,
            border: "4px solid #1890ff",
          }}
        />
        <Title level={4} className={styles.username}>
          {user.name}
        </Title>
        <Title level={5} className={styles.username}>
          {user.username}
        </Title>
        <Text type="secondary" className={styles.email}>
          {user.email}{" "}
        </Text>
        <Space direction="vertical" style={{ marginTop: 20 }}>
          <Text strong>{user.role}</Text>
        </Space>
      </Card>
    </div>
  );
};

export default ProfilePage;
