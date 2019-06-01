const express = require('express')
const router = express.Router()
const Tc = require('../models/textclassification')

// 查询所有数据
router.get('/pages', (req, res) => {
  // Tc.find({})
  //   .skip(0)
  //   .limit(10)
  //   .then(doc => {
  //     res.json(doc)
  //   })
  //   .catch(err => {
  //     res.json(err)
  //   })
  Tc.count({}).then(c => {
    res.json(c)
  })
})

module.exports = router