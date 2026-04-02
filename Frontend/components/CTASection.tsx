import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onPrimaryAction?: () => void;
  loading?: boolean;
}

export function CTASection({
  onPrimaryAction,
  loading = false,
}: CTASectionProps) {
  return (
    <section id="trust" className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_52%,#60a5fa_100%)] px-6 py-12 text-white shadow-[0_30px_80px_-32px_rgba(15,23,42,0.8)] sm:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25),_transparent_30%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_0.8fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur">
                <Sparkles className="size-4" />
                Private, fast, startup-grade legal support
              </div>
              <div className="space-y-4">
                <h2 className="max-w-2xl text-3xl font-semibold text-balance sm:text-4xl">
                  Move from legal uncertainty to action in a single conversation.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
                  LawMate is designed for urgent questions, calm guidance, and a
                  consultation flow that feels as trustworthy as the advice you are
                  paying for.
                </p>
              </div>
            </div>

            <div className="space-y-5 rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-white/12">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
                    Trusted flow
                  </p>
                  <p className="mt-1 text-lg font-semibold">Ready when you are</p>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-white text-slate-950 hover:bg-white/92"
                onClick={onPrimaryAction}
                disabled={loading}
              >
                {loading ? 'Opening your consultation...' : 'Ask a Lawyer for ₹49'}
                {!loading ? <ArrowRight className="size-4" /> : null}
              </Button>

              <div className="grid gap-3 text-sm text-white/78">
                <div className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/8 px-4 py-3">
                  <span>Average first response</span>
                  <span className="font-semibold text-white">Under 10 min</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/8 px-4 py-3">
                  <span>Lawyer verification</span>
                  <span className="font-semibold text-white">100% screened</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
