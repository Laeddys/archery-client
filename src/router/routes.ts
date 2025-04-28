import React from "react";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Competition from "../pages/Competitions/Competitions";
import Admin from "../pages/Admin/Admin";
import Main from "../pages/Main/Main";
import Profile from "../pages/Profile/Profile";
import Post from "../pages/Post/Post";
import CompetitionInfo from "../pages/CompetitionInfo/CompetitionInfo";
import AboutPage from "../pages/About/AboutPage";
import Clubs from "../pages/Clubs/Clubs";
import Athletes from "../pages/Athletes/Athletes";
import WelcomePage from "../pages/Welcome/WelcomePage";
import CompetitionInfoTest from "../pages/CompetitionInfo/CompInfoTest";
import CompetitionList from "../pages/CompetitionList/CompetitionList";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

export interface IRoute<T = any> {
  path: string;
  component: React.ComponentType<T>;
  isNavVisible?: boolean;
}

export enum RouteNames {
  LOGIN = "/login",
  COMPETITIONS = "/competitions",
  REGISTRATION = "/registration",
  ADMIN_PANEL = "/admin",
  // MAIN = "/main",
  PROFILE = "/profile",
  POST = `/posts/:id`,
  COMPETITION = `/compInfo/:id`,
  CLUBS = "/clubs",
  RULES = "/rules",
  ABOUT = "/about",
  ATHLETES = "/athletes",
  WELCOME = "/welcome",
  COMPETITIONTEST = `/compInfoTest`,
  COMPETITIONLIST = "/competition-list",
  FORGOTPASSWORD = "/forgot-password",
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
  {
    path: RouteNames.ABOUT,
    component: AboutPage,
    isNavVisible: true,
  },
  {
    path: RouteNames.CLUBS,
    component: Clubs,
    isNavVisible: true,
  },
  {
    path: RouteNames.ATHLETES,
    component: Athletes,
    isNavVisible: false,
  },
  { path: RouteNames.POST, component: Post, isNavVisible: false },
  // { path: RouteNames.MAIN, component: Main, isNavVisible: true },
  { path: RouteNames.LOGIN, component: Login, isNavVisible: true },
  {
    path: RouteNames.REGISTRATION,
    component: Registration,
    isNavVisible: false,
  },
  {
    path: RouteNames.WELCOME,
    component: WelcomePage,
    isNavVisible: false,
  },
  {
    path: RouteNames.COMPETITIONLIST,
    component: CompetitionList,
    isNavVisible: false,
  },
  {
    path: RouteNames.FORGOTPASSWORD,
    component: ForgotPassword,
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
  {
    path: RouteNames.ABOUT,
    component: AboutPage,
    isNavVisible: true,
  },
  {
    path: RouteNames.CLUBS,
    component: Clubs,
    isNavVisible: true,
  },
  {
    path: RouteNames.ATHLETES,
    component: Athletes,
    isNavVisible: false,
  },
  { path: RouteNames.POST, component: Post, isNavVisible: false },
  // { path: RouteNames.MAIN, component: Main, isNavVisible: true },
  { path: RouteNames.PROFILE, component: Profile, isNavVisible: true },
  {
    path: RouteNames.WELCOME,
    component: WelcomePage,
    isNavVisible: false,
  },
  {
    path: RouteNames.COMPETITIONLIST,
    component: CompetitionList,
    isNavVisible: false,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.COMPETITIONS,
    component: Competition,
    isNavVisible: true,
  },
  {
    path: RouteNames.ABOUT,
    component: AboutPage,
    isNavVisible: true,
  },
  {
    path: RouteNames.CLUBS,
    component: Clubs,
    isNavVisible: true,
  },
  {
    path: RouteNames.ATHLETES,
    component: Athletes,
    isNavVisible: false,
  },
  {
    path: RouteNames.COMPETITION,
    component: CompetitionInfo,
    isNavVisible: false,
  },
  { path: RouteNames.POST, component: Post, isNavVisible: false },
  // { path: RouteNames.MAIN, component: Main, isNavVisible: true },
  { path: RouteNames.PROFILE, component: Profile, isNavVisible: true },
  {
    path: RouteNames.ADMIN_PANEL,
    component: Admin,
  },
  {
    path: RouteNames.WELCOME,
    component: WelcomePage,
    isNavVisible: false,
  },

  {
    path: RouteNames.COMPETITIONLIST,
    component: CompetitionList,
    isNavVisible: false,
  },
];
