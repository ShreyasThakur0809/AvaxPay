'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';

interface PaymentLinkFormProps {
  onSubmit: (data: PaymentLinkData) => Promise<void>;
  loading?: boolean;
}

export interface PaymentLinkData {
  recipientWallet: string;
  amount: string;
  token: 'AVAX' | 'USDC' | 'USDT';
  description: string;
  email?: string;
  memo?: string;
}

export function CreatePaymentLinkForm({
  onSubmit,
  loading = false,
}: PaymentLinkFormProps) {
  const [formData, setFormData] = useState<PaymentLinkData>({
    recipientWallet: '',
    amount: '',
    token: 'AVAX',
    description: '',
    email: '',
    memo: '',
  });

  const [errors, setErrors] = useState<Partial<PaymentLinkData>>({});

  const validateAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address) || /^X-[A-Za-z0-9]{20,}$/.test(address);
  };

  const validateForm = () => {
    const newErrors: Partial<PaymentLinkData> = {};

    if (!formData.recipientWallet || formData.recipientWallet.trim().length === 0) {
      newErrors.recipientWallet = 'Recipient wallet address is required';
    } else if (!validateAddress(formData.recipientWallet)) {
      newErrors.recipientWallet = 'Invalid wallet address format';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.description || formData.description.trim().length === 0) {
      newErrors.description = 'Description is required';
    }

    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({
        recipientWallet: '',
        amount: '',
        token: 'AVAX',
        description: '',
        email: '',
        memo: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="glass border border-white/10 p-8">
      <h2 className="text-2xl font-bold mb-6">Create Payment Link</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient Wallet Address - MANDATORY */}
        <div className="space-y-2">
          <Label htmlFor="recipientWallet" className="flex items-center gap-2">
            <span>Recipient Wallet Address</span>
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="recipientWallet"
            type="text"
            placeholder="0x1234... or X-Chain..."
            value={formData.recipientWallet}
            onChange={(e) =>
              setFormData({ ...formData, recipientWallet: e.target.value })
            }
            className={`glass border-white/10 font-mono text-sm ${
              errors.recipientWallet ? 'border-destructive' : ''
            }`}
          />
          {errors.recipientWallet && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4" />
              {errors.recipientWallet}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Enter the Avalanche wallet address where payments will be received
          </p>
        </div>

        {/* Amount and Token */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">
              <span>Amount</span>
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="100.00"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className={`glass border-white/10 ${
                errors.amount ? 'border-destructive' : ''
              }`}
            />
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount}</p>
            )}
          </div>

          {/* Token Selection */}
          <div className="space-y-2">
            <Label htmlFor="token">
              <span>Token</span>
              <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.token}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  token: value as 'AVAX' | 'USDC' | 'USDT',
                })
              }
            >
              <SelectTrigger className="glass border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-white/10">
                <SelectItem value="AVAX">AVAX (Native)</SelectItem>
                <SelectItem value="USDC">USDC (Stablecoin)</SelectItem>
                <SelectItem value="USDT">USDT (Stablecoin)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">
            <span>Description</span>
            <span className="text-destructive">*</span>
          </Label>
          <Input
            id="description"
            type="text"
            placeholder="E.g., Monthly subscription fee"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className={`glass border-white/10 ${
              errors.description ? 'border-destructive' : ''
            }`}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description}</p>
          )}
        </div>

        {/* Email (Optional) */}
        {/* <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="customer@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`glass border-white/10 ${
              errors.email ? 'border-destructive' : ''
            }`}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Optional: Send the payment link to this email
          </p>
        </div> */}

        {/* Memo (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="memo">Memo</Label>
          <Input
            id="memo"
            type="text"
            placeholder="E.g., Order #12345, Invoice reference"
            value={formData.memo}
            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
            className="glass border-white/10"
          />
          <p className="text-xs text-muted-foreground">
            Optional: Add a note or reference for this payment
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-600 text-white h-12 text-base font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Link...
            </>
          ) : (
            'Create Payment Link'
          )}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          This will generate a unique payment link that you can share with customers.
        </p>
      </form>
    </Card>
  );
}
