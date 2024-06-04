import { Button, Form, Input, notification } from "antd";
import React, { FC, useState } from "react";
import { rules } from "../utils/rules";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { NavLink, useNavigate } from "react-router-dom";
import { RouteNames } from "../router/routes";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const { error, isLoading } = useAppSelector((state) => state.authSlice);

  const handleSubmit = async () => {
    await dispatch(AuthActionCreators.login(email, password));
  };

  const failedSubmit = () => {
    console.log("Failed to submit");
  };

  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={failedSubmit}
      style={{ maxWidth: 300 }}
    >
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {error}
        </div>
      )}
      <Form.Item
        label="Email"
        name="email"
        rules={[rules.required("Please input your email!")]}
      >
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Type your Email"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required("Please input your password!")]}
      >
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Type your password"
          type="password"
        />
      </Form.Item>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        Don't have an account?{" "}
        <NavLink to={RouteNames.REGISTRATION}>Register!</NavLink>
      </div>
      <Form.Item style={{ margin: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
