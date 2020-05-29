const { Schema, model } = require('mongoose')

const schema = new Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: Array
})

module.exports = model('Records', schema)
