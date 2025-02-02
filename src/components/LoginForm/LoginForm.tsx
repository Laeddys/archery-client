import { Alert, Button, Form, Input } from "antd";
import React, { FC, useState } from "react";
import { rules } from "../../utils/rules";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { NavLink, useNavigate } from "react-router-dom";
import { RouteNames } from "../../router/routes";

import styles from "./LoginForm.module.css";
import { login } from "../../store/reducers/auth/action-creators";

const LoginForm: FC = () => {
  const [form] = Form.useForm();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const { error, isLoading } = useAppSelector((state) => state.authSlice);

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      setValidationError(null);
      await dispatch(login(values));
    } catch (err: any) {
      form.setFields([
        {
          name: "password",
          errors: [err || "Invalid password"],
        },
      ]);
    }
  };

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      className={styles.form}
      layout="vertical"
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
          placeholder="Type your Email"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          rules.required("Please input your password!"),
          rules.min(),
          rules.max(),
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
      <div className={styles.registerLink}>
        Don't have an account?{" "}
        <NavLink to={RouteNames.REGISTRATION}>Register!</NavLink>
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

export default LoginForm;
