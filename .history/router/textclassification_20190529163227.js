const express = require('express')
const router = express.Router()
const Tc = require('../models/textclassification')

// 查询所有数据
router.post('/pages', (req, res) => {
  var count = 0
  // document count
  Tc.count({}).then(c => {
    count = c
  })
  Tc.find({})
    .skip((req.body.current - 1) * req.body.pagesize)
    .limit(req.body.pagesize)
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

// 提交更新数据
router.post('/edit_pages', (req, res) => {
  data = req.body.form
  Tc.findOneAndUpdate({hash: data.hash},
    {$set: {
      text: data.text,
      relevant: data.relevant,
      update_time: new Date()
    }})
  .catch(err => res.json(err))
})

module.exports = router