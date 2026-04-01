import { FileText, CreditCard, MessageSquare } from 'lucide-react';

export function FeatureSteps() {
  const steps = [
    {
      icon: FileText,
      title: 'Describe Your Legal Issue',
      description: 'Tell us about your legal concern in detail',
      number: '1',
    },
    {
      icon: CreditCard,
      title: 'Pay ₹49 Securely',
      description: 'Simple and secure payment in seconds',
      number: '2',
    },
    {
      icon: MessageSquare,
      title: 'Chat with Legal Expert',
      description: 'Instant answers from verified professionals',
      number: '3',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={index} className="relative flex flex-col items-start">
            {/* Step Number Badge */}
            <div className="flex items-center gap-4 mb-4 w-full">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                {step.number}
              </div>
              <Icon className="w-8 h-8 text-primary hidden sm:block flex-shrink-0" />
            </div>

            {/* Content */}
            <div className="pl-0 sm:pl-2">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Arrow Connector for Desktop */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-6 -right-8 lg:-right-12">
                <svg
                  className="w-12 h-1"
                  viewBox="0 0 48 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 2H40M40 2L44 0M40 2L44 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary/40"
                  />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
