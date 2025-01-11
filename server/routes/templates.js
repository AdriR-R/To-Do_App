import express from 'express'
import { validateSession } from '../middlewares/validateCookies.js'
export const templatesRouter = express.Router()

templatesRouter.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

templatesRouter.get('/', validateSession, (req, res) => {
  if (req.session.error) {
    return res.render('login')
  }
  res.render('login', { username: req.session.username })
})

templatesRouter.get('/protected', validateSession, (req, res) => {
  if (req.session.error) {
    return res.redirect('/')
  }
  res.render('protected', { username: req.session.username })
})
