const express = require("express");
const router = express.Router();
const logger = require("../../lib/logger");
const headers = require("../../middlewares/headers");

const sampleData = require('../../database/Dropdowns/dropDowns.json');
const stage = require('../../database/Environments/stage.json');
const prod = require('../../database/Environments/prod.json');
const latest = require('../../database/Environments/latest.json');

router.get("/metaData", [headers], async (req, res, next) => {
  logger.debug("Returning combined local JSON data");

  try {
    const combinedData = {
      ...sampleData,
      ...stage,
      ...prod,
      ...latest
    };

    res.json(combinedData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
