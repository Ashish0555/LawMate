# ⚖️ LawMate – Real-time Legal Consultation Platform

LawMate is a full-stack web application that enables users to ask quick legal questions (₹49 flow) and connect with legal advisors through real-time chat.

---

## 🚀 Features

- 💬 Real-time chat using Socket.io
- 🔐 JWT-based authentication (Login / Signup)
- ⚡ “Ask a Lawyer for ₹49” instant query flow
- 🧠 Role-based system (Client / Advisor / Lawyer)
- 📦 PostgreSQL database (Supabase)
- 🎯 Dynamic chat rooms (/chat/[id])
- ⏳ Simulated payment flow (MVP)

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- ShadCN UI

### Backend
- Node.js + Express
- PostgreSQL (Supabase)
- Socket.io
- JWT + bcrypt

---

## 📂 Project Structure

frontend/
  ├── app/
  │   ├── page.tsx
  │   ├── chat/[id]/page.tsx
  │   ├── client/dashboard
  │   ├── lawyer/dashboard
  ├── components/
  ├── hooks/

backend/
  ├── src/
  │   ├── controllers/
  │   ├── routes/
  │   ├── config/
  │   ├── middleware/

---

## ⚡ How It Works

1. User clicks “Ask a Lawyer for ₹49”
2. Simulated payment flow starts
3. Backend creates a question
4. User is redirected to /chat/{question_id}
5. Real-time chat begins

---

## 🧪 Running Locally

### Clone repository
git clone https://github.com/your-username/lawmate.git
cd lawmate

---

### Backend setup
cd backend
npm install

Create .env file:
DATABASE_URL=your_supabase_url
PORT=5001
JWT_SECRET=your_secret

Run backend:
npm run dev

---

### Frontend setup
cd frontend
npm install
npm run dev

Open in browser:
http://localhost:3000

---

## 💡 Highlights

- Built a real-time full-stack system (not a static project)
- Designed product-level user flow (landing → chat)
- Implemented event-driven architecture with WebSockets
- Clean and scalable backend structure

---

## 🚀 Future Improvements

- 💰 Real Razorpay payment integration
- 📹 Video consultation (WebRTC)
- 🔔 Notifications (Email/SMS)
- ⭐ Rating & review system

---

## 👨‍💻 Author

Ashish Meena  
B.Tech CSE – IIT (ISM) Dhanbad

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!