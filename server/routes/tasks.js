import express from 'express'
import { TaskController } from '../controller/tasks.js'
export const tasksRouter = express.Router()

tasksRouter.get('/', TaskController.getAll)
tasksRouter.post('/', TaskController.create)
tasksRouter.delete('/:id', TaskController.delete)
