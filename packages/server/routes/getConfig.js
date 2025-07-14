const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");
const fs = require("fs");
const config = require("config");
const ourConfigDir = config.util.getEnv("NODE_CONFIG_DIR");
const env = config.util.getEnv("NODE_CONFIG_ENV");

// @route GET /all
// @desc Get all config data

router.get("/all", (req, res) => {
  const data = fs.readFileSync(`${ourConfigDir}/${env}.json`, "utf8");
  res.send(JSON.parse(data));
});

// @route GET /:id
// @desc Get multiconfig information
// @queryParam id,id

router.get("/:id", (req, res) => {
  const value = req && req.params && req.params.id;
  const keys = value.split(",");
  //logger.debug(`calling ${req && req.originalUrl}`);
  let sendVal = {};
  keys.forEach(key => {
    sendVal[key] = config.has(key) ? config.get(key) : undefined;
  });
  res.send(sendVal);
});

module.exports = router;
