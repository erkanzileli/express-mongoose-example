const mongoose = require('mongoose')

const config = require('../config')

const connectionString = `mongodb+srv://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.database}?retryWrites=true`

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', (...args) => {
  console.error(args)
  process.exit(1)
})
mongoose.connection.once('open', () =>
  console.log('Database connection has been established.')
)
