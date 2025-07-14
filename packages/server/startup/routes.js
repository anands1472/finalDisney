const express = require("express");
const multer = require("multer");
const headers = require("../middlewares/headers");
const sampleRoute = require("../routes/visionRoutes/sampleRoutes");
const stageRoute = require("../routes/visionRoutes/stageRoutes");
module.exports = function (app) {
  app.use(express.json({ limit: "200mb" }));
  app.use(express.urlencoded({ extended: true })); // to log request into terminal
  app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  app.use(upload.array("files"));
  app.use(`/api/disney/lookup`, headers, sampleRoute);
  app.use(`/api/disney/stage`, headers, stageRoute);
};
