import { validateUser, validateUserLogin } from '../schemas/userSh.js'
import { UsersModel } from '../model/usersMySQL.js'
import bcrypt from 'bcrypt'

export class UsersController {
  static async register (req, res) {
    const validUser = validateUser(req.body)
    if (validUser.error) {
      return res.status(400).json({ error: JSON.parse(validUser.error.message) })
    }
    const hashedPassword = await bcrypt.hash(validUser.data.password, parseInt(process.env.SALT_ROUNDS))
    validUser.data.password = hashedPassword
    const results = await UsersModel.insertUser(Object.values(validUser.data))
    if (results.errno) {
      return res.status(409).json(results)
    }
    res.status(201).json(results)
  }

  static async login (req, res) {
    const validUser = validateUserLogin(req.body)
    if (validUser.error) {
      return res.status(400).json({ error: JSON.parse(validUser.error.message) })
    }
    const user = await UsersModel.findUser(validUser.data)
    if (user.error) {
      return res.status(404).json(user)
    }
    const match = await bcrypt.compare(validUser.data.password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'Invalid password' })
    }
    res.status(200).json(user.id)
  }

  static async logout (req, res) {

  }
}
