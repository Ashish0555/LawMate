const db = require("../config/db");

// POST /api/messages/send
exports.sendMessage = async (req, res) => {
  try {
    const { question_id, sender_id, content } = req.body;

    const query = `
      INSERT INTO messages (question_id, sender_id, content)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await db.query(query, [
      question_id,
      sender_id,
      content,
    ]);

    const message = result.rows[0];

    // 🔥 Emit to socket room
    const io = req.app.get("io");
    io.to(question_id).emit("receive_message", message);

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/messages/:question_id
exports.getMessages = async (req, res) => {
  try {
    const { question_id } = req.params;

    const query = `
      SELECT * FROM messages
      WHERE question_id = $1
      ORDER BY sent_at ASC;
    `;

    const result = await db.query(query, [question_id]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};