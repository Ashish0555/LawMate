import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

export function Ask49Banner() {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6 sm:p-8 md:p-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Quick Solution
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
            Have a Quick Legal Doubt?
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Don&apos;t wait for lengthy consultations. Get instant expert guidance for just ₹49
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto group"
            asChild
          >
            <Link href="/">
              Ask Now for ₹49
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
