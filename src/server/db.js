const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",          // Your PostgreSQL username
    password: "test123",       // Your PostgreSQL password
    host: "localhost",         // Host where PostgreSQL is running
    port: 5432,                // PostgreSQL default port
    database: "limesurvey"           // Correct database name
});

module.exports = pool;
