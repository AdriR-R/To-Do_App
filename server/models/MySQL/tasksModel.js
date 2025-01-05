import mysql from 'mysql2/promise'
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})
export class TasksModel {
  static async getAll ({ status }) {
    const query = 'SELECT title, description, due_date, status, created_at FROM tasks WHERE status = ?'
    try {
      const connection = await pool.getConnection()
      if (!status) {
        const [rows] = await connection.query('SELECT title, description, due_date, status, created_at FROM tasks')
        connection.release()
        return rows
      }
      const [rows] = await connection.execute(query, [status])
      connection.release()
      return rows
    } catch (err) {
      console.log(err.message)
      return { error: err.message }
    }
  }

  static async create (values) {
    const query = 'INSERT INTO tasks(user_id, title, description, due_date) VALUES(UUID_TO_BIN(?), ?, ?, ?)'
    try {
      const connection = await pool.getConnection()
      const [result] = await connection.execute(query, values)
      connection.release()
      return { result }
    } catch (err) {
      return { error: err.message }
    }
  }

  static async delete (id) {
    const query = 'DELETE FROM tasks WHERE id = UUID_TO_BIN(?)'
    try {
      const connection = await pool.getConnection()
      const [result] = await connection.execute(query, [id])
      connection.release()
      return { result }
    } catch (err) {
      return { error: err.message }
    }
  }
}
