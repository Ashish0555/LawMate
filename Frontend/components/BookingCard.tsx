'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';

interface BookingCardProps {
  date: string;
  time: string;
  duration: string;
  lawyer?: string;
  location?: string;
  price: number;
  onBook?: () => void;
  isAvailable?: boolean;
}

export function BookingCard({
  date,
  time,
  duration,
  lawyer,
  location,
  price,
  onBook,
  isAvailable = true,
}: BookingCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foreground">{date}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Clock className="w-4 h-4" />
              <span>
                {time} • {duration}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">${price}</p>
            {lawyer && (
              <p className="text-xs text-muted-foreground mt-1">{lawyer}</p>
            )}
          </div>
        </div>

        {location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}

        {isAvailable && (
          <Button
            onClick={onBook}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Book Session
          </Button>
        )}

        {!isAvailable && (
          <Button disabled className="w-full">
            Fully Booked
          </Button>
        )}
      </div>
    </Card>
  );
}
