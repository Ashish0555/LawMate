'use client';

import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isOwn: boolean;
  timestamp?: string;
  senderName?: string;
}

export function ChatMessage({
  message,
  isOwn,
  timestamp,
  senderName,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex gap-2 animate-in fade-in slide-in-from-bottom-2',
        isOwn ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
          isOwn
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-muted text-foreground rounded-bl-none'
        )}
      >
        {senderName && !isOwn && (
          <p className="text-xs font-semibold mb-1 opacity-75">
            {senderName}
          </p>
        )}
        <p className="text-sm break-words">{message}</p>
        {timestamp && (
          <p
            className={cn(
              'text-xs mt-1 opacity-70',
              isOwn ? 'text-primary-foreground' : 'text-muted-foreground'
            )}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
