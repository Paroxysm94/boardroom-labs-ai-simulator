'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageSquare,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: MessageSquare,
      title: 'Chat with AI Advisors',
      description: 'Share your idea through natural conversation. Type it out or upload documents - we handle the rest.',
    },
    {
      icon: Users,
      title: 'Expert Panel Review',
      description: '5 specialized advisors analyze your idea from every angle: operations, growth, finance, product, and risk.',
    },
    {
      icon: BarChart3,
      title: 'Market Simulation',
      description: 'See how real users would react through our virtual focus group with detailed persona feedback.',
    },
    {
      icon: Target,
      title: 'Actionable Next Steps',
      description: 'Get concrete, small tasks you can complete today - not vague advice or overwhelming roadmaps.',
    },
  ];

  const benefits = [
    'Get feedback in minutes, not weeks',
    'No meetings, no presentations, no pitch decks',
    'Validate ideas before investing time and money',
    'Track progress through multiple validation phases',
    'Built for founders who need clarity, not noise',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BoardRoom Labs</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                About
              </Link>
              <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                Pricing
              </Link>
              <Button
                onClick={onGetStarted}
                variant="outline"
                className="border-slate-700 text-slate-200 hover:bg-slate-800"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8"
            >
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-300">AI-Powered Startup Validation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Your Startup Idea
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Validated in Minutes
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Skip the guesswork. Chat with AI advisors who analyze your idea from every angle
              and give you the honest feedback you need to build something people actually want.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-xl shadow-blue-500/25 group"
              >
                Start Validating Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 text-slate-200 hover:bg-slate-800 px-8 py-6 text-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex items-center justify-center space-x-8 text-sm text-slate-400"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Results in 2 minutes</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From idea to validated concept in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-all duration-300 h-full">
                    <CardContent className="pt-6">
                      <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Built for Founders Who Value Their Time
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Stop spending weeks wondering if your idea is worth pursuing. Get expert-level
                feedback without the expensive consultants, awkward pitch meetings, or vague advice.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="h-5 w-5 text-blue-400 mt-1" />
                      <div>
                        <p className="text-slate-300 text-sm">
                          "I want to build a platform that helps remote teams..."
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/20">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="h-5 w-5 text-purple-400 mt-1" />
                      <div>
                        <p className="text-slate-300 text-sm font-medium mb-2">
                          The Board is reviewing your idea...
                        </p>
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100" />
                          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Validate Your Idea?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join founders who are building with confidence, not guesswork.
            </p>
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg shadow-xl shadow-blue-500/25"
            >
              Start Your Free Validation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">BoardRoom Labs</span>
            </div>
            <p className="text-slate-500 text-sm">
              AI-powered startup validation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
