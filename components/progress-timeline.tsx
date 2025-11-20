'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgressTimelineProps {
  currentStage: string;
  hasPatternCheck: boolean;
  hasMarketSim: boolean;
  hasEvidenceCheck: boolean;
}

const stages = [
  {
    id: 'pattern_check',
    label: 'Pattern Check',
    description: 'Initial board review',
  },
  {
    id: 'market_sim',
    label: 'Market Simulation',
    description: 'Virtual focus group',
  },
  {
    id: 'evidence_check',
    label: 'Evidence Check',
    description: 'Data validation',
  },
  {
    id: 'completed',
    label: 'Completed',
    description: 'Ready to execute',
  },
];

export function ProgressTimeline({
  currentStage,
  hasPatternCheck,
  hasMarketSim,
  hasEvidenceCheck,
}: ProgressTimelineProps) {
  const getStageStatus = (stageId: string) => {
    if (stageId === 'pattern_check') return hasPatternCheck ? 'completed' : 'pending';
    if (stageId === 'market_sim') return hasMarketSim ? 'completed' : hasPatternCheck ? 'current' : 'pending';
    if (stageId === 'evidence_check') return hasEvidenceCheck ? 'completed' : hasMarketSim ? 'current' : 'pending';
    if (stageId === 'completed') return hasEvidenceCheck ? 'completed' : 'pending';
    return 'pending';
  };

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900 flex items-center">
          <Clock className="mr-2 h-6 w-6" />
          Your Progress
        </CardTitle>
        <CardDescription>
          Track your validation journey from idea to execution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stages.map((stage, index) => {
            const status = getStageStatus(stage.id);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            const isPending = status === 'pending';

            return (
              <div key={stage.id} className="relative">
                {index < stages.length - 1 && (
                  <div
                    className={`absolute left-5 top-11 w-0.5 h-6 transition-colors duration-500 ${
                      isCompleted ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  />
                )}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 flex-shrink-0 ${
                      isCompleted
                        ? 'bg-slate-900 border-slate-900'
                        : isCurrent
                        ? 'bg-white border-slate-900 ring-4 ring-slate-900/20'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : isCurrent ? (
                      <Circle className="h-6 w-6 text-slate-900 fill-slate-900" />
                    ) : (
                      <Circle className="h-6 w-6 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <h4
                      className={`font-semibold transition-colors duration-300 ${
                        isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {stage.label}
                    </h4>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isCompleted || isCurrent ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {stage.description}
                    </p>
                    {isCurrent && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2"
                      >
                        <span className="text-xs font-medium text-slate-900 bg-slate-100 px-2 py-1 rounded">
                          In Progress
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
