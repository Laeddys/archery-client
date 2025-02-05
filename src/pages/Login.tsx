import { Card, Col, Row } from "antd";
import Layout, { Footer } from "antd/es/layout/layout";
import React, { FC } from "react";
import LoginForm from "../components/LoginForm/LoginForm";

const Login: FC = () => {
  return (
    <Layout>
      <Row justify="space-around" style={{ marginTop: "30px" }}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <Card title="Login" style={{ borderRadius: "8px" }}>
            <LoginForm />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
