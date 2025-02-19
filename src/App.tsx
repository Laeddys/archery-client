import React, { FC, useCallback, useEffect } from "react";
import AppRouter from "./components/AppRouter/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import { Layout } from "antd";
import "./App.css";
import { useAppSelector } from "./hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "./router/routes";
import { setAuth, setUser } from "./store/reducers/auth/authSlice";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { checkRole } from "./store/reducers/auth/action-creators";
import { Footer } from "antd/es/layout/layout";

const App: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const check = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        await dispatch(checkRole());
        dispatch(setAuth(true));
        navigate(RouteNames.MAIN);
      } catch (error) {
        console.error(error);
        navigate(RouteNames.LOGIN);
      }
    } else {
      navigate(RouteNames.MAIN); // как-нибудь по-другому реализовать..
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Layout>
        <Navbar />
        <Layout.Content>
          <AppRouter />
        </Layout.Content>
      </Layout>
      <Footer
        style={{
          textAlign: "center",
          background: "#001529",
          color: "white",
          padding: "16px",
          marginTop: "auto",
        }}
      >
        Archery Club ©2024
      </Footer>
    </div>
  );
};

export default App;
