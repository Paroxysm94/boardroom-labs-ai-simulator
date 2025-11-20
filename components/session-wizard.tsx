'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSessions } from '@/lib/hooks/use-sessions';
import type { Session } from '@/lib/database.types';

const EXAMPLE_DATA = {
  idea_name: 'TaskFlow Pro',
  idea_description: 'A smart task management app that automatically prioritizes your to-do list based on deadlines, energy levels, and meeting schedules. It integrates with your calendar and uses AI to suggest optimal work blocks.',
  target_audience: 'Remote workers and freelancers who juggle multiple projects and struggle with prioritization',
};

interface SessionWizardProps {
  onComplete: (session: Session) => void;
  onCancel: () => void;
}

export function SessionWizard({ onComplete, onCancel }: SessionWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    idea_name: '',
    idea_description: '',
    target_audience: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createSession } = useSessions();

  const fillExample = () => {
    setFormData(EXAMPLE_DATA);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const session = await createSession(formData);
      onComplete(session);
    } catch (err) {
      console.error('Failed to create session:', err);
      alert('Failed to create session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    if (step === 1) return formData.idea_name.trim().length > 0;
    if (step === 2) return formData.idea_description.trim().length > 20;
    if (step === 3) return formData.target_audience.trim().length > 10;
    return false;
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="text-slate-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={fillExample}
            className="text-slate-600"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Fill Example Data
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    s < step
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : s === step
                      ? 'bg-white border-slate-900 text-slate-900'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {s < step ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                      s < step ? 'bg-slate-900' : 'bg-slate-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" custom={step}>
          <motion.div
            key={step}
            custom={step}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <Card className="border-slate-200 shadow-xl">
              {step === 1 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-900">
                      What's your idea called?
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600">
                      Give your startup idea a clear, memorable name. This helps you and the Panel stay focused.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="idea_name" className="text-slate-700">
                        Idea Name
                      </Label>
                      <Input
                        id="idea_name"
                        placeholder="e.g., TaskFlow Pro, GreenCart, MindfulMeet"
                        value={formData.idea_name}
                        onChange={(e) =>
                          setFormData({ ...formData, idea_name: e.target.value })
                        }
                        className="text-lg border-slate-300"
                        autoFocus
                      />
                      <p className="text-sm text-slate-500">
                        Keep it simple. You can always change this later.
                      </p>
                    </div>
                  </CardContent>
                </>
              )}

              {step === 2 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-900">
                      Describe your idea
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600">
                      What problem does it solve? How does it work? Be specific but concise.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="idea_description" className="text-slate-700">
                        Description
                      </Label>
                      <Textarea
                        id="idea_description"
                        placeholder="Example: A mobile app that helps busy parents plan healthy meals by scanning their pantry and generating recipes based on what they already have. Reduces food waste and saves time."
                        value={formData.idea_description}
                        onChange={(e) =>
                          setFormData({ ...formData, idea_description: e.target.value })
                        }
                        rows={6}
                        className="border-slate-300 resize-none"
                        autoFocus
                      />
                      <p className="text-sm text-slate-500">
                        Aim for 2-3 sentences. Include the problem, solution, and key benefit.
                      </p>
                    </div>
                  </CardContent>
                </>
              )}

              {step === 3 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-900">
                      Who is this for?
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600">
                      Define your target audience clearly. The more specific, the better feedback you'll get.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="target_audience" className="text-slate-700">
                        Target Audience
                      </Label>
                      <Textarea
                        id="target_audience"
                        placeholder="Example: Small business owners (1-10 employees) who handle their own bookkeeping and are frustrated with complex accounting software."
                        value={formData.target_audience}
                        onChange={(e) =>
                          setFormData({ ...formData, target_audience: e.target.value })
                        }
                        rows={4}
                        className="border-slate-300 resize-none"
                        autoFocus
                      />
                      <p className="text-sm text-slate-500">
                        Include: company size, role, pain points, or behaviors. Avoid vague terms like "everyone."
                      </p>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="border-slate-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-slate-900 hover:bg-slate-800"
            >
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className="bg-slate-900 hover:bg-slate-800"
            >
              {isSubmitting ? 'Creating...' : 'Start Analysis'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
