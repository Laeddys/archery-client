import React, { FC, useEffect } from "react";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import { Layout } from "antd";
import "./App.css";
import { useAppSelector } from "./hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "./router/routes";
import { setAuth, setUser } from "./store/reducers/auth/authSlice";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { AuthActionCreators } from "./store/reducers/auth/action-creators";

const App: FC = () => {
  const navigate = useNavigate();
  const { user, isAuth } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  function check() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        dispatch(AuthActionCreators.checkRole());
        dispatch(setAuth(true));

        navigate(RouteNames.MAIN);
      } catch (error) {
        console.error(error);
        navigate(RouteNames.LOGIN);
      }
    } else {
      navigate(RouteNames.MAIN);
    }
  }

  useEffect(() => {
    check();
  }, [user]);

  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
};

export default App;
