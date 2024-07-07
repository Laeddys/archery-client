import { Layout, Row, Col, Button } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  IRoute,
  RouteNames,
  publicRoutes,
  authRoutes,
  privateRoutes,
} from "../router/routes";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, isAdmin } = useAppSelector((state) => state.authSlice);

  const logout = () => {
    dispatch(AuthActionCreators.logout());
    navigate(RouteNames.LOGIN);
  };

  const renderMenuItems = (routes: IRoute[]) => {
    return routes
      .filter((route) => route.isNavVisible !== false)
      .map((route) => (
        <Button
          key={route.path}
          type="text"
          style={{ color: "#fff" }}
          onClick={() => navigate(route.path)}
        >
          {route.path === RouteNames.LOGIN
            ? "Login"
            : route.path === RouteNames.REGISTRATION
            ? "Registration"
            : route.path === RouteNames.COMPETITIONS
            ? "Competitions"
            : route.path === RouteNames.ADMIN_PANEL
            ? "Admin Panel"
            : route.path === RouteNames.MAIN
            ? "Main"
            : route.path === RouteNames.PROFILE
            ? "Profile"
            : null}
        </Button>
      ));
  };

  const renderMenu = () => {
    if (isAuth && isAdmin) {
      return (
        <>
          {renderMenuItems(privateRoutes)}
          <Button
            key="logout"
            type="text"
            style={{ color: "#fff" }}
            onClick={logout}
          >
            Logout
          </Button>
        </>
      );
    } else if (isAuth) {
      return (
        <>
          {renderMenuItems(authRoutes)}
          <Button
            key="logout"
            type="text"
            style={{ color: "#fff" }}
            onClick={logout}
          >
            Logout
          </Button>
        </>
      );
    } else {
      return <>{renderMenuItems(publicRoutes)}</>;
    }
  };

  return (
    <Layout.Header>
      <Row justify="space-between" style={{ width: "100%" }}>
        <Col>
          <Button
            type="text"
            style={{ color: "lightblue", fontSize: "16px" }}
            onClick={() => navigate(RouteNames.MAIN)}
          >
            Archery
          </Button>
        </Col>
        <Col>{renderMenu()}</Col>
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
