const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

const todoCounter = async () => {
  const { added_todos } = await redis.getAsync('added_todos')
  await redis.setAsync('added_todos', added_todos + 1)
}
/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  await todoCounter()
  res.send(todo)
})

// These are just route defs (meaning findByIdMiddleware doesn't work here)
// Execution happens when you actually use the route
// Syntax for using the routes: `app.use('/route', router)`
const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.status(200).json(req.todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  // You'll need to mutate data in the database
  req.todo.text = req.body.text
  req.todo.done = req.body.done
  const returnedData = await req.todo.save()
  res.status(200).json(returnedData)
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
