const db = require("../config/db");
const {
  LAWBOT_EMAIL,
  LAWBOT_STATUS,
  emitLawBotStatus,
  getParticipantType,
  getUserById,
  hasHumanLawyerJoined,
  maybeReplyAsLawBot,
} = require("../services/lawBotService");

async function getMessageWithSenderDetails(messageId) {
  const result = await db.query(
    `
      SELECT
        m.*,
        u.email AS sender_email,
        u.role AS sender_role,
        CASE
          WHEN u.email = $2 THEN 'lawbot'
          WHEN u.role = 'lawyer' THEN 'human_lawyer'
          ELSE 'client'
        END AS sender_type
      FROM messages m
      LEFT JOIN users u ON u.id = m.sender_id
      WHERE m.id = $1;
    `,
    [messageId, LAWBOT_EMAIL]
  );

  return result.rows[0] || null;
}

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

    const message = await getMessageWithSenderDetails(result.rows[0].id);

    // 🔥 Emit to socket room
    const io = req.app.get("io");
    io.to(question_id).emit("receive_message", message);

    const sender = await getUserById(sender_id);
    const senderType = getParticipantType(sender);

    if (senderType === "human_lawyer") {
      emitLawBotStatus(io, question_id, LAWBOT_STATUS.HUMAN_LAWYER_JOINED);
      return res.json(message);
    }

    if (await hasHumanLawyerJoined(question_id)) {
      emitLawBotStatus(io, question_id, LAWBOT_STATUS.HUMAN_LAWYER_JOINED);
    }

    maybeReplyAsLawBot({
      io,
      questionId: question_id,
      senderId: sender_id,
      latestUserMessage: content,
    }).catch((error) => {
      console.error("LawBot reply failed:", error.message);
    });

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
      SELECT
        m.*,
        u.email AS sender_email,
        u.role AS sender_role,
        CASE
          WHEN u.email = $2 THEN 'lawbot'
          WHEN u.role = 'lawyer' THEN 'human_lawyer'
          ELSE 'client'
        END AS sender_type
      FROM messages m
      LEFT JOIN users u ON u.id = m.sender_id
      WHERE question_id = $1
      ORDER BY sent_at ASC;
    `;

    const result = await db.query(query, [question_id, LAWBOT_EMAIL]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
