'use client';

import { MessageSquare, ShieldCheck, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LawyerCardProps {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  image?: string;
  onMessage?: () => void;
  onViewProfile?: () => void;
}

export function LawyerCard({
  name,
  specialty,
  rating,
  reviewCount,
  hourlyRate,
  image,
  onMessage,
  onViewProfile,
}: LawyerCardProps) {
  return (
    <Card className="overflow-hidden border-white/70 p-0 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 ring-4 ring-primary/10">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-primary text-base font-semibold text-primary-foreground">
              {name
                .split(' ')
                .map((segment) => segment[0])
                .join('')}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                Verified
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{specialty}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {rating.toFixed(1)}
              </span>
              <span>{reviewCount} reviews</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="size-4 text-emerald-500" />
                Secure consultation
              </span>
            </div>
          </div>
        </div>

        <div className="md:ml-auto md:text-right">
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="mt-1 text-3xl font-semibold text-foreground">₹{hourlyRate}</p>
          <p className="text-sm text-muted-foreground">per session</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border/60 bg-slate-50/70 px-6 py-4 sm:flex-row">
        <Button variant="outline" className="sm:flex-1" onClick={onMessage}>
          <MessageSquare className="size-4" />
          Message
        </Button>
        <Button className="sm:flex-1" onClick={onViewProfile}>
          View Profile
        </Button>
      </div>
    </Card>
  );
}
