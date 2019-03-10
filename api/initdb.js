const { Client } = require('pg');
const client = new Client({
  user: process.env.POSTGRES_DB_USER,
  host: process.env.POSTGRES_DB_HOST,
  database: process.env.POSTGRES_DB_DATABASE,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: process.env.POSTGRES_DB_PORT,
});

const createCustomersSchema = async () => {
  try {
    await client.connect();
    console.log(`Connected to Db, attempting to create schema [ ${process.env.POSTGRES_DB_SCHEMA} ] if not found`);
    await client.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.POSTGRES_DB_SCHEMA}`, []);
    await client.end();
    console.log(`Created schema [ ${process.env.POSTGRES_DB_SCHEMA} ] if not found`);
  } catch (err) {
    console.error(`Failed to connect to Db and/or create schema ${process.env.POSTGRES_DB_SCHEMA}: ${err.stack}`);
  }
};

createCustomersSchema();
