'use client';

import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Star,
  MessageSquare,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Clock,
  Users,
  CheckCircle,
} from 'lucide-react';

const lawyerData = {
  id: '1',
  name: 'Sarah Johnson',
  specialty: 'Criminal Law & Defense',
  rating: 4.8,
  reviewCount: 45,
  hourlyRate: 150,
  image: undefined,
  bio: 'With over 15 years of experience in criminal law, I have successfully represented clients in complex cases ranging from white-collar crimes to personal defense matters. I believe in a thorough, strategic approach to every case.',
  location: 'New York, NY',
  experience: '15+ years',
  languages: ['English', 'Spanish'],
  education: [
    'J.D., Harvard Law School (2008)',
    'B.A., Political Science, Yale University (2005)',
  ],
  certifications: [
    'Licensed to practice in NY, NJ, CT',
    'Board Certified in Criminal Law',
    'Fellow, American College of Trial Lawyers',
  ],
  expertise: [
    'Criminal Defense',
    'White-Collar Crime',
    'Drug Offenses',
    'DUI/DWI',
    'Assault & Battery',
    'Federal Crimes',
  ],
  availability: '24/7 Emergency Consultation',
  sessionTypes: [
    { type: 'Chat Consultation', duration: '30 min', price: '$75' },
    { type: 'Video Call', duration: '1 hour', price: '$150' },
    { type: 'In-Person Meeting', duration: '1 hour', price: '$200' },
  ],
  reviews: [
    {
      id: '1',
      reviewer: 'Michael T.',
      rating: 5,
      date: '2024-02-15',
      text: 'Sarah was incredibly thorough and professional. She explained everything clearly and achieved the best possible outcome for my case.',
    },
    {
      id: '2',
      reviewer: 'Jennifer M.',
      rating: 5,
      date: '2024-01-28',
      text: 'Highly recommended! Sarah went above and beyond to help me. Her expertise and dedication are unmatched.',
    },
    {
      id: '3',
      reviewer: 'David K.',
      rating: 4,
      date: '2024-01-10',
      text: 'Great lawyer with extensive experience. Very responsive and knowledgeable about criminal law.',
    },
  ],
};

export default function LawyerProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={false} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/booking"
          className="text-primary hover:text-primary/80 text-sm font-medium mb-6 inline-block"
        >
          ← Back to Lawyers
        </Link>

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                {lawyerData.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground">
                {lawyerData.name}
              </h1>
              <p className="text-lg text-primary font-medium mt-1">
                {lawyerData.specialty}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-medium">
                    {lawyerData.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({lawyerData.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{lawyerData.location}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{lawyerData.experience} experience</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <Button
                className="bg-primary hover:bg-primary/90 gap-2 w-full md:w-auto"
                asChild
              >
                <Link href="/booking">
                  <Calendar className="w-4 h-4" />
                  Book Consultation
                </Link>
              </Button>
              <Button
                variant="outline"
                className="gap-2 w-full md:w-auto"
                asChild
              >
                <Link href="/chat">
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {lawyerData.bio}
              </p>
            </Card>

            {/* Expertise */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Areas of Expertise
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {lawyerData.expertise.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-foreground">{area}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Education & Credentials */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Education & Credentials
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Education
                  </h3>
                  <ul className="space-y-2">
                    {lawyerData.education.map((edu, index) => (
                      <li key={index} className="text-muted-foreground">
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    Certifications & Licenses
                  </h3>
                  <ul className="space-y-2">
                    {lawyerData.certifications.map((cert, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Languages
                  </h3>
                  <div className="flex gap-2">
                    {lawyerData.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Reviews */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Client Reviews
              </h2>

              <div className="space-y-6">
                {lawyerData.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="pb-6 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">
                          {review.reviewer}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-accent text-accent"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Consultation Rates
              </h3>
              <div className="space-y-3">
                {lawyerData.sessionTypes.map((session, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {session.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.duration}
                      </p>
                    </div>
                    <p className="font-bold text-primary">{session.price}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Availability */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Availability
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Clock className="w-5 h-5" />
                <span>{lawyerData.availability}</span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    Next available: Today, 4:00 PM
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    24 active clients
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 mb-3"
                asChild
              >
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/chat">Message</Link>
              </Button>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Response Time
                  </p>
                  <p className="font-bold text-foreground">Under 1 hour</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Satisfaction Rate
                  </p>
                  <p className="font-bold text-foreground">98%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Sessions
                  </p>
                  <p className="font-bold text-foreground">200+</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
