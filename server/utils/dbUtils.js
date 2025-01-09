import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

export async function checkConnection () {
  try {
    const connection = await pool.getConnection()
    await connection.ping()
    connection.release()
  } catch (err) {
    throw new Error('Database connection failed: ' + err.message)
  }
}

export { pool }
