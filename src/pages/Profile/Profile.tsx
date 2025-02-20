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
        style={{ width: 400, height: 500, textAlign: "center", padding: 20 }}
      >
        <Avatar size={190} icon={<UserOutlined />} className={styles.avatar} />
        <div className={styles.info}>
          <Title level={3} className={styles.username}>
            {user.name}
          </Title>
          <Text type="secondary" className={styles.email}>
            Email: {user.email}
          </Text>
          <Space direction="vertical" style={{ marginTop: 20 }}>
            <Text strong>Location: New York, USA</Text>
            <Text strong>Joined: January 2023</Text>
            <Text strong>Role: {user.role}</Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
