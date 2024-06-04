import { Card, Row } from "antd";
import Layout from "antd/es/layout/layout";
import React, { FC } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

const Registration: FC = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <Card>
          <RegistrationForm />
        </Card>
      </Row>
    </Layout>
  );
};

export default Registration;
