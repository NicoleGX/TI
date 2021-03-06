const mongoose = require('mongoose')

const tcSchema = mongoose.Schema({
  hash: { type: String, required: true },
  url: String,
  content: String,
  text: String,
  relevant: String,
  update_date: { type: Date, default: Date.now }
})

const Tc = module.exports = mongoose.model('Page', tcSchema)
