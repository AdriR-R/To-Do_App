import express from 'express'
import { UsersController } from '../controller/users.js'
export const usersRouter = express.Router()

usersRouter.post('/register', UsersController.register)

usersRouter.post('/login', UsersController.login)

usersRouter.post('/logout', UsersController.logout)
