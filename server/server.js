import express from 'express'
import { usersRouter } from './routes/users.js'
import { templatesRouter } from './routes/templates.js'
import path from 'path'
import { tasksRouter } from './routes/tasks.js'
import cookieParser from 'cookie-parser'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.set('views', path.join(process.cwd(), 'server', 'views'))
app.set('view engine', 'ejs')
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.redirect('/home')
})

app.use('/users', usersRouter)
app.use('/home', templatesRouter)
app.use('/tasks', tasksRouter)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
