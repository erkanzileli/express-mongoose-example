const express = require('express')
require('./db')

const routes = {
  records: require('./controllers/records')
}
const errorHandler = require('./middlewares/error')

// create main express app
const app = express()

// enable json parsing
app.use(express.json())

// register all route modules
for (const path in routes) {
  app.use('/' + path, routes[path])
}

// register error handler
app.use(errorHandler)

module.exports = app
