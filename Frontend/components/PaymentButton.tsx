'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { useState } from 'react';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
  description?: string;
  onPayment?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function PaymentButton({
  amount,
  currency = 'USD',
  description,
  onPayment,
  isLoading = false,
  disabled = false,
}: PaymentButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handlePayment = () => {
    setClicked(true);
    onPayment?.();
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted">
      <div className="space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">
            ${amount.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">{currency}</span>
        </div>

        <Button
          onClick={handlePayment}
          disabled={disabled || isLoading || clicked}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          {isLoading || clicked ? (
            <>
              <Lock className="w-4 h-4 mr-2 animate-pulse" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Pay Now
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Secure payment powered by Stripe. Your information is encrypted.
        </p>
      </div>
    </Card>
  );
}
