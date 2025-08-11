"use strict";

const fs = require("fs");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware");
const paths = require("./paths");
const getHttpsConfig = require("./getHttpsConfig");

const host = process.env.HOST || "0.0.0.0";
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

// Читаем ALLOWED_HOSTS из .env
const allowedHostsFromEnv = process.env.ALLOWED_HOSTS
  ? process.env.ALLOWED_HOSTS.split(",")
      .map((h) => h.trim())
      .filter(Boolean)
  : [];

if (allowedHostsFromEnv.length === 0) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "Error: ALLOWED_HOSTS is not set in .env. Please provide a comma separated list of hosts."
  );
  process.exit(1);
}

module.exports = function (proxy) {
  return {
    allowedHosts: allowedHostsFromEnv,
    compress: true,
    static: {
      directory: paths.appPublic,
      publicPath: [paths.publicUrlOrPath],
      watch: {
        ignored: ignoredFiles(paths.appSrc),
      },
    },
    client: {
      logging: "none",
      overlay: {
        errors: true,
        warnings: false,
      },
      webSocketURL: {
        hostname: sockHost,
        pathname: sockPath,
        port: sockPort,
      },
    },
    devMiddleware: {
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },
    https: getHttpsConfig(),
    host,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    onBeforeSetupMiddleware(devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      devServer.app.use(evalSourceMapMiddleware(devServer));
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));
    },
    onAfterSetupMiddleware(devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },
  };
};
