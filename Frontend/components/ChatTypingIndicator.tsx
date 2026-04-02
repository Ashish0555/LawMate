'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatTypingIndicatorProps {
  label?: string;
  avatarLabel?: string;
}

export function ChatTypingIndicator({
  label = 'Lawyer is typing...',
  avatarLabel = 'LM',
}: ChatTypingIndicatorProps) {
  return (
    <div className="flex items-end gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Avatar className="size-10 ring-4 ring-white/80">
        <AvatarFallback className="bg-slate-900 text-xs font-semibold text-white">
          {avatarLabel}
        </AvatarFallback>
      </Avatar>
      <div className="rounded-[22px] rounded-bl-md border border-white/80 bg-white/90 px-4 py-3 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.38)]">
        <p className="mb-2 text-xs font-medium text-slate-500">{label}</p>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-slate-400 animate-pulse" />
          <span className="size-2 rounded-full bg-slate-400 animate-pulse [animation-delay:0.15s]" />
          <span className="size-2 rounded-full bg-slate-400 animate-pulse [animation-delay:0.3s]" />
        </div>
      </div>
    </div>
  );
}
