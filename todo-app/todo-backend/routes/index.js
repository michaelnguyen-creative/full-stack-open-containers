const express = require('express')
const router = express.Router()
const { todoCounter } = require('./todos')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++
  res.send({
    ...configs,
    visits,
  })
})

router.get('/statistics', async (_req, res) => {
  const { added_todos } = await todoCounter()
  res.status(200).json({ added_todos })
})

module.exports = router
