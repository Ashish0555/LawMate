"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Send } from "lucide-react";

export default function ChatPage() {
  const { id } = useParams();

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Init socket
  useEffect(() => {
    socketRef.current = io("http://localhost:5001");

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Join room
  useEffect(() => {
    if (!id || !socketRef.current) return;
    socketRef.current.emit("join_room", id);
  }, [id]);

  // Fetch old messages
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5001/api/messages/${id}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [id]);

  // Listen for new messages
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current?.off("receive_message");
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    await fetch("http://localhost:5001/api/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question_id: id,
        sender_id: "123e4567-e89b-12d3-a456-426614174000",
        content: newMessage,
      }),
    });

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn
        userName="John Doe"
        userRole="client"
        onMenuToggle={(open) => setSidebarCollapsed(!open)}
      />

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar
          userRole="client"
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={setSidebarCollapsed}
        />

        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border bg-card">
            <h2 className="text-lg font-bold">Chat Room: {id}</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.content}
                isOwn={
                  msg.sender_id ===
                  "123e4567-e89b-12d3-a456-426614174000"
                }
                timestamp={
                  msg.sent_at
                    ? new Date(msg.sent_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="gap-2">
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}