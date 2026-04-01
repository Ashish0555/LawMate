import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary via-primary to-secondary/80 text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-primary-foreground/10 backdrop-blur rounded-full">
            <Sparkles className="w-8 h-8" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
            Get Expert Legal Answers in Minutes
          </h2>
          <p className="text-lg sm:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t wait for expensive consultations. Ask your legal question now and get instant expert guidance from verified professionals.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 group w-full sm:w-auto"
            asChild
          >
            <Link href="/ask-quick-question">
              Ask a Lawyer for ₹49
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 w-full sm:w-auto"
            asChild
          >
            <Link href="/booking">Full Consultation</Link>
          </Button>
        </div>

        {/* Trust Text */}
        <div className="text-sm opacity-80 pt-4">
          <p>No credit card required • Instant response • 100% confidential</p>
        </div>
      </div>
    </section>
  );
}
