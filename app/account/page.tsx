'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Key, Bell, CreditCard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            Back to Dashboard
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Account Settings</h1>
            <p className="text-slate-400">Manage your account preferences and settings</p>
          </div>

          <div className="space-y-6">
            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white">Profile Information</CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="bg-slate-900 border-slate-700 text-slate-400"
                  />
                  <p className="text-xs text-slate-500">Email cannot be changed at this time</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-slate-300">User ID</Label>
                  <Input
                    id="userId"
                    type="text"
                    value={user.id}
                    disabled
                    className="bg-slate-900 border-slate-700 text-slate-400 font-mono text-xs"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white">Password & Security</CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Change Password
                </Button>
                <Separator className="bg-slate-700" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-400">Add an extra layer of security</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white">Notifications</CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  Choose what notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">Email Notifications</p>
                    <p className="text-xs text-slate-400">Receive updates about your validations</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Separator className="bg-slate-700" />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">Marketing Emails</p>
                    <p className="text-xs text-slate-400">Receive tips and product updates</p>
                  </div>
                  <Switch
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white">Billing & Subscription</CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  Manage your subscription and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <div>
                    <p className="text-sm font-medium text-white">Current Plan</p>
                    <p className="text-xs text-slate-400">Starter (Free)</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/pricing')}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    Upgrade
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-800/50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-400" />
                  <CardTitle className="text-white">Danger Zone</CardTitle>
                </div>
                <CardDescription className="text-slate-400">
                  Irreversible account actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-950/20 rounded-lg border border-red-900/50">
                  <div>
                    <p className="text-sm font-medium text-white">Sign Out</p>
                    <p className="text-xs text-slate-400">Sign out of your account</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={signOut}
                    className="border-red-700 text-red-400 hover:bg-red-950"
                  >
                    Sign Out
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-950/20 rounded-lg border border-red-900/50">
                  <div>
                    <p className="text-sm font-medium text-white">Delete Account</p>
                    <p className="text-xs text-slate-400">Permanently delete your account and data</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-700 text-red-400 hover:bg-red-950"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
