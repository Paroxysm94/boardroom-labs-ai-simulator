'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface EvidenceCheckProps {
  onSubmitEvidence: (evidence: string) => void;
  isLoading?: boolean;
  hasEvidence?: boolean;
}

export function EvidenceCheck({
  onSubmitEvidence,
  isLoading,
  hasEvidence = false,
}: EvidenceCheckProps) {
  const [evidence, setEvidence] = useState('');

  const handleSubmit = () => {
    if (evidence.trim().length > 20) {
      onSubmitEvidence(evidence);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-slate-200">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <FileCheck className="h-12 w-12 text-slate-400" />
            </motion.div>
            <p className="mt-4 text-slate-600 font-medium">
              Analyzing your evidence...
            </p>
            <p className="text-sm text-slate-500 mt-1">
              The Board is updating their scores
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900 flex items-center">
          <FileCheck className="mr-2 h-6 w-6" />
          Evidence Check
        </CardTitle>
        <CardDescription>
          Share real-world data and feedback you've gathered. The Board will update their scores based on your validation efforts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {hasEvidence && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800 font-medium">
              Evidence submitted successfully! The Board has updated their scores above.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2">What to Include:</h4>
            <ul className="space-y-1 text-sm text-slate-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>User interviews and direct quotes from potential customers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Conversion rates from landing pages or prototypes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Survey results with specific numbers and percentages</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Pre-orders, waitlist signups, or pilot program results</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Competitive analysis and market research findings</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="evidence" className="text-slate-700">
              Your Evidence & Data
            </Label>
            <Textarea
              id="evidence"
              placeholder="Example: I interviewed 15 small business owners. 12 said they'd pay $50/month for this. Key quote from Sarah: 'This would save me 5 hours a week.' I also created a landing page that converted at 8% (industry average is 2-3%)."
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              rows={8}
              className="border-slate-300 resize-none"
            />
            <p className="text-sm text-slate-500">
              Be specific. Include numbers, quotes, and sources. The more concrete your evidence, the better the updated feedback.
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={evidence.trim().length < 20}
            size="lg"
            className="w-full bg-slate-900 hover:bg-slate-800"
          >
            <Send className="mr-2 h-5 w-5" />
            Submit Evidence for Review
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Pro tip:</span> The Board values real data over assumptions.
            Even small-scale validation (5-10 conversations) is better than elaborate plans with no evidence.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
