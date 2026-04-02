const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DEMO_CLIENT_EMAIL = "demo-client@legalconsult.local";
const DEMO_CLIENT_PASSWORD = "demo-client-password";

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (email, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING id, email, role;
    `;

    const result = await db.query(query, [email, hashedPassword, role || "client"]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
};

// DEMO CLIENT
exports.getOrCreateDemoClient = async (req, res) => {
  try {
    const existingUser = await db.query(
      "SELECT id, email, role FROM users WHERE email = $1",
      [DEMO_CLIENT_EMAIL]
    );

    let user = existingUser.rows[0];

    if (!user) {
      const hashedPassword = await bcrypt.hash(DEMO_CLIENT_PASSWORD, 10);
      const insertedUser = await db.query(
        `
          INSERT INTO users (email, password_hash, role)
          VALUES ($1, $2, $3)
          RETURNING id, email, role;
        `,
        [DEMO_CLIENT_EMAIL, hashedPassword, "client"]
      );

      user = insertedUser.rows[0];
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secret123",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to prepare demo client" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secret123", // later move to .env
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};
