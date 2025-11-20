'use client';

import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for testing your first idea',
      features: [
        '1 validation session',
        'Basic AI feedback',
        'Pattern recognition analysis',
        'Email support',
        'Community access'
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$49',
      period: '/month',
      description: 'For serious entrepreneurs validating multiple ideas',
      features: [
        '10 validation sessions/month',
        'Advanced AI analysis',
        'Pattern recognition analysis',
        'Market simulation',
        'Evidence checking',
        'Priority email support',
        'Export reports',
        'Collaboration features'
      ],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams and organizations',
      features: [
        'Unlimited validations',
        'Custom AI training',
        'Pattern recognition analysis',
        'Market simulation',
        'Evidence checking',
        'Dedicated account manager',
        'API access',
        'Custom integrations',
        'Team collaboration',
        'White-label options'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-8 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include our core validation features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card
                  className={`relative h-full ${
                    plan.highlighted
                      ? 'border-2 border-blue-500 bg-slate-800/80'
                      : 'border-slate-700 bg-slate-800/50'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      {plan.period && <span className="text-slate-400 text-lg">{plan.period}</span>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start text-slate-300">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => router.push('/')}
                      className={`w-full ${
                        plan.highlighted
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                          : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Can I change plans later?</h3>
                <p className="text-slate-400">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Is there a free trial?</h3>
                <p className="text-slate-400">
                  Yes, Professional plan includes a 14-day free trial. No credit card required to start.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-slate-400">
                  We accept all major credit cards, PayPal, and can arrange invoicing for Enterprise customers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Can I cancel anytime?</h3>
                <p className="text-slate-400">
                  Absolutely. Cancel anytime with no questions asked. You'll retain access until the end of your billing period.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
