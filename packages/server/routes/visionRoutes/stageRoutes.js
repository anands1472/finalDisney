const express = require('express')
const router = express.Router()
const logger = require('../../lib/logger')
const config = require('config')
const axios = require('axios')
const headers = require('../../middlewares/headers')

router.delete('/stageApiCall', [headers], async (req, res, next) => {
  const targetUrl = req.query.target
  logger.debug('Request query:', req.query)
  logger.debug('Request headers:', req.headers)
  logger.debug('Request body:', req.body)
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing target URL in query' })
  }
  logger.debug(`Calling external URL: ${targetUrl}`)
  axios({
    method: 'delete',
    url: targetUrl,
    headers: { ...req.headers },
    data: req.body
  })
    .then((response) => {
      const data = response.data
      res.json(data)
    })
    .catch(next)
})

router.get('/stageApiGetCall', [headers], async (req, res, next) => {
  const targetUrl = req.query.target
  logger.debug('Request query:', req.query)
  logger.debug('Request headers:', req.headers)
  logger.debug('Request body:', req.body)
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing target URL in query' })
  }
  logger.debug(`Calling external URL: ${targetUrl}`)
  axios({
    method: 'get',
    url: targetUrl,
    headers: { ...req.headers },
    data: req.body
  })
    .then((response) => {
      const data = response.data
      res.json(data)
    })
    .catch(next)
})

module.exports = router
