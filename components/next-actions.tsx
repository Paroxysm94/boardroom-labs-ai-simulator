'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import type { NextAction } from '@/lib/database.types';

interface NextActionsProps {
  actions: NextAction[];
  onToggle: (actionId: string, isCompleted: boolean) => void;
}

export function NextActions({ actions, onToggle }: NextActionsProps) {
  if (actions.length === 0) return null;

  const completedCount = actions.filter(a => a.is_completed).length;
  const totalCount = actions.length;
  const progressPercent = (completedCount / totalCount) * 100;

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900 flex items-center">
          <Target className="mr-2 h-6 w-6" />
          Your Next Actions
        </CardTitle>
        <CardDescription>
          Small, concrete steps to move your idea forward. Focus on one at a time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-700">
            Progress: {completedCount} of {totalCount} completed
          </span>
          <span className="font-semibold text-slate-900">
            {Math.round(progressPercent)}%
          </span>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2">
          <motion.div
            className="bg-slate-900 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <div className="space-y-3 pt-2">
          {actions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                action.is_completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="pt-0.5">
                <Checkbox
                  id={action.id}
                  checked={action.is_completed}
                  onCheckedChange={(checked) => onToggle(action.id, checked as boolean)}
                  className="h-5 w-5"
                />
              </div>
              <label
                htmlFor={action.id}
                className={`flex-1 text-sm cursor-pointer transition-all duration-200 ${
                  action.is_completed
                    ? 'text-slate-500 line-through'
                    : 'text-slate-900'
                }`}
              >
                {action.action_text}
              </label>
              {action.is_completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-slate-300 flex-shrink-0" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-amber-900">
            <span className="font-semibold">Remember:</span> These actions are designed to be completed in hours or days, not weeks.
            Pick one, do it today, then come back and check it off.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
