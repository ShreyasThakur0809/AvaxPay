'use client';

import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { PageLayout } from '@/components/layout/PageLayout';
import { CreatePaymentLinkForm, PaymentLinkData } from '@/components/payment/CreatePaymentLinkForm';
import { CreatePaymentModal } from '@/components/payment/CreatePaymentModal';
import { PaymentLinkHistory } from '@/components/payment/PaymentLinkHistory';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

interface GeneratedLink {
  id: string;
  recipientWallet: string;
  amount: string;
  token: string;
  description: string;
  link: string;
  createdAt: number;
  views: number;
  status: 'active' | 'inactive' | 'expired';
}

export default function CreatePaymentLinkPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<{
    link: string;
    amount: string;
    token: string;
    description: string;
    recipientWallet: string;
  } | null>(null);
  const [paymentLinks, setPaymentLinks] = useState<GeneratedLink[]>([
    {
      id: '1',
      recipientWallet: '0x60be863b6a27d78da0b89c088a8a9f23a1d02817',
      amount: '100',
      token: 'AVAX',
      description: 'Monthly subscription',
      link: 'http://localhost:3000/send?to=0x60be863b6a27d78da0b89c088a8a9f23a1d02817&amount=100&token=AVAX&label=Monthly%20subscription',
      createdAt: Math.floor(Date.now() / 1000) - 86400 * 2,
      views: 45,
      status: 'active',
    },
  ]);

  const handleCreateLink = async (data: PaymentLinkData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const queryLink = `${window.location.origin}/send?to=${
        data.recipientWallet
      }&amount=${data.amount}&token=${data.token}&label=${encodeURIComponent(
        data.description
      )}&memo=${encodeURIComponent(data.email || '')}`;

      const newLink: GeneratedLink = {
        id: Date.now().toString(),
        recipientWallet: data.recipientWallet,
        amount: data.amount,
        token: data.token,
        description: data.description,
        link: queryLink,
        createdAt: Math.floor(Date.now() / 1000),
        views: 0,
        status: 'active',
      };

      setGeneratedLink({
        link: queryLink,
        amount: data.amount,
        token: data.token,
        description: data.description,
        recipientWallet: data.recipientWallet,
      });

      setPaymentLinks([newLink, ...paymentLinks]);
      toast.success('Payment link created successfully!');
      setModalOpen(true);
    } catch (error) {
      toast.error('Failed to create payment link');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = (id: string) => {
    setPaymentLinks(paymentLinks.filter((link) => link.id !== id));
    toast.success('Payment link deleted');
  };

  return (
    <ProtectedRoute>
      <PageLayout
        title="Create Payment Link"
        description="Generate shareable payment links for your customers."
      >
        <div className="space-y-12">
          {/* Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CreatePaymentLinkForm
                onSubmit={handleCreateLink}
                loading={loading}
              />
            </div>

            {/* Quick Reference */}
            <div className="space-y-6">
              <div className="glass rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4">Current Settings</h3>
                <p className="text-sm text-muted-foreground">
                  No payment link created yet
                </p>
              </div>

              <div className="glass rounded-2xl border p-6 bg-primary/5 border-primary/20">
                <h3 className="text-lg font-semibold mb-3">Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Double-check recipient address</li>
                  <li>Use clear descriptions</li>
                  <li>Test on testnet first</li>
                  <li>Share via QR code</li>
                </ul>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Links</h2>
            <PaymentLinkHistory
              links={paymentLinks}
              onDelete={handleDeleteLink}
              onCopy={(link) => {
                navigator.clipboard.writeText(link);
                toast.success('Link copied!');
              }}
            />
          </div>
        </div>
      </PageLayout>

      {/* Modal - QR + Link Only */}
      <CreatePaymentModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        generatedLink={generatedLink}
      />
    </ProtectedRoute>
  );
}
