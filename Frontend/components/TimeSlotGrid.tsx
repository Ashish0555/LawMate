'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedSlot?: string;
  onSelectSlot?: (time: string) => void;
}

export function TimeSlotGrid({
  slots,
  selectedSlot,
  onSelectSlot,
}: TimeSlotGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {slots.map((slot) => (
        <Button
          key={slot.time}
          variant={selectedSlot === slot.time ? 'default' : 'outline'}
          disabled={!slot.available}
          onClick={() => {
            if (slot.available) {
              onSelectSlot?.(slot.time);
            }
          }}
          className={cn(
            'text-sm',
            selectedSlot === slot.time && 'bg-primary hover:bg-primary/90',
            !slot.available && 'opacity-50 cursor-not-allowed'
          )}
        >
          {slot.time}
        </Button>
      ))}
    </div>
  );
}
