const express = require('express')
const router = express.Router()
// const Tc = require('../models/textclassification')

// 查询所有数据
router.get('/', (req, res) => {
  // Tc.find({
  //   hash: '03595e7b91dac6e143cfcf9dc26f30bf'
  //   })
  //   .then(movies => {
  //     console.log(movies)
  //     res.json(movies)
  //   })
  //   .catch(err => {
  //     res.json(err)
  //   })
  res.send('Hello pages!')
})

module.exports = router