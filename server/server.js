import express from 'express'
import { usersRouter } from './routes/users.js'
import path from 'path'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.set('views', path.join(process.cwd(), 'server', 'views'))
app.set('view engine', 'ejs')
app.disable('x-powered-by')

app.use((req, res, next) => {
  if (req.url === '/') {
    res.set('Cache-Control', 'no-store')
    return next()
  }
  next()
})

app.get('/', (req, res) => {
  const token = req.cookies.access_token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return res.render('login', { username: decoded.username })
  } catch (err) {
    res.render('login')
  }
})

app.get('/protected', (req, res) => {
  const token = req.cookies.access_token
  if (!token) {
    return res.redirect('/')
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.render('protected', { username: decoded.username })
  } catch (err) {
    console.error(err)
    return res.redirect('/')
  }
})

app.use('/users', usersRouter)
// app.use('/tasks', tasksRouter)

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
