'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquare } from 'lucide-react';

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
  id,
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
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <Avatar className="w-16 h-16 flex-shrink-0">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{specialty}</p>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-primary">${hourlyRate}/hr</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onMessage}
                className="gap-1"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Message</span>
              </Button>
              <Button
                size="sm"
                onClick={onViewProfile}
                className="bg-primary hover:bg-primary/90"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
