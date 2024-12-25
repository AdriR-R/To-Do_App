import { validateUser, validateUserLogin } from '../schemas/userSh.js'
import { UsersModel } from '../model/usersMySQL.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 100 * 60 * 60
    }).json({
      id: user.id,
      username: user.username
    })
  }

  static async logout (req, res) {

  }
}
