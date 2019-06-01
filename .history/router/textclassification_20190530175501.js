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
// ????? 同title字段的数据是否需要一同更新
router.post('/edit_pages', (req, res) => {
  data = req.body.form
  Tc.findOneAndUpdate({hash: data.hash},
    {$set: {
      text: data.text,
      title: data.title,
      relevant: data.relevant,
      has_edit: true,
      update_time: new Date(),
      use: true
    }})
  .then(r => res.json(r))
  .catch(err => res.json(err))
})

// 废弃数据
router.post('/delect_pages', (req, res) => {
  Tc.findOneAndUpdate({hash: req.body.hash},
    {$set: {
      use: false
    }})
  .then(r => res.json(r))
  .catch(err => res.json(err))
})

// 查询title字段，返回document记录
router.post('/title_exists', (req, res) => {
  Tc.findOne({title: title})
  .then(r => res.json({'doc': r}))
  .catch(err => res.json({'err': err}))
})

module.exports = router