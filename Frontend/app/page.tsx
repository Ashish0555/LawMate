'use client';

import { startTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Clock3,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  WalletCards,
} from 'lucide-react';

import { CTASection } from '@/components/CTASection';
import { Navbar } from '@/components/Navbar';
import { PaymentModal } from '@/components/PaymentModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { API_BASE_URL, getOrCreateDemoClient } from '@/lib/api';

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Verified lawyers',
    copy: 'Professionals screened for experience, responsiveness, and trust.',
  },
  {
    icon: Clock3,
    title: 'Fast responses',
    copy: 'Urgent questions move into a live consultation flow in minutes.',
  },
  {
    icon: WalletCards,
    title: 'Secure and simple',
    copy: 'Premium experience with clean pricing and private messaging.',
  },
];

const experienceSteps = [
  {
    eyebrow: 'Step 01',
    title: 'Describe the problem',
    copy: 'Start with a lightweight paid intake designed for urgent legal clarity.',
  },
  {
    eyebrow: 'Step 02',
    title: 'Get routed instantly',
    copy: 'We open a structured chat and hand your request to a relevant legal expert.',
  },
  {
    eyebrow: 'Step 03',
    title: 'Resolve faster',
    copy: 'Continue inside a clean messaging workspace built for confidence, not chaos.',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStage, setPaymentStage] = useState<'processing' | 'success'>(
    'processing',
  );
  const [paymentOpen, setPaymentOpen] = useState(false);

  const handleAsk = async () => {
    try {
      setLoading(true);
      setError('');
      setPaymentStage('processing');
      setPaymentOpen(true);

      const demoUser = await getOrCreateDemoClient();
      await new Promise((resolve) => setTimeout(resolve, 1400));

      const response = await fetch(`${API_BASE_URL}/api/questions/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: demoUser.id,
          question: 'Quick legal help',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create legal question');
      }

      const data = await response.json();
      const createdQuestion = Array.isArray(data) ? data[0] : data;

      setPaymentStage('success');
      await new Promise((resolve) => setTimeout(resolve, 900));

      startTransition(() => {
        router.push(`/chat/${createdQuestion.id}`);
      });
    } catch (err) {
      console.error(err);
      setError('We hit a snag opening your consultation. Please try again.');
      setPaymentOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <PaymentModal open={paymentOpen} stage={paymentStage} />

      <main>
        <section className="hero-grid relative overflow-hidden px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-14">
          <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(36,85,255,0.18),_transparent_60%)]" />
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8 animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-sm font-medium text-primary shadow-sm">
                <Sparkles className="size-4" />
                Legal help designed like a premium SaaS product
              </div>

              <div className="space-y-6">
                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance text-slate-950 sm:text-6xl">
                  Modern legal guidance for people who need clarity right now.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                  LawMate combines verified lawyers, lightning-fast chat intake, and
                  a product experience polished enough to feel trusted from the first click.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button size="lg" onClick={handleAsk} disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="size-4" />
                      Opening consultation...
                    </>
                  ) : (
                    <>
                      Ask a Lawyer for ₹49
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
                <div className="flex items-center gap-3 rounded-full border border-white/80 bg-white/70 px-4 py-3 text-sm text-muted-foreground shadow-sm">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="size-4" />
                  </span>
                  End-to-end secure. No noisy forms. No waiting room UX.
                </div>
              </div>

              {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}

              <div className="grid gap-4 sm:grid-cols-3">
                {trustItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="surface-panel px-5 py-5 transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.copy}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative animate-fade-up [animation-delay:120ms]">
              <div className="absolute -left-6 top-12 hidden size-24 rounded-full bg-primary/15 blur-2xl lg:block" />
              <div className="absolute -right-8 bottom-8 hidden size-28 rounded-full bg-sky-300/20 blur-2xl lg:block" />

              <Card className="surface-card relative overflow-hidden p-0">
                <div className="border-b border-border/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(248,250,252,0.9))] px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/70">
                        Live Intake
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-foreground">
                        Built for urgency, not bureaucracy
                      </h2>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      12 lawyers online
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-6">
                  <div className="rounded-[28px] border border-primary/10 bg-[linear-gradient(135deg,rgba(36,85,255,0.08),rgba(123,168,255,0.02))] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Priority question
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-foreground">₹49</p>
                      </div>
                      <div className="rounded-2xl bg-white px-3 py-2 text-right shadow-sm">
                        <p className="text-xs text-muted-foreground">Average response</p>
                        <p className="text-sm font-semibold text-foreground">8 minutes</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {experienceSteps.map((step) => (
                      <div
                        key={step.title}
                        className="flex gap-4 rounded-[24px] border border-border/60 bg-slate-50/75 px-4 py-4"
                      >
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-primary shadow-sm">
                          {step.eyebrow.slice(-2)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
                            {step.eyebrow}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-foreground">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {step.copy}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[24px] bg-slate-950 px-5 py-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/65">Satisfaction score</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Star className="size-4 fill-amber-400 text-amber-400" />
                          <span className="text-2xl font-semibold">4.9/5</span>
                        </div>
                      </div>
                      <div className="text-right text-sm text-white/70">
                        <p>Trusted by founders, families, and first-time clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/70">
                  Experience
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                  Product quality that makes legal consultation feel calm.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Every surface is designed to reduce friction: clear pricing,
                trustworthy signals, elegant messaging, and the kind of polish users
                remember.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="surface-card overflow-hidden p-0">
                <div className="bg-[linear-gradient(135deg,rgba(36,85,255,0.1),rgba(123,168,255,0.03))] px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <MessageSquareText className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Live consultation flow</h3>
                      <p className="text-sm text-muted-foreground">
                        Messaging UI built to feel like premium support software.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 p-6 sm:grid-cols-2">
                  {[
                    'Real-time chat with clear ownership',
                    'Structured intake and quick routing',
                    'Secure message history and context',
                    'Designed for mobile-first responsiveness',
                  ].map((point) => (
                    <div
                      key={point}
                      className="rounded-[24px] border border-border/60 bg-white/80 px-4 py-5 text-sm font-medium text-foreground"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid gap-6">
                <Card className="surface-card p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/70">
                    Trust layer
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground">
                    The product explains itself before support ever has to.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    From verified status to response-time promises and secure payment
                    moments, the UI makes the service feel believable and investable.
                  </p>
                </Card>

                <Card id="experience" className="surface-card p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/70">
                    Designed for interviews and demos
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground">
                    This now reads like a company, not a prototype.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Strong hierarchy, intentional motion, and a consistent system make
                    the product easier to showcase publicly or discuss in case-study form.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <CTASection onPrimaryAction={handleAsk} loading={loading} />
      </main>
    </div>
  );
}
