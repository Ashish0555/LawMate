'use client';

import { cn } from '@/lib/utils';
import { CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';

import { Spinner } from '@/components/ui/spinner';

interface PaymentModalProps {
  open: boolean;
  stage: 'processing' | 'success';
}

export function PaymentModal({ open, stage }: PaymentModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-md">
      <div className="surface-card relative w-full max-w-md overflow-hidden p-8">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(83,119,255,0.26),_transparent_70%)]" />

        <div className="relative space-y-6">
          <div
            className={cn(
              'mx-auto flex size-18 items-center justify-center rounded-full border shadow-lg',
              stage === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                : 'border-primary/15 bg-primary/8 text-primary',
            )}
          >
            {stage === 'success' ? (
              <CheckCircle2 className="size-9 animate-in zoom-in-50 duration-300" />
            ) : (
              <CreditCard className="size-8" />
            )}
          </div>

          <div className="space-y-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
              Secure checkout
            </p>
            <h3 className="text-3xl font-semibold text-foreground">
              {stage === 'success' ? 'Payment confirmed' : 'Processing Payment...'}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {stage === 'success'
                ? 'Your consultation has been created and we are taking you to the live chat.'
                : 'Connecting your request to a verified lawyer and reserving your priority response slot.'}
            </p>
          </div>

          <div className="rounded-[24px] border border-border/70 bg-slate-50/80 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">LawMate Priority Question</span>
              <span className="font-semibold text-foreground">₹49</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-500" />
              End-to-end secure request handoff with verified legal professionals
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            {stage === 'processing' ? <Spinner className="size-4 text-primary" /> : null}
            <span>
              {stage === 'success'
                ? 'Redirecting to your conversation'
                : 'Authenticating payment and opening your chat'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
