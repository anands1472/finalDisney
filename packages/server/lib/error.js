const get = require("lodash/get");
const logger = require("./logger");

module.exports = function(err, req, res, next) {
  if (err) {
    logger.error({
      message: get(err, "message", null),
      url: get(err, "config.url", null),
      headers: get(err, "config.headers", null),
    });
  }
  const responseStatus = get(err, "response.status", 500);
  const jwtTokenError = get(err, "name", null);
  res.status(jwtTokenError === "TokenExpiredError" ? 401 : 500).send({
    errorMessage: get(err, "message", "Request failed"),
    serviceStatusCode: responseStatus,
    response: get(err, "response.data", {}),
  });
};
