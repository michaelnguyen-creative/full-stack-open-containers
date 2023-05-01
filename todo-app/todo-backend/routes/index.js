const express = require('express');
const router = express.Router();
const redis = require('../redis')
const mongodb = require('../mongo')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++
  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_req, res) => {
  const currentValue = await redis.getAsync('added_todos')
  // Initialize redis data
  if (!currentValue) {
    const todoCount = await mongodb.Todo.estimatedDocumentCount()
    await redis.setAsync('added_todos', todoCount)
  }
  res.status(200).json({ "added_todos": currentValue })
})

module.exports = router;
