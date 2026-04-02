# LawMate

**LawMate is a full-stack legal consultation platform that helps users get quick, structured legal guidance through a modern real-time chat experience**. It combines a premium Next.js frontend with an Express, PostgreSQL, and Socket.io backend to support live conversations, consultation threads, and dashboard workflows for both clients and lawyers. **The platform also includes LawBot, a context-aware AI legal intake assistant that remembers recent conversation history, asks follow-up questions, and steps back automatically when a human lawyer joins**. Includes **JWT-based authentication** on the backend. Designed to feel like a real startup product, LawMate is built to be demo-ready, interview-worthy, and extensible for production use.

- `Frontend/`: Next.js 16 + React 19 + Tailwind CSS 4 + Socket.io client
- `Backend/`: Node.js + Express + PostgreSQL + Socket.io

It includes:

- a premium SaaS-style landing page
- real-time chat between client and lawyer
- client and lawyer dashboards
- a DB-backed demo user flow for local testing
- LawBot, a context-aware legal intake assistant with structured replies and handoff logic

## Highlights

- Real-time legal consultation chat powered by Socket.io
- PostgreSQL-backed users, questions, and messages
- LawBot remembers the last 5 messages for context
- Rule + AI intent detection for:
  - `divorce`
  - `property`
  - `criminal`
  - `employment`
- Structured LawBot replies:
  - short explanation
  - possible actions
  - suggested next step
  - one follow-up question
- Human-lawyer handoff:
  - LawBot assists during intake
  - once a real lawyer joins the thread, LawBot steps back

## Project Structure

```text
laws/
├── Frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── public/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── .env.example
└── README.md
```

## Tech Stack

### Frontend

- Next.js `16.2.0`
- React `19`
- Tailwind CSS `4`
- Radix UI
- Socket.io client

### Backend

- Node.js
- Express
- PostgreSQL (`pg`)
- Socket.io
- bcrypt
- JSON Web Token

## Requirements

- Node.js `20.9+` recommended for the frontend
- npm
- PostgreSQL or a hosted Postgres/Supabase instance

## Local Setup

### 1. Clone and install

```bash
cd /path/to/laws
cd Frontend && npm install
cd ../Backend && npm install
```

### 2. Configure backend environment

Create a backend env file:

```bash
cd Backend
cp .env.example .env
```

Set the values in `Backend/.env`:

```env
PORT=5001
NODE_ENV=development
DATABASE_URL=postgresql://...
LAWBOT_ENABLED=true
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Notes:

- `OPENAI_API_KEY` is optional.
- If no OpenAI key is provided, LawBot still works using a safe rule-based fallback.
- `DATABASE_URL` must point to a working PostgreSQL database with the required tables.

### 3. Run the backend

```bash
cd Backend
npm run dev
```

Backend runs on:

- `http://localhost:5001`

### 4. Run the frontend

In another terminal:

```bash
cd Frontend
npm run dev
```

Frontend runs on:

- `http://localhost:3000`

## API Overview

### Health and root

- `GET /` -> backend root status
- `GET /api` -> API live check
- `GET /health` -> health + database check

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/demo-client`

`/api/auth/demo-client` creates or reuses a local demo client so the app can be tested quickly without a full auth flow.

### Questions

- `POST /api/questions/ask`

Creates a quick legal consultation thread.

### Messages

- `POST /api/messages/send`
- `GET /api/messages/:question_id`

`POST /api/messages/send` does two things:

1. Saves and emits the client message immediately
2. Triggers LawBot asynchronously if the thread is still in AI-assist mode

## Socket Events

### Client joins room

- `join_room`

### Message stream

- `receive_message`

### LawBot UX events

- `lawbot_typing`
- `lawbot_status`

`lawbot_status` can indicate:

- `lawbot_active`
- `human_lawyer_joined`
- `lawbot_disabled`

## LawBot

LawBot lives in:

- [Backend/src/services/lawBotService.js](Backend/src/services/lawBotService.js)

Current behavior:

- fetches the last 5 messages from the current chat thread
- detects likely legal category using keyword rules
- optionally calls OpenAI Responses API with structured output
- returns concise, professional, non-final legal guidance
- asks one follow-up question
- delays 1 to 2 seconds before replying for a natural chat feel
- stops auto-replying after a real lawyer joins the thread

### LawBot response shape

LawBot is designed to answer like this:

```text
Short explanation

Possible actions:
1. ...
2. ...
3. ...

Suggested next step: ...

Follow-up question?
```

## Frontend Routes

Main routes currently available:

- `/`
- `/booking`
- `/chat/[id]`
- `/client/dashboard`
- `/lawyer/dashboard`
- `/lawyer-profile/[id]`

## Build

### Frontend production build

```bash
cd Frontend
npm run build
```

### Backend

The backend currently runs with:

```bash
cd Backend
npm run start
```

## Current Notes

- Frontend and backend are separate apps and should be run in parallel during development.
- The chat UI is optimized for both desktop and mobile.
- LawBot is an intake assistant, not a replacement for a human lawyer.
- Once a human lawyer sends a message in a thread, the UI switches from AI-assist mode to human-lawyer mode.

## Recommended Next Steps

- add DB migrations/schema docs
- add authentication/session persistence on the frontend
- add lawyer assignment workflow
- add message attachments and document upload
- add automated tests for LawBot handoff behavior

## License

This project currently has no explicit license configured.
