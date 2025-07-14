const express = require("express");
const router = express.Router();
const logger = require("../../lib/logger");
const config = require("config");
const axios = require("axios");
const headers = require("../../middlewares/headers");
const sampleData = require('../../database/Dropdowns/dropDowns.json')
const stage = require('../../database/Environments/stage.json')
const prod = require('../../database/Environments/prod.json')
const latest = require('../../database/Environments/latest.json')

router.get("/metaData", [headers], async (req, res, next) => {
  const url = encodeURI(`https://dummyjson.com/todos`);
  logger.debug(`calling anand utn ${url}`);
   const combinedData = {
      ...sampleData,
      ...stage,
      ...prod,
      ...latest
    };
  axios({
    method: "get",
    url,
    headers: { ...req.headers },
    data: req.body,
  })
    .then((response) => {
      const data = response.data;
      //res.json(data);
      res.json(combinedData);
    })
    .catch(next);
});

module.exports = router;
