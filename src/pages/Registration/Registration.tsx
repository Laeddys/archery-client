import { Card, Col, Row } from "antd";
import Layout from "antd/es/layout/layout";
import React, { FC } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import "../../App.css";

const Registration: FC = () => {
  return (
    <Layout>
      <Row justify="center" style={{ marginTop: "30px" }}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <Card title="Registration" style={{ borderRadius: "8px" }}>
            <RegistrationForm />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Registration;
