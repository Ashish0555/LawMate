'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowUpRight,
  Calendar,
  Clock3,
  FileText,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

import { LawyerCard } from '@/components/LawyerCard';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const recentLawyers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Criminal Law',
    rating: 4.8,
    reviewCount: 45,
    hourlyRate: 149,
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialty: 'Corporate Law',
    rating: 4.9,
    reviewCount: 62,
    hourlyRate: 199,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    specialty: 'Family Law',
    rating: 4.7,
    reviewCount: 38,
    hourlyRate: 129,
  },
];

const upcomingSessions = [
  {
    id: '1',
    lawyerName: 'Sarah Johnson',
    date: 'Today',
    time: '10:00 AM',
    type: 'Chat consultation',
  },
  {
    id: '2',
    lawyerName: 'Michael Chen',
    date: 'Tomorrow',
    time: '2:00 PM',
    type: 'Video call',
  },
];

export default function ClientDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const stats = [
    {
      icon: MessageSquare,
      label: 'Active Chats',
      value: '03',
      note: '2 awaiting lawyer reply',
    },
    {
      icon: Calendar,
      label: 'Upcoming Bookings',
      value: '02',
      note: 'Next one starts in 48 min',
    },
    {
      icon: FileText,
      label: 'Documents Shared',
      value: '05',
      note: 'Securely stored in consultation history',
    },
    {
      icon: ShieldCheck,
      label: 'Private Threads',
      value: '100%',
      note: 'Encrypted message routing',
    },
  ];

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

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <Card className="overflow-hidden border-white/70 bg-[linear-gradient(135deg,rgba(36,85,255,0.12),rgba(123,168,255,0.05))] p-0">
                <CardContent className="grid gap-8 px-6 py-8 md:grid-cols-[1fr_0.75fr]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/70">
                      Client workspace
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold text-foreground">
                      Your legal matters, organized and moving.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                      Keep chats, bookings, documents, and next actions in one calm
                      dashboard designed to feel more like a product than a portal.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button asChild>
                        <Link href="/booking">
                          Book consultation
                          <ArrowUpRight className="size-4" />
                        </Link>
                      </Button>
                      <Button variant="outline">Review latest chat</Button>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/70 bg-white/80 p-5">
                    <p className="text-sm font-semibold text-foreground">
                      Next consultation
                    </p>
                    <div className="mt-4 rounded-[24px] bg-slate-950 px-5 py-5 text-white">
                      <p className="text-sm text-white/65">Scheduled with</p>
                      <p className="mt-1 text-2xl font-semibold">Sarah Johnson</p>
                      <div className="mt-4 flex items-center gap-3 text-sm text-white/75">
                        <Clock3 className="size-4" />
                        Today at 10:00 AM
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="px-0 pb-0">
                  <CardTitle>Priority inbox</CardTitle>
                  <CardDescription>
                    Conversations that need your attention right now
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-0 pt-6">
                  {[
                    'Rental agreement review',
                    'Employment exit clause clarification',
                    'Consumer complaint escalation',
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[22px] border border-border/60 bg-slate-50/80 px-4 py-4"
                    >
                      <p className="font-medium text-foreground">{item}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Lawyer response expected shortly
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <Card key={stat.label} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <p className="mt-3 text-4xl font-semibold text-foreground">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {stat.note}
                        </p>
                      </div>
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
              <Card className="p-6">
                <CardHeader className="flex-row items-start justify-between px-0">
                  <div>
                    <CardTitle>Upcoming sessions</CardTitle>
                    <CardDescription>
                      Everything scheduled for the next 48 hours
                    </CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/booking">Manage bookings</Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 px-0 pt-6">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex flex-col gap-4 rounded-[24px] border border-border/60 bg-slate-50/75 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-lg font-semibold text-foreground">{session.lawyerName}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {session.date} at {session.time}
                        </p>
                        <p className="mt-2 text-sm font-medium text-primary">{session.type}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline">Reschedule</Button>
                        <Button>Join room</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="flex-row items-start justify-between px-0">
                  <div>
                    <CardTitle>Recommended lawyers</CardTitle>
                    <CardDescription>
                      Matches based on your recent legal topics
                    </CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/booking">See all</Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 px-0 pt-6">
                  {recentLawyers.map((lawyer) => (
                    <LawyerCard
                      key={lawyer.id}
                      {...lawyer}
                      onMessage={() => console.log('Message:', lawyer.id)}
                      onViewProfile={() => console.log('Profile:', lawyer.id)}
                    />
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
