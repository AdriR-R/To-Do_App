import { pool, checkConnection } from '../../utils/dbUtils.js'
export class UsersModel {
  static async insertUser (values) {
    await checkConnection()
    const query = 'INSERT INTO users(username, email, password) VALUES(?, ?, ?)'
    try {
      const connection = await pool.getConnection()
      const [result] = await connection.execute(query, values)
      connection.release()
      return { result }
    } catch (err) {
      return { error: err.message }
    }
  }

  static async findUser (values) {
    await checkConnection()
    const identifier = values.email
    const query = 'SELECT BIN_TO_UUID(id) AS id, username, password FROM users WHERE email = ?'
    try {
      const connection = await pool.getConnection()
      const [rows] = await connection.execute(query, [identifier])
      if (rows[0] === undefined) {
        throw new Error('User not found')
      }
      connection.release()
      return rows[0]
    } catch (err) {
      console.log(err.message)
      return { error: err.message }
    }
  }

  static async logout () {

  }
}
