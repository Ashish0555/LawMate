'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { LawyerCard } from '@/components/LawyerCard';
import { TimeSlotGrid } from '@/components/TimeSlotGrid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight, MapPin, Users } from 'lucide-react';

const allLawyers = [
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
  {
    id: '4',
    name: 'James Wilson',
    specialty: 'Tax Law',
    rating: 4.9,
    reviewCount: 52,
    hourlyRate: 180,
    image: undefined,
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    specialty: 'Intellectual Property',
    rating: 4.6,
    reviewCount: 28,
    hourlyRate: 170,
    image: undefined,
  },
  {
    id: '6',
    name: 'David Kumar',
    specialty: 'Immigration Law',
    rating: 4.8,
    reviewCount: 41,
    hourlyRate: 140,
    image: undefined,
  },
];

const timeSlots = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '12:00 PM', available: true },
  { time: '01:00 PM', available: true },
  { time: '02:00 PM', available: false },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true },
];

export default function BookingPage() {
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDateChange = (days: number) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + days);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const filteredLawyers = allLawyers.filter((lawyer) => {
    const matchesSearch = lawyer.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      specialty === 'all' || lawyer.specialty.toLowerCase() === specialty.toLowerCase();
    return matchesSearch && matchesSpecialty;
  });

  const selectedLawyerData = allLawyers.find((l) => l.id === selectedLawyer);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Find a Lawyer</h1>
          <p className="text-muted-foreground mt-2">
            Browse our network of qualified legal professionals and book a consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filters & Lawyers List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Section */}
            <Card className="p-6">
              <h2 className="font-semibold text-foreground mb-4">
                Filter Results
              </h2>
              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Specialty Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Specialty
                  </label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="criminal law">Criminal Law</SelectItem>
                      <SelectItem value="corporate law">Corporate Law</SelectItem>
                      <SelectItem value="family law">Family Law</SelectItem>
                      <SelectItem value="tax law">Tax Law</SelectItem>
                      <SelectItem value="intellectual property">
                        Intellectual Property
                      </SelectItem>
                      <SelectItem value="immigration law">
                        Immigration Law
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Hourly Rate Range
                  </label>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      placeholder="Min"
                      className="w-24"
                      defaultValue="100"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      className="w-24"
                      defaultValue="250"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Lawyers Grid */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-foreground">
                  Available Lawyers ({filteredLawyers.length})
                </h2>
              </div>

              {filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className={`cursor-pointer transition-all ${
                    selectedLawyer === lawyer.id
                      ? 'ring-2 ring-primary rounded-lg'
                      : ''
                  }`}
                  onClick={() => setSelectedLawyer(lawyer.id)}
                >
                  <LawyerCard
                    {...lawyer}
                    onMessage={() => console.log('Message:', lawyer.id)}
                    onViewProfile={() => console.log('Profile:', lawyer.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div>
            {selectedLawyerData ? (
              <Card className="sticky top-4 p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {selectedLawyerData.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedLawyerData.specialty}
                  </p>
                  <p className="text-2xl font-bold text-primary mt-3">
                    ${selectedLawyerData.hourlyRate}/hr
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-3">
                      Select Date
                    </label>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDateChange(-1)}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium text-foreground">
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDateChange(1)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-3">
                      Select Time
                    </label>
                    <TimeSlotGrid
                      slots={timeSlots}
                      selectedSlot={selectedTime || undefined}
                      onSelectSlot={setSelectedTime}
                    />
                  </div>

                  {/* Session Type */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Session Type
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue defaultValue="chat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chat">Chat Consultation (30 min)</SelectItem>
                        <SelectItem value="video">
                          Video Call (1 hour)
                        </SelectItem>
                        <SelectItem value="phone">
                          Phone Call (45 min)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Summary */}
                {selectedTime && (
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Consultation:</span>
                      <span className="font-medium">30 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rate:</span>
                      <span className="font-medium">
                        ${(selectedLawyerData.hourlyRate / 2).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span className="text-primary">
                        ${(selectedLawyerData.hourlyRate / 2).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!selectedTime}
                  asChild
                >
                  <Link href="/booking/confirmation">Proceed to Payment</Link>
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </Card>
            ) : (
              <Card className="sticky top-4 p-6">
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Select a lawyer to book a consultation
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
