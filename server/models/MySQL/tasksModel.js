import { pool, checkConnection } from '../../utils/dbUtils.js'
export class TasksModel {
  static async getAll ({ status }) {
    await checkConnection()
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

  static async create (fields, values) {
    await checkConnection()
    const query = `
  INSERT INTO tasks(${fields.join(', ')}) VALUES(${fields.map(field => (field === 'user_id' ? 'UUID_TO_BIN(?)' : '?')).join(', ')})`
    console.log(query)
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
    await checkConnection()
    const query = 'DELETE FROM tasks WHERE id = UUID_TO_BIN(?)'
    try {
      const connection = await pool.getConnection()
      const [result] = await connection.execute(query, [id])
      if (result.affectedRows === 0) {
        throw new Error('id not found')
      }
      connection.release()
      return { result }
    } catch (err) {
      return { error: err.message }
    }
  }
}
