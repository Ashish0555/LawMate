const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing in environment variables");
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // ALWAYS required for Supabase
  },
});

async function query(text, params = []) {
  const result = await pool.query(text, params);
  return result;
}

async function testDbConnection() {
  await query("SELECT 1");
  console.log("PostgreSQL connected ✅");
}

module.exports = {
  pool,
  query,
  testDbConnection,
};