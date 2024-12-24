import express from 'express'
import { usersRouter } from './routes/users.js'
import path from 'path'

const app = express()

app.use(express.json())
app.set('views', path.join(process.cwd(), 'server', 'views'))
app.set('view engine', 'ejs')
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.render('example', { user: 'Home' })
})

app.use('/users', usersRouter)
// app.use('/tasks', tasksRouter)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
