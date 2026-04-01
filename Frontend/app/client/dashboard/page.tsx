'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { LawyerCard } from '@/components/LawyerCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Calendar, FileText, TrendingUp } from 'lucide-react';

const recentLawyers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Criminal Law',
    rating: 4.8,
    reviewCount: 45,
    hourlyRate: 150,
    image: undefined,
  },
  {
    id: '2',
    name: 'Michael Chen',
    specialty: 'Corporate Law',
    rating: 4.9,
    reviewCount: 62,
    hourlyRate: 200,
    image: undefined,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    specialty: 'Family Law',
    rating: 4.7,
    reviewCount: 38,
    hourlyRate: 120,
    image: undefined,
  },
];

const upcomingSessions = [
  {
    id: '1',
    lawyerName: 'Sarah Johnson',
    date: 'March 15, 2024',
    time: '10:00 AM',
    type: 'Chat Consultation',
  },
  {
    id: '2',
    lawyerName: 'Michael Chen',
    date: 'March 20, 2024',
    time: '2:00 PM',
    type: 'Video Call',
  },
];

export default function ClientDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const stats = [
    {
      icon: MessageSquare,
      label: 'Active Conversations',
      value: '3',
      color: 'text-primary',
    },
    {
      icon: Calendar,
      label: 'Upcoming Sessions',
      value: '2',
      color: 'text-accent',
    },
    {
      icon: FileText,
      label: 'Documents Reviewed',
      value: '5',
      color: 'text-secondary',
    },
    {
      icon: TrendingUp,
      label: 'Total Spent',
      value: '$850',
      color: 'text-primary',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn
        userName="John Doe"
        userRole="client"
        onMenuToggle={(open) => setSidebarCollapsed(!open)}
      />
      <div className="flex">
        <Sidebar
          userRole="client"
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={setSidebarCollapsed}
        />

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, John! Here&apos;s your legal consultation overview.
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

            {/* Upcoming Sessions */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Upcoming Sessions
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Your scheduled consultations
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/booking">Book New Session</Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {session.lawyerName}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {session.date} at {session.time}
                        </p>
                        <p className="text-sm text-primary font-medium mt-2">
                          {session.type}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Reschedule</Button>
                        <Button className="bg-primary hover:bg-primary/90">
                          Join Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recently Viewed Lawyers */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Recommended Lawyers
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Top-rated professionals matching your needs
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/booking">View All</Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {recentLawyers.map((lawyer) => (
                  <LawyerCard
                    key={lawyer.id}
                    {...lawyer}
                    onMessage={() => console.log('Message:', lawyer.id)}
                    onViewProfile={() => console.log('Profile:', lawyer.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
