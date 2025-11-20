'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Info,
  Wrench,
  Briefcase,
  TrendingUp,
  DollarSign,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import type { AdvisorFeedback } from '@/lib/database.types';

const advisorInfo = {
  operator: {
    title: 'The Operator',
    subtitle: 'Operations & Execution',
    icon: Briefcase,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  growth: {
    title: 'The Growth Lead',
    subtitle: 'Marketing & Acquisition',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  finance: {
    title: 'The Finance Expert',
    subtitle: 'Numbers & Sustainability',
    icon: DollarSign,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  product: {
    title: 'The Product Guru',
    subtitle: 'UX & Value Proposition',
    icon: Lightbulb,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  skeptic: {
    title: 'The Skeptic',
    subtitle: 'Risk Analysis',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
};

interface BoardViewProps {
  feedback: AdvisorFeedback[];
  isLoading?: boolean;
  onRunAnalysis?: () => void;
  showOldScores?: boolean;
  oldFeedback?: AdvisorFeedback[];
}

export function BoardView({
  feedback,
  isLoading,
  onRunAnalysis,
  showOldScores = false,
  oldFeedback = [],
}: BoardViewProps) {
  const [expandedAdvisor, setExpandedAdvisor] = useState<string | null>(null);

  const radarData = feedback.map((f) => ({
    advisor: advisorInfo[f.advisor_type as keyof typeof advisorInfo]?.title.replace('The ', '') || f.advisor_type,
    score: f.score,
  }));

  const getOldScore = (advisorType: string) => {
    if (!showOldScores || oldFeedback.length === 0) return null;
    const old = oldFeedback.find(f => f.advisor_type === advisorType);
    return old?.score;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="border-slate-200">
          <CardContent className="flex items-center justify-center py-16">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                <Briefcase className="h-12 w-12 text-slate-400" />
              </motion.div>
              <p className="mt-4 text-slate-600 font-medium">
                The Board is reviewing your idea...
              </p>
              <p className="text-sm text-slate-500 mt-1">
                This takes about 2 seconds
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (feedback.length === 0 && onRunAnalysis) {
    return (
      <Card className="border-2 border-dashed border-slate-300">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Briefcase className="h-16 w-16 text-slate-400 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Ready for Board Review
          </h3>
          <p className="text-slate-600 mb-6 text-center max-w-md">
            Submit your idea to the Panel for expert analysis and actionable feedback
          </p>
          <Button
            onClick={onRunAnalysis}
            size="lg"
            className="bg-slate-900 hover:bg-slate-800"
          >
            Get Board Feedback
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">Board Consensus</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis
                dataKey="advisor"
                tick={{ fill: '#475569', fontSize: 12 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: '#94a3b8' }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#0f172a"
                fill="#0f172a"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {feedback.map((f, index) => {
          const info = advisorInfo[f.advisor_type as keyof typeof advisorInfo];
          if (!info) return null;

          const Icon = info.icon;
          const isExpanded = expandedAdvisor === f.advisor_type;
          const oldScore = getOldScore(f.advisor_type);

          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={`border-2 ${info.borderColor} hover:shadow-lg transition-all duration-300 cursor-pointer`}
                onClick={() => setExpandedAdvisor(isExpanded ? null : f.advisor_type)}
              >
                <CardHeader className={info.bgColor}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-white ${info.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-900">
                          {info.title}
                        </CardTitle>
                        <p className="text-sm text-slate-600">{info.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {oldScore !== null && oldScore !== undefined && showOldScores && (
                        <div className="text-sm text-slate-500 line-through mb-1">
                          {oldScore.toFixed(1)}
                        </div>
                      )}
                      <Badge
                        variant="outline"
                        className={`text-lg font-bold ${
                          f.score >= 8
                            ? 'bg-green-100 text-green-700 border-green-300'
                            : f.score >= 6
                            ? 'bg-amber-100 text-amber-700 border-amber-300'
                            : 'bg-red-100 text-red-700 border-red-300'
                        }`}
                      >
                        {f.score.toFixed(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 rounded bg-blue-50 flex-shrink-0">
                        <Info className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-900 mb-1">
                          The Why
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {f.diagnosis}
                        </p>
                      </div>
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start space-x-3 pt-4 border-t border-slate-200"
                      >
                        <div className="p-1.5 rounded bg-green-50 flex-shrink-0">
                          <Wrench className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-slate-900 mb-1">
                            The Fix
                          </h4>
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {f.prescription}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {!isExpanded && (
                      <p className="text-xs text-slate-500 italic">
                        Click to see actionable steps
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
