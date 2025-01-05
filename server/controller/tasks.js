import { TasksModel } from '../models/MySQL/tasksModel.js'
import { validateTask } from '../schemas/taskSh.js'
export class TaskController {
  static async getAll (req, res) {
    const { status } = req.query
    const results = await TasksModel.getAll({ status })
    if (results.error) {
      return res.status(500).json(results)
    }
    res.json(results)
  }

  static async create (req, res) {
    const validTask = validateTask(req.body)
    if (validTask.error) {
      return res.status(400).json({ error: JSON.parse(validTask.error.message) })
    }
    const results = await TasksModel.create(Object.values(validTask.data))
    if (results.error) {
      return res.status(409).json(results)
    }
    res.status(200).json(results)
  }

  static async delete (req, res) {
    const { id } = req.params
    console.log(id)
    const results = await TasksModel.delete(id)
    if (results.error) {
      return res.status(500).json(results)
    }
    res.status(200).json(results)
  }
}
