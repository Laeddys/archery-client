import { Layout, Row, Col, Button, Dropdown, MenuProps } from "antd";
import React, { FC } from "react";
import { Route, useNavigate } from "react-router-dom";
import {
  IRoute,
  RouteNames,
  publicRoutes,
  authRoutes,
  privateRoutes,
} from "../router/routes";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../store/reducers/auth/action-creators";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, isAdmin } = useAppSelector((state) => state.authSlice);

  const logoutApp = async () => {
    await dispatch(logout());
    navigate(RouteNames.LOGIN);
  };

  const aboutMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={RouteNames.ABOUT}>About Us</Link>,
    },
    {
      key: "2",
      label: <Link to={RouteNames.RULES}>Contact</Link>,
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={RouteNames.CLUBS}>Clubs</Link>,
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Clubs map
        </a>
      ),
    },
    {
      key: "3",
      label: <Link to={RouteNames.ATHLETES}>Archers</Link>,
    },
  ];

  const renderMenuItems = (routes: IRoute[]) => {
    return routes
      .filter((route) => route.isNavVisible !== false)
      .map((route) => {
        if (route.path === RouteNames.CLUBS) {
          return (
            <Dropdown menu={{ items }} trigger={["hover"]} key="clubs">
              <Button type="text" style={{ color: "#fff" }}>
                Clubs
              </Button>
            </Dropdown>
          );
        }

        if (route.path === RouteNames.ABOUT) {
          return (
            <Dropdown
              menu={{ items: aboutMenuItems }}
              trigger={["hover"]}
              key="about"
            >
              <Button type="text" style={{ color: "#fff" }}>
                About
              </Button>
            </Dropdown>
          );
        }

        return (
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
              : route.path === RouteNames.ABOUT
              ? "About"
              : null}
          </Button>
        );
      });
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
            onClick={logoutApp}
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
            onClick={logoutApp}
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
    <Header>
      <Row justify="space-between" style={{ width: "100%" }}>
        <Col>
          <Button
            type="text"
            style={{ color: "lightblue", fontSize: "16px" }}
            onClick={() => navigate(RouteNames.WELCOME)}
          >
            Archery
          </Button>
        </Col>
        <Col>{renderMenu()}</Col>
      </Row>
    </Header>
  );
};

export default Navbar;
