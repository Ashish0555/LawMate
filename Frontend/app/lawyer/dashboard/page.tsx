'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Calendar,
  Clock3,
  MessageSquare,
  TrendingUp,
  UserRound,
  Wallet,
} from 'lucide-react';

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

const clientRequests = [
  {
    id: '1',
    clientName: 'Alice Smith',
    subject: 'Contract review before signing',
    date: 'Today, 9:30 AM',
    priority: 'High',
  },
  {
    id: '2',
    clientName: 'Bob Johnson',
    subject: 'Founders agreement guidance',
    date: 'Today, 11:00 AM',
    priority: 'Medium',
  },
  {
    id: '3',
    clientName: 'Carol Davis',
    subject: 'Employment notice dispute',
    date: 'Tomorrow, 2:00 PM',
    priority: 'Low',
  },
];

const upcomingConsultations = [
  {
    id: '1',
    clientName: 'Alice Smith',
    date: 'Today',
    time: '10:00 AM',
    duration: '30 mins',
    fee: '₹2,500',
  },
  {
    id: '2',
    clientName: 'David Miller',
    date: 'Tomorrow',
    time: '3:00 PM',
    duration: '1 hour',
    fee: '₹5,000',
  },
];

export default function LawyerDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const stats = [
    {
      icon: UserRound,
      label: 'Active Clients',
      value: '24',
      note: '7 first-time consultations this week',
    },
    {
      icon: MessageSquare,
      label: 'Unread Messages',
      value: '08',
      note: '3 high-priority threads',
    },
    {
      icon: Clock3,
      label: 'Hours Booked',
      value: '42',
      note: 'Strong utilization this month',
    },
    {
      icon: Wallet,
      label: 'Projected Earnings',
      value: '₹1.2L',
      note: 'Up 18% vs last month',
    },
  ];

  return (
    <div className="page-shell">
      <Navbar
        isLoggedIn
        userName="Sarah Johnson"
        userRole="lawyer"
        onMenuToggle={(open) => setSidebarCollapsed(open)}
      />

      <div className="flex min-h-[calc(100vh-72px)]">
        <Sidebar
          userRole="lawyer"
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={setSidebarCollapsed}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <Card className="overflow-hidden border-white/70 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,64,175,0.92),rgba(96,165,250,0.82))] p-0 text-white">
                <CardContent className="grid gap-8 px-6 py-8 md:grid-cols-[1fr_0.72fr]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/65">
                      Practice dashboard
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold">
                      Run a premium legal practice with calmer workflows.
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">
                      Manage requests, stay responsive, and keep your client
                      experience polished from first question through final advice.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button className="bg-white text-slate-950 hover:bg-white/92">
                        Open inbox
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 bg-white/10 text-white hover:bg-white/16"
                      >
                        Update availability
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-sm text-white/65">Today&apos;s momentum</p>
                    <div className="mt-5 grid gap-3">
                      {[
                        { label: 'Pending requests', value: '11' },
                        { label: 'Booked consultations', value: '06' },
                        { label: 'Conversion rate', value: '72%' },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/8 px-4 py-3"
                        >
                          <span className="text-sm text-white/72">{item.label}</span>
                          <span className="text-lg font-semibold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="px-0 pb-0">
                  <CardTitle>Growth snapshot</CardTitle>
                  <CardDescription>
                    Your practice is trending upward this month
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pt-6">
                  <div className="rounded-[28px] border border-border/60 bg-slate-50/80 p-5">
                    <div className="flex items-center gap-3 text-primary">
                      <TrendingUp className="size-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                        Performance
                      </span>
                    </div>
                    <p className="mt-4 text-4xl font-semibold text-foreground">+18%</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Faster response times and stronger booking conversion compared with last month.
                    </p>
                  </div>
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

            <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <Card className="p-6">
                <CardHeader className="flex-row items-start justify-between px-0">
                  <div>
                    <CardTitle>Client requests</CardTitle>
                    <CardDescription>
                      Fresh opportunities requiring a timely response
                    </CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/lawyer/dashboard">Refresh board</Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 px-0 pt-6">
                  {clientRequests.map((request) => (
                    <div
                      key={request.id}
                      className="rounded-[24px] border border-border/60 bg-slate-50/75 px-5 py-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-foreground">
                            {request.clientName}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {request.subject}
                          </p>
                          <p className="mt-3 text-sm font-medium text-primary">{request.date}</p>
                        </div>
                        <span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                          {request.priority}
                        </span>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <Button className="flex-1">Respond now</Button>
                        <Button variant="outline" className="flex-1">
                          Save for later
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader className="flex-row items-start justify-between px-0">
                  <div>
                    <CardTitle>Upcoming consultations</CardTitle>
                    <CardDescription>
                      Your scheduled client sessions for the next 48 hours
                    </CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/lawyer/dashboard">Manage calendar</Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 px-0 pt-6">
                  {upcomingConsultations.map((consultation) => (
                    <div
                      key={consultation.id}
                      className="rounded-[24px] border border-border/60 bg-slate-50/75 px-5 py-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-foreground">
                            {consultation.clientName}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {consultation.date} at {consultation.time}
                          </p>
                          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-muted-foreground">
                            <Calendar className="size-3.5" />
                            {consultation.duration}
                          </div>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-2xl font-semibold text-foreground">
                            {consultation.fee}
                          </p>
                          <Button className="mt-3">Join consultation</Button>
                        </div>
                      </div>
                    </div>
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
