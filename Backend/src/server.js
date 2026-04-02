require("dotenv").config();

const http = require("http");
const app = require("./app");
const { testDbConnection } = require("./config/db");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5001;

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

// Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (questionId) => {
    socket.join(questionId);
  });

  socket.on("send_message", (data) => {
    socket.to(data.question_id).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
async function startServer() {
  try {
    await testDbConnection();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
}

startServer();
