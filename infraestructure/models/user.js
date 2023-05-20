
// models/user.js

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const userSchema = {
  email: { type: 'text', required: true },
  password: { type: 'text', required: true },
  // otros campos del modelo de usuario
};

async function createUser(user) {
  const client = await pool.connect();
  try {
    const { email, password } = user;
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const values = [email, password];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
}

module.exports = { createUser };

