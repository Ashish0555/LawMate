# Legal Consultation Backend (Phase 1-2)

This backend uses Node.js, Express.js, and PostgreSQL (`pg`) with a clean modular structure.

## Folder Structure

```text
src/
  controllers/
  routes/
  services/
  middleware/
  config/
  utils/
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update `DATABASE_URL` in `.env` with your PostgreSQL/Supabase connection string.

4. Start server:

```bash
npm start
```

## Sample APIs (Phase 1-2)

- `GET /api` -> basic API live check
- `GET /health` -> health + database connectivity check
