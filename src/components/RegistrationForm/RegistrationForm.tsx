import { Alert, Button, Form, Input, message } from "antd";
import React, { FC, useState } from "react";
import { rules } from "../../utils/rules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { NavLink, useNavigate } from "react-router-dom";
import { RouteNames } from "../../router/routes";

import styles from "./../LoginForm/LoginForm.module.css";
import { registration } from "../../store/reducers/auth/action-creators";

const RegistrationForm: FC = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.authSlice);

  const handleSubmit = async (values: {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      await dispatch(registration(values));
    } catch (error) {
      console.warn("LoginForm", error);
    }
  };

  const failedSubmit = () => {
    console.log("Failed to submit");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      onFinishFailed={failedSubmit}
      className={styles.form}
    >
      {error && (
        <Alert
          style={{ marginBottom: "10px" }}
          message={error}
          type="error"
          showIcon
        />
      )}

      <Form.Item
        label="Name"
        name="name"
        rules={[rules.required("Please input your name!")]}
        className={styles.formItem}
      >
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Type your Name (example: John Doe)"
        />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required("Please input your username!")]}
        className={styles.formItem}
      >
        <Input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Type your Username (example: user123)"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          rules.required("Please input your email!"),
          { type: "email", message: "The input is not a valid email!" },
        ]}
        className={styles.formItem}
      >
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Type your Email (example: user@gmail.com)"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          rules.required("Please input your password!"),
          rules.max(),
          rules.min(),
        ]}
        className={styles.formItem}
      >
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Type your password"
          type="password"
        />
      </Form.Item>

      <Form.Item
        label="Password Confirmation"
        name="password_confirmation"
        rules={[
          rules.required("Please input your password!"),
          rules.max(),
          rules.min(),
        ]}
        className={styles.formItem}
      >
        <Input
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          placeholder="Type your password"
          type="password"
        />
      </Form.Item>
      <div className={styles.registerLink}>
        Already have an account?{" "}
        <NavLink to={RouteNames.LOGIN}>Log in!</NavLink>
      </div>
      <Form.Item className={styles.submitButton}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          className={styles.submitButton}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
