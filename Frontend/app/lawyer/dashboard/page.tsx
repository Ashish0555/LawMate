'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  BarChart3,
  Users,
  Clock,
  Star,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';

const clientRequests = [
  {
    id: '1',
    clientName: 'Alice Smith',
    subject: 'Contract Review',
    date: 'Today, 9:30 AM',
    priority: 'high',
  },
  {
    id: '2',
    clientName: 'Bob Johnson',
    subject: 'Legal Consultation',
    date: 'Today, 11:00 AM',
    priority: 'medium',
  },
  {
    id: '3',
    clientName: 'Carol Davis',
    subject: 'Document Preparation',
    date: 'Tomorrow, 2:00 PM',
    priority: 'low',
  },
];

const upcomingConsultations = [
  {
    id: '1',
    clientName: 'Alice Smith',
    date: 'March 15, 2024',
    time: '10:00 AM',
    duration: '30 mins',
    fee: '$75',
  },
  {
    id: '2',
    clientName: 'David Miller',
    date: 'March 17, 2024',
    time: '3:00 PM',
    duration: '1 hour',
    fee: '$150',
  },
];

export default function LawyerDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const stats = [
    {
      icon: Users,
      label: 'Total Clients',
      value: '24',
      color: 'text-primary',
    },
    {
      icon: MessageSquare,
      label: 'Active Messages',
      value: '8',
      color: 'text-accent',
    },
    {
      icon: Clock,
      label: 'Hours This Month',
      value: '42',
      color: 'text-secondary',
    },
    {
      icon: TrendingUp,
      label: 'Monthly Earnings',
      value: '$6,300',
      color: 'text-primary',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn
        userName="Dr. Sarah Johnson"
        userRole="lawyer"
        onMenuToggle={(open) => setSidebarCollapsed(!open)}
      />
      <div className="flex">
        <Sidebar
          userRole="lawyer"
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={setSidebarCollapsed}
        />

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Practice Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Welcome back! Here&apos;s your practice overview for March.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-foreground mt-2">
                          {stat.value}
                        </p>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Client Requests & Messages */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pending Requests */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Client Requests
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      New inquiries awaiting response
                    </p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/lawyer/messages">View All</Link>
                  </Button>
                </div>

                <div className="space-y-3">
                  {clientRequests.map((request) => (
                    <Card key={request.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {request.clientName}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {request.subject}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {request.date}
                          </p>
                        </div>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            request.priority === 'high'
                              ? 'bg-destructive/10 text-destructive'
                              : request.priority === 'medium'
                                ? 'bg-accent/10 text-accent'
                                : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {request.priority}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="mt-3 w-full bg-primary hover:bg-primary/90"
                      >
                        Respond
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Upcoming Consultations */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Upcoming Consultations
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Scheduled sessions
                    </p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/lawyer/availability">Manage Calendar</Link>
                  </Button>
                </div>

                <div className="space-y-3">
                  {upcomingConsultations.map((consultation) => (
                    <Card key={consultation.id} className="p-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {consultation.clientName}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {consultation.date}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {consultation.time} • {consultation.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            {consultation.fee}
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2"
                          >
                            Join
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  className="justify-start"
                  asChild
                >
                  <Link href="/lawyer/availability">Update Availability</Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/lawyer/profile">Edit Profile</Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/lawyer/messages">Review Messages</Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/lawyer/settings">Settings</Link>
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
