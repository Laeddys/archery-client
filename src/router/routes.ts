import React from "react";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Competition from "../pages/Competition";
import Admin from "../pages/Admin";
import Main from "../pages/Main/Main";
import Profile from "../pages/Profile";
import Post from "../pages/Post";

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export enum RouteNames {
  LOGIN = "/login",
  COMPETITIONS = "/competitions",
  REGISTRATION = "/registration",
  ADMIN_PANEL = "/admin",
  MAIN = "/main",
  PROFILE = "/profile",
  // POST = `/post/${id}`,
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, component: Login },
  { path: RouteNames.REGISTRATION, component: Registration },
  { path: RouteNames.COMPETITIONS, component: Competition },
  { path: RouteNames.MAIN, component: Main },
  // { path: RouteNames.POST, component: Post },
];

export const authRoutes: IRoute[] = [
  { path: RouteNames.COMPETITIONS, component: Competition },
  { path: RouteNames.MAIN, component: Main },
  { path: RouteNames.PROFILE, component: Profile },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.COMPETITIONS, component: Competition },
  { path: RouteNames.MAIN, component: Main },
  { path: RouteNames.PROFILE, component: Profile },
  {
    path: RouteNames.ADMIN_PANEL,
    component: Admin,
  },
];
