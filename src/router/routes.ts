import React from "react";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Competition from "../pages/Competitions/Competitions";
import Admin from "../pages/Admin";
import Main from "../pages/Main/Main";
import Profile from "../pages/Profile";
import Post from "../pages/Post/Post";
import CompetitionInfo from "../pages/CompetitionInfo";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  isNavVisible?: boolean;
}

export enum RouteNames {
  LOGIN = "/login",
  COMPETITIONS = "/competitions",
  REGISTRATION = "/registration",
  ADMIN_PANEL = "/admin",
  MAIN = "/main",
  PROFILE = "/profile",
  POST = `/posts/:id`,
  COMPETITION = `/compInfo/:id`,
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.COMPETITIONS,
    component: Competition,
    isNavVisible: true,
  },
  {
    path: RouteNames.COMPETITION,
    component: CompetitionInfo,
    isNavVisible: false,
  },
  { path: RouteNames.POST, component: Post, isNavVisible: false },
  { path: RouteNames.MAIN, component: Main, isNavVisible: true },
  { path: RouteNames.LOGIN, component: Login, isNavVisible: true },
  {
    path: RouteNames.REGISTRATION,
    component: Registration,
    isNavVisible: false,
  },
];

export const authRoutes: IRoute[] = [
  {
    path: RouteNames.COMPETITIONS,
    component: Competition,
    isNavVisible: true,
  },
  {
    path: RouteNames.COMPETITION,
    component: CompetitionInfo,
    isNavVisible: false,
  },
  { path: RouteNames.POST, component: Post, isNavVisible: false },
  { path: RouteNames.MAIN, component: Main, isNavVisible: true },
  { path: RouteNames.PROFILE, component: Profile, isNavVisible: true },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.COMPETITIONS,
    component: Competition,
    isNavVisible: true,
  },
  {
    path: RouteNames.COMPETITION,
    component: CompetitionInfo,
    isNavVisible: false,
  },
  { path: RouteNames.POST, component: Post, isNavVisible: false },
  { path: RouteNames.MAIN, component: Main, isNavVisible: true },
  { path: RouteNames.PROFILE, component: Profile, isNavVisible: true },
  {
    path: RouteNames.ADMIN_PANEL,
    component: Admin,
  },
];
