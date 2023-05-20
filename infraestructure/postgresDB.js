require('dotenv').config();
const { Pool } = require('pg');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: 5432,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

exports.initPoolDB = () => {
  exports.DBConnection = pool;
};

exports.endPoolDB = () => {
  pool.end();
};
