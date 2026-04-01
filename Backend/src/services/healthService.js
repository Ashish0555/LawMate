const { query } = require("../config/db");

async function getDatabaseTime() {
  const result = await query("SELECT NOW() AS db_time");
  return result.rows[0].db_time;
}

module.exports = {
  getDatabaseTime,
};
