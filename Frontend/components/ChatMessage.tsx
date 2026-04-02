'use client';

import { CheckCheck } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isOwn: boolean;
  timestamp?: string;
  senderName?: string;
  avatarLabel?: string;
  groupedWithPrevious?: boolean;
  status?: 'sent' | 'seen';
}

export function ChatMessage({
  message,
  isOwn,
  timestamp,
  senderName,
  avatarLabel,
  groupedWithPrevious = false,
  status = 'seen',
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300',
        isOwn ? 'justify-end' : 'justify-start',
        groupedWithPrevious ? 'mt-2' : 'mt-6',
      )}
    >
      {!isOwn ? (
        <Avatar
          className={cn(
            'size-10 shrink-0 ring-4 ring-white/80 transition-opacity',
            groupedWithPrevious && 'opacity-0',
          )}
        >
          <AvatarFallback className="bg-slate-950 text-xs font-semibold text-white">
            {avatarLabel ?? 'LM'}
          </AvatarFallback>
        </Avatar>
      ) : null}

      <div className={cn('max-w-[84%] md:max-w-[70%]', isOwn && 'items-end')}>
        {!groupedWithPrevious && senderName ? (
          <p className={cn('mb-2 text-xs font-semibold', isOwn ? 'text-right text-primary/80' : 'text-slate-500')}>
            {senderName}
          </p>
        ) : null}

        <div
          className={cn(
            'rounded-[24px] px-4 py-3 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.38)]',
            isOwn
              ? 'rounded-br-md bg-[linear-gradient(135deg,#2455ff,#7ba8ff)] text-white'
              : 'rounded-bl-md border border-white/80 bg-white/90 text-foreground',
          )}
        >
          <p className="text-sm leading-6">{message}</p>
          <div
            className={cn(
              'mt-2 flex items-center gap-1 text-[11px]',
              isOwn ? 'justify-end text-white/80' : 'text-slate-500',
            )}
          >
            {timestamp ? <span>{timestamp}</span> : null}
            {isOwn ? (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <CheckCheck className="size-3.5" />
                  {status === 'seen' ? 'Seen' : 'Sent'}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {isOwn ? (
        <Avatar
          className={cn(
            'size-10 shrink-0 ring-4 ring-white/80 transition-opacity',
            groupedWithPrevious && 'opacity-0',
          )}
        >
          <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
            {avatarLabel ?? 'YO'}
          </AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  );
}
