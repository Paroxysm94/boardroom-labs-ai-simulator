'use client';

import { motion } from 'framer-motion';
import { Target, Users, Zap, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <h1 className="text-5xl font-bold text-white mb-4">About BoardRoom Labs</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              We're on a mission to help entrepreneurs validate their ideas faster and more effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  BoardRoom Labs was founded by entrepreneurs who experienced the pain of building products nobody wanted. We've been there - spending months or even years on ideas that ultimately failed.
                </p>
                <p>
                  That's why we created an AI-powered validation system that simulates a board of expert advisors. Our technology helps you stress-test your ideas before you invest significant time and resources.
                </p>
                <p>
                  Today, we help hundreds of founders validate their ideas, identify blind spots, and make data-driven decisions about their ventures.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  We believe that every entrepreneur deserves honest, unbiased feedback on their ideas. Too often, founders get caught in echo chambers where friends and family only tell them what they want to hear.
                </p>
                <p>
                  Our AI board provides the tough love and critical analysis that startups need to succeed. We help you identify potential pitfalls, validate assumptions, and refine your value proposition before you build.
                </p>
                <p>
                  Our goal is simple: help more startups succeed by catching problems early.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                icon: Target,
                title: 'Evidence-Based',
                description: 'Our AI analyzes market data and real-world evidence to validate your assumptions'
              },
              {
                icon: Users,
                title: 'Multi-Perspective',
                description: 'Get feedback from multiple expert personas across different domains'
              },
              {
                icon: Zap,
                title: 'Fast & Efficient',
                description: 'Receive comprehensive validation in minutes, not months'
              },
              {
                icon: Shield,
                title: 'Confidential',
                description: 'Your ideas are secure and never shared with third parties'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-400">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Validate Your Idea?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of founders who are building better products with BoardRoom Labs
            </p>
            <Button
              size="lg"
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              Get Started Free
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
