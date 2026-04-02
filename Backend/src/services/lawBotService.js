const bcrypt = require("bcrypt");
const db = require("../config/db");

const LAWBOT_EMAIL = "lawbot@lawmate.local";
const LAWBOT_PASSWORD = "lawbot-secure-password";
const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const LAWBOT_ENABLED = process.env.LAWBOT_ENABLED !== "false";
const LAWBOT_STATUS = {
  ACTIVE: "lawbot_active",
  HUMAN_LAWYER_JOINED: "human_lawyer_joined",
  DISABLED: "lawbot_disabled",
};

const INTENT_PATTERNS = {
  divorce: [
    /\bdivorce\b/i,
    /\bseparation\b/i,
    /\balimony\b/i,
    /\bcustody\b/i,
    /\bmaintenance\b/i,
    /\bmarriage\b/i,
  ],
  property: [
    /\bproperty\b/i,
    /\bland\b/i,
    /\bflat\b/i,
    /\bhouse\b/i,
    /\bownership\b/i,
    /\bregistry\b/i,
    /\bencroachment\b/i,
    /\btenant\b/i,
    /\brental\b/i,
    /\blease\b/i,
  ],
  criminal: [
    /\bpolice\b/i,
    /\bfir\b/i,
    /\barrest\b/i,
    /\bcrime\b/i,
    /\bcriminal\b/i,
    /\bbail\b/i,
    /\bthreat\b/i,
    /\bassault\b/i,
    /\bfraud\b/i,
  ],
  employment: [
    /\bjob\b/i,
    /\bemployment\b/i,
    /\bsalary\b/i,
    /\btermination\b/i,
    /\bresign/i,
    /\bnotice period\b/i,
    /\bworkplace\b/i,
    /\bhr\b/i,
    /\boffer letter\b/i,
    /\bcontract\b/i,
  ],
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractOutputText(responsePayload) {
  if (typeof responsePayload?.output_text === "string" && responsePayload.output_text) {
    return responsePayload.output_text;
  }

  const parts = [];

  for (const item of responsePayload?.output || []) {
    if (item.type !== "message" || !Array.isArray(item.content)) {
      continue;
    }

    for (const contentPart of item.content) {
      if (typeof contentPart.text === "string") {
        parts.push(contentPart.text);
      }
    }
  }

  return parts.join("\n").trim();
}

async function getOrCreateLawBotUser() {
  const existingUser = await db.query(
    "SELECT id, email, role FROM users WHERE email = $1",
    [LAWBOT_EMAIL]
  );

  if (existingUser.rows[0]) {
    return existingUser.rows[0];
  }

  const hashedPassword = await bcrypt.hash(LAWBOT_PASSWORD, 10);
  const insertedUser = await db.query(
    `
      INSERT INTO users (email, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING id, email, role;
    `,
    [LAWBOT_EMAIL, hashedPassword, "lawyer"]
  );

  return insertedUser.rows[0];
}

async function getUserById(userId) {
  const result = await db.query(
    "SELECT id, email, role FROM users WHERE id = $1",
    [userId]
  );

  return result.rows[0] || null;
}

function getParticipantType(user) {
  if (!user) {
    return "unknown";
  }

  if (user.email === LAWBOT_EMAIL) {
    return "lawbot";
  }

  if (user.role === "lawyer") {
    return "human_lawyer";
  }

  return "client";
}

async function getRecentConversationContext(questionId, limit = 5) {
  const result = await db.query(
    `
      SELECT
        m.id,
        m.sender_id,
        m.content,
        m.sent_at,
        u.email,
        u.role
      FROM messages m
      LEFT JOIN users u ON u.id = m.sender_id
      WHERE m.question_id = $1
      ORDER BY m.sent_at DESC
      LIMIT $2;
    `,
    [questionId, limit]
  );

  return result.rows.reverse();
}

async function hasHumanLawyerJoined(questionId) {
  const result = await db.query(
    `
      SELECT 1
      FROM messages m
      INNER JOIN users u ON u.id = m.sender_id
      WHERE m.question_id = $1
        AND u.role = 'lawyer'
        AND u.email <> $2
      LIMIT 1;
    `,
    [questionId, LAWBOT_EMAIL]
  );

  return result.rowCount > 0;
}

function emitLawBotStatus(io, questionId, status) {
  io.to(questionId).emit("lawbot_status", {
    question_id: questionId,
    status,
  });
}

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

function detectIntentRuleBased(message) {
  const scores = Object.entries(INTENT_PATTERNS).map(([intent, patterns]) => {
    const matches = patterns.reduce(
      (count, pattern) => count + (pattern.test(message) ? 1 : 0),
      0
    );

    return { intent, matches };
  });

  scores.sort((a, b) => b.matches - a.matches);

  const topMatch = scores[0];

  if (!topMatch || topMatch.matches === 0) {
    return {
      intent: "general",
      confidence: 0.35,
      matchedKeywords: [],
    };
  }

  return {
    intent: topMatch.intent,
    confidence: Math.min(0.45 + topMatch.matches * 0.15, 0.85),
    matchedKeywords: INTENT_PATTERNS[topMatch.intent]
      .filter((pattern) => pattern.test(message))
      .map((pattern) => pattern.source),
  };
}

function formatStructuredReply(reply) {
  const lines = [reply.short_explanation];

  if (Array.isArray(reply.possible_actions) && reply.possible_actions.length > 0) {
    lines.push("", "Possible actions:");
    reply.possible_actions.slice(0, 3).forEach((action, index) => {
      lines.push(`${index + 1}. ${action}`);
    });
  }

  lines.push("", `Suggested next step: ${reply.suggested_next_step}`);
  lines.push("", reply.follow_up_question);

  if (reply.cautious_note) {
    lines.push("", reply.cautious_note);
  }

  return lines.join("\n");
}

function buildFallbackReply({ intent, confidence, latestUserMessage }) {
  const fallbackByIntent = {
    divorce: {
      short_explanation:
        "This sounds like a family law issue, and the right steps usually depend on documents, timelines, and whether there are children or shared assets involved.",
      possible_actions: [
        "Collect marriage, separation, and any financial support documents.",
        "Write down key dates such as separation, notices, or court communications.",
        "Check whether custody, maintenance, or property division is part of the dispute.",
      ],
      suggested_next_step:
        "Prepare a short timeline of events so a divorce lawyer can review the situation quickly.",
      follow_up_question:
        "Is this mainly about divorce, child custody, or maintenance/alimony?",
    },
    property: {
      short_explanation:
        "This appears to be a property matter, and the next step often depends on ownership papers, possession, and whether the dispute is with family, a buyer, or a tenant.",
      possible_actions: [
        "Gather title, registry, tax, rent, or possession documents.",
        "Write down who currently has possession and what disagreement has started.",
        "Check whether there are notices, police complaints, or civil filings already.",
      ],
      suggested_next_step:
        "Organize the key property documents before taking legal action.",
      follow_up_question:
        "Is the dispute about ownership, possession, or a tenant/rent issue?",
    },
    criminal: {
      short_explanation:
        "This may involve a criminal law issue, so facts, urgency, and any police action already taken matter a lot.",
      possible_actions: [
        "Note the exact incident date, location, and people involved.",
        "Keep any FIR, notice, complaint copy, or message evidence ready.",
        "Avoid making admissions before speaking with a lawyer if the matter is serious.",
      ],
      suggested_next_step:
        "Prepare the exact sequence of events and any police paperwork you have.",
      follow_up_question:
        "Has an FIR or police complaint already been filed in this matter?",
    },
    employment: {
      short_explanation:
        "This looks like an employment issue, and the legal position usually depends on your contract terms, company communication, and what action the employer has taken.",
      possible_actions: [
        "Collect your offer letter, contract, salary records, and email or HR communication.",
        "Write down the action taken by the employer and when it happened.",
        "Check whether notice period, unpaid salary, or termination terms are involved.",
      ],
      suggested_next_step:
        "Gather the employment documents and summarize what the employer has communicated.",
      follow_up_question:
        "Is the main issue termination, unpaid salary, notice period, or workplace harassment?",
    },
    general: {
      short_explanation:
        "I can help you think through the issue, but I need a little more detail before I can give a more specific legal direction.",
      possible_actions: [
        "Summarize what happened in 2 to 3 sentences.",
        "Mention any notices, contracts, police complaints, or court papers involved.",
        "Share what outcome you are trying to achieve.",
      ],
      suggested_next_step:
        "Give a short timeline so the issue can be categorized correctly.",
      follow_up_question:
        "Which area best fits your issue: property, divorce/family, criminal, employment, or something else?",
    },
  };

  const fallback = fallbackByIntent[intent] || fallbackByIntent.general;

  return {
    intent,
    confidence,
    ...fallback,
    cautious_note:
      confidence < 0.55
        ? "I may be missing some legal context, so it would be safest to confirm the details with a lawyer before taking action."
        : "If the facts are urgent or documents are already filed, a lawyer should review them before you act.",
    source: latestUserMessage,
  };
}

async function generateOpenAIStructuredReply({
  latestUserMessage,
  conversationHistory,
  ruleBasedIntent,
}) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const systemPrompt = [
    "You are LawBot, a helpful legal intake assistant inside a legal consultation platform.",
    "Use simple, professional language.",
    "Do not claim to be a lawyer or give definitive legal conclusions.",
    "You must respond in JSON only.",
    "Your job is to: identify likely legal category, give a short explanation, list possible actions, suggest one next step, and ask exactly one follow-up question.",
    "Use the recent conversation context to stay consistent with the user's issue.",
    "If the situation is unclear, be cautious and recommend consulting a lawyer.",
  ].join(" ");

  const input = [
    { role: "system", content: systemPrompt },
    ...conversationHistory.map((message) => ({
      role:
        message.role === "lawyer" || message.email === LAWBOT_EMAIL
          ? "assistant"
          : "user",
      content: message.content,
    })),
    {
      role: "user",
      content: [
        `Latest user message: ${latestUserMessage}`,
        `Rule-based intent hint: ${ruleBasedIntent.intent}`,
        `Rule-based confidence hint: ${ruleBasedIntent.confidence}`,
        "Return one concise JSON object matching the schema.",
      ].join("\n"),
    },
  ];

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input,
      text: {
        format: {
          type: "json_schema",
          name: "lawbot_response",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              intent: {
                type: "string",
                enum: ["divorce", "property", "criminal", "employment", "general"],
              },
              confidence: {
                type: "number",
                minimum: 0,
                maximum: 1,
              },
              short_explanation: {
                type: "string",
              },
              possible_actions: {
                type: "array",
                items: { type: "string" },
                minItems: 2,
                maxItems: 3,
              },
              suggested_next_step: {
                type: "string",
              },
              follow_up_question: {
                type: "string",
              },
              cautious_note: {
                type: "string",
              },
            },
            required: [
              "intent",
              "confidence",
              "short_explanation",
              "possible_actions",
              "suggested_next_step",
              "follow_up_question",
              "cautious_note",
            ],
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorBody}`);
  }

  const payload = await response.json();
  const outputText = extractOutputText(payload);

  if (!outputText) {
    throw new Error("OpenAI response did not include output text");
  }

  return JSON.parse(outputText);
}

async function buildLawBotReply({ questionId, latestUserMessage }) {
  const contextMessages = await getRecentConversationContext(questionId, 5);
  const ruleBasedIntent = detectIntentRuleBased(latestUserMessage);

  try {
    const aiReply = await generateOpenAIStructuredReply({
      latestUserMessage,
      conversationHistory: contextMessages,
      ruleBasedIntent,
    });

    if (!aiReply) {
      return buildFallbackReply({
        intent: ruleBasedIntent.intent,
        confidence: ruleBasedIntent.confidence,
        latestUserMessage,
      });
    }

    return {
      ...aiReply,
      confidence:
        typeof aiReply.confidence === "number"
          ? aiReply.confidence
          : ruleBasedIntent.confidence,
      intent: aiReply.intent || ruleBasedIntent.intent,
    };
  } catch (error) {
    console.error("LawBot AI generation failed:", error.message);

    return buildFallbackReply({
      intent: ruleBasedIntent.intent,
      confidence: ruleBasedIntent.confidence,
      latestUserMessage,
    });
  }
}

async function maybeReplyAsLawBot({
  io,
  questionId,
  senderId,
  latestUserMessage,
}) {
  if (!LAWBOT_ENABLED) {
    emitLawBotStatus(io, questionId, LAWBOT_STATUS.DISABLED);
    return;
  }

  const lawBotUser = await getOrCreateLawBotUser();

  if (senderId === lawBotUser.id) {
    return;
  }

  const sender = await getUserById(senderId);
  const senderType = getParticipantType(sender);

  if (senderType === "human_lawyer") {
    emitLawBotStatus(io, questionId, LAWBOT_STATUS.HUMAN_LAWYER_JOINED);
    return;
  }

  if (!sender || senderType !== "client") {
    return;
  }

  if (await hasHumanLawyerJoined(questionId)) {
    emitLawBotStatus(io, questionId, LAWBOT_STATUS.HUMAN_LAWYER_JOINED);
    return;
  }

  emitLawBotStatus(io, questionId, LAWBOT_STATUS.ACTIVE);

  io.to(questionId).emit("lawbot_typing", {
    question_id: questionId,
    isTyping: true,
  });

  try {
    await sleep(1000 + Math.floor(Math.random() * 1000));

    if (await hasHumanLawyerJoined(questionId)) {
      emitLawBotStatus(io, questionId, LAWBOT_STATUS.HUMAN_LAWYER_JOINED);
      return;
    }

    const structuredReply = await buildLawBotReply({
      questionId,
      latestUserMessage,
    });

    const botMessageResult = await db.query(
      `
        INSERT INTO messages (question_id, sender_id, content)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      [questionId, lawBotUser.id, formatStructuredReply(structuredReply)]
    );

    const botMessage = await getMessageWithSenderDetails(botMessageResult.rows[0].id);

    io.to(questionId).emit("receive_message", botMessage);
  } finally {
    io.to(questionId).emit("lawbot_typing", {
      question_id: questionId,
      isTyping: false,
    });
  }
}

module.exports = {
  LAWBOT_EMAIL,
  LAWBOT_STATUS,
  buildLawBotReply,
  detectIntentRuleBased,
  emitLawBotStatus,
  formatStructuredReply,
  getMessageWithSenderDetails,
  getParticipantType,
  getOrCreateLawBotUser,
  getRecentConversationContext,
  getUserById,
  hasHumanLawyerJoined,
  maybeReplyAsLawBot,
};
