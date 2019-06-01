const mongoose = require('mongoose')

const tcSchema = mongoose.Schema({
  hash: { type: String, required: true },
  url: String,
  content: String,
  text: String,
  relevant: String,
  has_edit: Boolean,
  update_date: { type: Date, default: Date.now },
  use: { type: Boolean, default: true}
})

const Tc = module.exports = mongoose.model('Page', tcSchema)
