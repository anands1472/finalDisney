const get = require('lodash/get')

module.exports = function snapHeaderPartA(req, res, next) {
  req.headers = {
    'Content-Type': 'application/json',
    authorization: get(req, 'app.locals.headers.Authorization'),
    organisation: get(req, 'app.locals.headers.organisation', 'GWS'),
    applicationName: get(
      req,
      'app.locals.headers.applicationName',
      'priorauthconnect'
    ),
    encryptionmode: 'Advanced'
  }
  next()
}
