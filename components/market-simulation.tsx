'use client';

import { motion } from 'framer-motion';
import { Users, MessageSquare, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { MarketPersona } from '@/lib/database.types';

interface MarketSimulationProps {
  personas: MarketPersona[];
  isLoading?: boolean;
  onRunSimulation?: () => void;
}

export function MarketSimulation({
  personas,
  isLoading,
  onRunSimulation,
}: MarketSimulationProps) {
  if (isLoading) {
    return (
      <Card className="border-slate-200">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              <Users className="h-12 w-12 text-slate-400" />
            </motion.div>
            <p className="mt-4 text-slate-600 font-medium">
              Simulating market reactions...
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Generating virtual user personas
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (personas.length === 0 && onRunSimulation) {
    return (
      <Card className="border-2 border-dashed border-slate-300">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900 flex items-center">
            <Users className="mr-2 h-6 w-6" />
            Virtual Focus Group
          </CardTitle>
          <CardDescription>
            See how potential users would react to your idea
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-slate-600 mb-6">
              Run a market simulation to get realistic feedback from virtual user personas
            </p>
            <Button
              onClick={onRunSimulation}
              size="lg"
              className="bg-slate-900 hover:bg-slate-800"
            >
              <Users className="mr-2 h-5 w-5" />
              Run Market Simulation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-slate-900">
        <Users className="h-6 w-6" />
        <h3 className="text-2xl font-bold">Virtual Focus Group</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <Card className="border-slate-200 hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 flex items-start justify-between">
                  <span>{persona.persona_name}</span>
                  <div
                    className={`text-sm font-semibold px-2 py-1 rounded ${
                      persona.willingness_to_buy >= 70
                        ? 'bg-green-100 text-green-700'
                        : persona.willingness_to_buy >= 50
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {persona.willingness_to_buy}%
                  </div>
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {persona.persona_description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-start space-x-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-slate-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      "{persona.reaction_quote}"
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Willingness to Buy
                    </span>
                    <TrendingUp
                      className={`h-4 w-4 ${
                        persona.willingness_to_buy >= 70
                          ? 'text-green-600'
                          : persona.willingness_to_buy >= 50
                          ? 'text-amber-600'
                          : 'text-red-600'
                      }`}
                    />
                  </div>
                  <Progress
                    value={persona.willingness_to_buy}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">
                Insight from the Focus Group
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                Average interest is{' '}
                <span className="font-semibold">
                  {Math.round(
                    personas.reduce((sum, p) => sum + p.willingness_to_buy, 0) / personas.length
                  )}%
                </span>
                . Common themes: pricing clarity, integration needs, and learning curve concerns.
                Use this feedback to refine your value proposition.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
