const express = require('express')
const router = express.Router()
const Tc = require('../models/textclassification')

// 查询所有数据
router.get('/pages', (req, res) => {
  Tc.find({
    limit: 10
    })
    .then(movies => {
      res.json(movies)
    })
    .catch(err => {
      res.json(err)
    })
})