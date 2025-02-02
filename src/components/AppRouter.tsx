import React, { FC } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  publicRoutes,
  authRoutes,
  privateRoutes,
  IRoute,
} from "../router/routes";
import { useAppSelector } from "../hooks/useAppSelector";

const AppRouter: FC = () => {
  const { isAuth, isAdmin } = useAppSelector((state) => state.authSlice);

  const renderRoutes = (routes: IRoute[]) => {
    return routes.map((route: IRoute, index: number) => (
      <Route key={index} path={route.path} element={<route.component />} />
    ));
  };

  return (
    <Routes>
      {renderRoutes(publicRoutes)}
      {isAuth && renderRoutes(authRoutes)}
      {isAuth && isAdmin && renderRoutes(privateRoutes)}
      <Route path="*" element={<Link to={"/main"} />} />
    </Routes>
  );
};

export default AppRouter;
