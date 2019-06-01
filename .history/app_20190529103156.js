const config = require('./config/db')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const index = require('./router/index')
// const tc = require('./router/textclassification')

mongoose.connect(config.mongodb)
mongoose.Promise = global.Promise

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'))
app.use('/',index)
// app.use('/api', tc)

app.listen(3000, () => {
  console.log(`${pkg.name} listening on port 3000`)
})

module.exports = app