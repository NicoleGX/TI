const mongoose = require('mongoose')

const tcSchema = mongoose.Schema({
  hash: { type: String, required: true },
  url: String,
  content: String
})

const Tc = module.exports = mongoose.model('Page', tc)
