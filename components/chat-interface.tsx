'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Upload,
  Sparkles,
  Loader2,
  FileText,
  X,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useSessions } from '@/lib/hooks/use-sessions';
import type { Session } from '@/lib/database.types';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onSessionCreated: (session: Session) => void;
  onBack?: () => void;
}

export function ChatInterface({ onSessionCreated, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm here to help validate your startup idea. Tell me what you're building, or upload a document describing your concept. I'll ask a few quick questions to understand it better.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationStep, setConversationStep] = useState<'initial' | 'name' | 'audience' | 'complete'>('initial');
  const [ideaData, setIdeaData] = useState({
    description: '',
    name: '',
    audience: '',
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createSession } = useSessions();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (type: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    addMessage('user', `Uploaded: ${file.name}`);

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const preview = text.slice(0, 500);

      setIdeaData(prev => ({ ...prev, description: text }));

      setTimeout(() => {
        addMessage('assistant', "Great! I've read your document. Now, let me ask a few questions to complete the picture.");
        setTimeout(() => {
          addMessage('assistant', "What should we call this idea? Give it a short, memorable name.");
          setConversationStep('name');
          setIsProcessing(false);
        }, 800);
      }, 1000);
    };

    reader.readAsText(file);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    addMessage('user', userMessage);
    setInput('');
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (conversationStep === 'initial') {
      setIdeaData(prev => ({ ...prev, description: userMessage }));
      addMessage('assistant', "Interesting! I can already see potential here. Let's give this idea a name - what should we call it?");
      setConversationStep('name');
    } else if (conversationStep === 'name') {
      setIdeaData(prev => ({ ...prev, name: userMessage }));
      addMessage('assistant', `Perfect! "${userMessage}" is a great name. Now, who is this for? Describe your target audience as specifically as possible.`);
      setConversationStep('audience');
    } else if (conversationStep === 'audience') {
      setIdeaData(prev => ({ ...prev, audience: userMessage }));
      addMessage('assistant', "Excellent! I have everything I need. Let me submit this to the Board for review...");

      setTimeout(async () => {
        try {
          const session = await createSession({
            idea_name: ideaData.name,
            idea_description: ideaData.description,
            target_audience: userMessage,
          });

          addMessage('assistant', "Your idea has been submitted! The Board is now analyzing it. You'll see their feedback in just a moment...");

          setTimeout(() => {
            onSessionCreated(session);
          }, 1500);
        } catch (error) {
          addMessage('assistant', "Sorry, there was an error submitting your idea. Please try again.");
          setIsProcessing(false);
        }
      }, 1500);
    }

    setIsProcessing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d]">
      <div className="border-b border-slate-800/50 bg-[#0d0d0d]/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="text-slate-400 hover:text-white hover:bg-slate-800 -ml-2"
                >
                  ← Back
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg blur-sm opacity-75" />
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 rounded-lg">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-white">BoardRoom Labs</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-8`}
              >
                <div className={`flex items-start gap-4 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user'
                      ? 'bg-[#19c37d] ring-1 ring-[#19c37d]/20'
                      : 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-purple-500/20'
                  }`}>
                    {message.type === 'user' ? (
                      <span className="text-white text-xs font-medium">You</span>
                    ) : (
                      <Sparkles className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-xs font-medium text-slate-400 mb-1.5">
                      {message.type === 'user' ? 'You' : 'BoardRoom AI'}
                    </div>
                    <div className={`${
                      message.type === 'user'
                        ? 'text-white'
                        : 'text-slate-200'
                    }`}>
                      <p className="text-[15px] leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-8"
            >
              <div className="flex items-start gap-4 max-w-[85%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-purple-500/20 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="text-xs font-medium text-slate-400 mb-1.5">BoardRoom AI</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-slate-800/50 bg-[#0d0d0d]/95 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {uploadedFile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 flex items-center gap-3 bg-slate-800/50 rounded-xl p-3 border border-slate-700/50"
            >
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FileText className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-sm text-slate-300 flex-1 font-medium">{uploadedFile.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUploadedFile(null)}
                className="text-slate-400 hover:text-slate-200 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          <div className="flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.md,.doc,.docx,.pdf"
              className="hidden"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing || conversationStep !== 'initial'}
              className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 flex-shrink-0 h-12 w-12 rounded-xl"
            >
              <Upload className="h-5 w-5" />
            </Button>

            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message BoardRoom AI..."
                disabled={isProcessing}
                rows={1}
                className="resize-none bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder:text-slate-500 focus:border-slate-600 focus:ring-1 focus:ring-slate-600 rounded-xl pr-12 min-h-[48px] max-h-[120px] shadow-lg"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isProcessing}
                size="icon"
                className="absolute right-2 bottom-2 h-8 w-8 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 rounded-lg transition-colors"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
