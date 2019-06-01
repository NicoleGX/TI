const express = require('express')
const router = express.Router()
const Tc = require('../models/textclassification')

// 查询所有数据
router.post('/pages', (req, res) => {
  var count = 0
  document count
  Tc.count({}).then(c => {
    count = c
  })
  // Tc.find({})
  //   .skip((req.body.current - 1) * req.body.pagesize)
  //   .limit(req.body.pagesize)
  //   .then(doc => {
  //     res.json({
  //       'doc': doc,
  //       'count': count
  //     })
  //   })
  //   .catch(err => {
  //     res.json(err)
  //   })
  Tc.find({})
  .skip(0)
  .limit(10)
  .then(doc => {
    res.json({
      'doc': doc,
      'count': count
    })
  })
  .catch(err => {
    res.json(err)
  })
  
})

module.exports = router