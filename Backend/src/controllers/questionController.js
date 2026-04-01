const db = require("../config/db");

// POST /api/questions/ask
exports.askQuestion = async (req, res) => {
  try {
    const { user_id, question } = req.body;

    if (!user_id || !question) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const query = `
      INSERT INTO quick_questions (user_id, question)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const values = [user_id, question];

    const result = await db.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};