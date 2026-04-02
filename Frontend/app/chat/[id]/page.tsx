'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { Bot, Phone, Search, Send } from 'lucide-react';

import { ChatMessage } from '@/components/ChatMessage';
import { ChatTypingIndicator } from '@/components/ChatTypingIndicator';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { API_BASE_URL, DemoUser, getOrCreateDemoClient } from '@/lib/api';

type Message = {
  id: string;
  question_id: string;
  sender_id: string;
  content: string;
  sent_at?: string;
  sender_email?: string;
  sender_role?: string;
  sender_type?: 'client' | 'lawbot' | 'human_lawyer';
};

type AssistantMode = 'lawbot' | 'human_lawyer';

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [assistantMode, setAssistantMode] = useState<AssistantMode>('lawbot');
  const [error, setError] = useState('');

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const introStats = useMemo(
    () => [
      { label: 'Status', value: 'Live consultation' },
      { label: 'Security', value: 'Encrypted' },
      { label: 'Response SLA', value: 'Under 10 min' },
    ],
    [],
  );

  useEffect(() => {
    socketRef.current = io(API_BASE_URL);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    getOrCreateDemoClient()
      .then((user) => setCurrentUser(user))
      .catch((err) => {
        console.error(err);
        setError("We couldn't initialize the demo client.");
      });
  }, []);

  useEffect(() => {
    if (!id || !socketRef.current) return;
    socketRef.current.emit('join_room', id);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    setLoadingMessages(true);
    fetch(`${API_BASE_URL}/api/messages/${id}`)
      .then((response) => response.json())
      .then((data: Message[]) => {
        setMessages(data);
        setAssistantMode(
          data.some((message) => message.sender_type === 'human_lawyer')
            ? 'human_lawyer'
            : 'lawbot',
        );
      })
      .catch((err) => {
        console.error(err);
        setError("We couldn't load the conversation.");
      })
      .finally(() => setLoadingMessages(false));
  }, [id]);

  useEffect(() => {
    if (!socketRef.current) return;

    const handleIncomingMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);

      if (data.sender_type === 'human_lawyer') {
        setAssistantMode('human_lawyer');
      }

      if (data.sender_id !== currentUser?.id) {
        setShowTyping(false);
      }
    };

    const handleLawBotTyping = (payload: { isTyping?: boolean }) => {
      setShowTyping(Boolean(payload?.isTyping));
    };

    const handleLawBotStatus = (payload: { status?: string }) => {
      if (payload?.status === 'human_lawyer_joined') {
        setAssistantMode('human_lawyer');
        setShowTyping(false);
        return;
      }

      if (payload?.status === 'lawbot_active') {
        setAssistantMode('lawbot');
      }
    };

    socketRef.current.on('receive_message', handleIncomingMessage);
    socketRef.current.on('lawbot_typing', handleLawBotTyping);
    socketRef.current.on('lawbot_status', handleLawBotStatus);

    return () => {
      socketRef.current?.off('receive_message', handleIncomingMessage);
      socketRef.current?.off('lawbot_typing', handleLawBotTyping);
      socketRef.current?.off('lawbot_status', handleLawBotStatus);
    };
  }, [currentUser?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showTyping]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !id) return;

    try {
      setSendingMessage(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/api/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question_id: id,
          sender_id: currentUser.id,
          content: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setNewMessage('');
    } catch (err) {
      console.error(err);
      setError("We couldn't send that message.");
    } finally {
      setSendingMessage(false);
    }
  };

  const assistantBadge =
    assistantMode === 'human_lawyer'
      ? {
          label: 'Human lawyer joined',
          description:
            'A licensed lawyer is now handling this thread. LawBot will step back unless the lawyer pauses.',
        }
      : {
          label: 'LawBot assisting',
          description:
            'LawBot is helping with intake, structure, and next questions until a lawyer joins the thread.',
        };

  return (
    <div className="page-shell">
      <Navbar
        isLoggedIn
        userName="Aarav Shah"
        userRole="client"
        onMenuToggle={(open) => setSidebarCollapsed(open)}
      />

      <div className="flex min-h-[calc(100vh-72px)]">
        <Sidebar
          userRole="client"
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={setSidebarCollapsed}
        />

        <main className="flex flex-1 flex-col px-3 py-3 sm:px-4 lg:px-6">
          <div className="flex flex-1 flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white/72 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <div className="border-b border-border/60 bg-white/72 px-4 py-4 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
                    <Bot className="size-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-semibold text-foreground">
                        LawMate Priority Consultation
                      </h1>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          assistantMode === 'human_lawyer'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {assistantBadge.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {assistantBadge.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {introStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-full border border-border/70 bg-slate-50/75 px-3 py-2 text-xs"
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="ml-2 font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                  <Button variant="outline" size="sm">
                    <Phone className="size-4" />
                    Schedule call
                  </Button>
                  <Button variant="outline" size="icon-sm" aria-label="Search conversation">
                    <Search className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="chat-grid relative flex-1 overflow-y-auto bg-[linear-gradient(180deg,rgba(250,252,255,0.92),rgba(239,244,251,0.96))] px-4 py-6 sm:px-6">
              <div className="mx-auto flex max-w-4xl flex-col">
                <div className="mb-6 self-center rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                  Consultation room #{id}
                </div>

                {loadingMessages ? (
                  <div className="space-y-5">
                    {[0, 1, 2].map((item) => (
                      <div key={item} className="flex gap-3">
                        <Skeleton className="size-10 rounded-full" />
                        <div className="flex-1 space-y-3">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-20 w-[75%]" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {messages.length === 0 ? (
                      <div className="mx-auto mt-12 max-w-lg rounded-[28px] border border-dashed border-border/70 bg-white/80 p-8 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
                          Conversation started
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-foreground">
                          Your lawyer will reply here.
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          Add a little more context to help them respond faster and more accurately.
                        </p>
                      </div>
                    ) : null}

                    {messages.map((message, index) => {
                      const previousMessage = messages[index - 1];
                      const groupedWithPrevious =
                        previousMessage?.sender_id === message.sender_id;

                      const isOwn = message.sender_id === currentUser?.id;
                      const senderName = isOwn
                        ? 'You'
                        : message.sender_type === 'lawbot'
                          ? 'LawBot'
                          : 'Assigned Lawyer';
                      const avatarLabel = isOwn
                        ? 'AS'
                        : message.sender_type === 'lawbot'
                          ? 'LB'
                          : 'LY';

                      return (
                        <ChatMessage
                          key={message.id ?? `${message.sent_at}-${index}`}
                          message={message.content}
                          isOwn={isOwn}
                          groupedWithPrevious={groupedWithPrevious}
                          avatarLabel={avatarLabel}
                          senderName={senderName}
                          status="seen"
                          timestamp={
                            message.sent_at
                              ? new Date(message.sent_at).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : undefined
                          }
                        />
                      );
                    })}

                    {showTyping ? (
                      <ChatTypingIndicator
                        label={
                          assistantMode === 'human_lawyer'
                            ? 'Lawyer is typing...'
                            : 'LawBot is typing...'
                        }
                        avatarLabel={assistantMode === 'human_lawyer' ? 'LY' : 'LB'}
                      />
                    ) : null}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="sticky bottom-0 border-t border-border/60 bg-white/82 px-4 py-4 backdrop-blur-xl sm:px-6">
              <div className="mx-auto max-w-4xl">
                {error ? <p className="mb-3 text-sm font-medium text-destructive">{error}</p> : null}

                <div className="rounded-[28px] border border-white/70 bg-white/85 p-3 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
                  <div className="flex items-end gap-3">
                    <Input
                      placeholder="Type your message with any facts, dates, or documents you want reviewed..."
                      value={newMessage}
                      onChange={(event) => setNewMessage(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                          event.preventDefault();
                          void handleSendMessage();
                        }
                      }}
                      className="h-14 border-0 bg-transparent px-4 shadow-none focus-visible:ring-0"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={sendingMessage || !newMessage.trim()}
                      className="shrink-0"
                    >
                      {sendingMessage ? 'Sending...' : 'Send'}
                      <Send className="size-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-muted-foreground">
                    <span>Messages are secure and visible only inside this consultation.</span>
                    <span>Press Enter to send</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
