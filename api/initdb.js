const { Client } = require('pg');
const client = new Client({
  user: process.env.POSTGRES_DB_USER,
  host: process.env.POSTGRES_DB_HOST,
  database: process.env.POSTGRES_DB_DATABASE,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: process.env.POSTGRES_DB_PORT,
});
client.connect();
client.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.POSTGRES_DB_SCHEMA}`, (err, res) => {
  if (err) console.error(`Failed to create schema [ ${process.env.POSTGRES_DB_SCHEMA} ] in db: ${err.stack}`);
  else console.log(`Created schema [ ${process.env.POSTGRES_DB_SCHEMA} ] if not found`);
  client.end();
});
