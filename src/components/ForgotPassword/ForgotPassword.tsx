import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { rules } from "../../utils/rules";

const ForgotPassword: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: { email: string }) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, {
        email: values.email,
      });
      setFormSent(true);
    } catch (error: any) {
      message.error("An error occured. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Forgot Password</h2>
      <Card>
        {!formSent ? (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                rules.required("Please input your name!"),
                { type: "email", message: "Incorrect email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Send reset link
            </Button>
          </Form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p>A password reset email has been sent to your email address..</p>
            <Button type="default" onClick={() => navigate("/login")}>
              Back to login
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
