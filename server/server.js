import express from 'express'
import { usersRouter } from './routes/users.js'
const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use('/users', usersRouter)
// app.use('/tasks', tasksRouter)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
