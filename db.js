require('dotenv').config({ path: '/Users/emmamendez/.env' }); // Load environment variables from .env
const { Pool } = require('pg');

// PostgreSQL configuration using environment variables
const pool = new Pool({
  user: process.env.POSTGRES_USER || process.env.PG_USER,
  host: process.env.POSTGRES_HOST || process.env.PG_HOST,
  database: process.env.POSTGRES_DB || process.env.PG_DATABASE,
  password: process.env.POSTGRES_PASSWORD || process.env.PG_PASSWORD,
  port: process.env.POSTGRES_PORT || process.env.PG_PORT || 5432, // Default to 5432 if not set
});

// Test the connection
pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL');
    client.release(); // Release the client back to the pool
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.stack);
  });

module.exports = pool;
