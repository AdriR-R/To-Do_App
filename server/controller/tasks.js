import { TasksModel } from '../models/MySQL/tasksModel.js'
import { validateTask } from '../schemas/taskSh.js'
export class TaskController {
  static async getAll (req, res) {
    try {
      const { status } = req.query
      const results = await TasksModel.getAll({ status })
      if (results.error) {
        return res.status(500).json(results)
      }
      res.json(results)
    } catch (err) {
      return res.status(500).json({ error: 'Database connection failed' })
    }
  }

  static async create (req, res) {
    try {
      const validTask = validateTask(req.body)
      if (validTask.error) {
        return res.status(400).json({ error: JSON.parse(validTask.error.message) })
      }
      const results = await TasksModel.create(Object.keys(validTask.data), Object.values(validTask.data))
      if (results.error) {
        return res.status(400).json(results)
      }
      res.status(201).json(results)
    } catch (error) {
      return res.status(500).json({ error: 'Database connection failed' })
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params
      const results = await TasksModel.delete(id)
      if (results.error) {
        return res.status(404).json(results)
      }
      res.status(200).json(results)
    } catch (err) {
      return res.status(500).json({ error: 'Database connection failed' })
    }
  }
}
