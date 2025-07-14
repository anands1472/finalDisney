const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

module.exports = function(app) {
  app.use(compression(), cors())
  app.use((req, res, next) => {
    // req.secure is equal to req.protocal === https
    if (req.secure) {
      helmet()
    }
    next()
  })
}
