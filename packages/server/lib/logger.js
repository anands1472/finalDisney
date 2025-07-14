const pino = require("pino");
const packageJson = require("../package.json");
const config = require("config");

const LOGGER_LEVEL =
  process.env.LOGGER_LEVEL || config.get("LOGGER_LEVEL") || "warn";

const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};

const loggerConfig = {
  name: packageJson.name,
  level: LOGGER_LEVEL,
  customLevels: levels,
  useOnlyCustomLevels: true,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
};
// TODO:: add pino transporter

const logger = pino(
  loggerConfig
  // pino.destination(`./app-.log`)
);

module.exports = logger;
