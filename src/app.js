const express = require('express')

const db = require('./utils/database')

const Tasks = require('./models/tasks.models')

require('dotenv').config()

const PORT = process.env.PORT || 5000

db.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch((err) => console.log(err))

db.sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.log(error))

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
  try {
    res.json('todo esta en orden')
  } catch (error) {
    res.status(400).json(error)
  }
})

app.get('/api/v1/todos', async (req, res) => {
  try {
    const tasks = await Tasks.findAll()
    res.json(tasks)
  } catch (error) {
    res.status(400).json(error)
  }
})

app.get("/api/v1/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.params);

    const task = await Tasks.findByPk(id);
    res.json(task);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post('/api/v1/todos', async (req, res) => {
  try {
    const newTask = req.body
    await Tasks.create(newTask)
    res.status(201).send()
  } catch (error) {
    res.status(400).json(error)
  }
})

app.delete('/api/v1/todos/:id', async (req, res) => {
  try {

    const { id } = req.params

    await Tasks.destroy({
      where: {id}
    })

    res.status(204).send()

  } catch (error) {
    res.status(400).json(error)
  }
})

app.put('/api/v1/todos/:id', async (req, res) => {
  try {
    
    const { id } = req.params
    const { title, description, completed } = req.body

    await Tasks.update({ title, description, completed }, {
      where: {id}
    })

    res.status(204).send()

  } catch (error) {
    res.status(400).json(error)
  }
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
})


