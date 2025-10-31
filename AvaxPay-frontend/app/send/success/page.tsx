'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Copy, ExternalLink, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { shortenAddress } from '@/lib/utils';

export default function SendSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txHash = searchParams.get('tx') || '';
  const to = searchParams.get('to') || '';
  const amount = searchParams.get('amount') || '';
  const token = searchParams.get('token') || 'AVAX';
  const [copied, setCopied] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(txHash);
    setCopied(true);
    toast.success('Transaction hash copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/send?to=${to}&amount=${amount}&token=${token}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Link',
          text: `Pay ${amount} ${token} on AvaxPay`,
          url: shareUrl,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 pt-20">
      <Card className="glass border border-white/10 p-12 max-w-md text-center space-y-6">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-secondary" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold">Payment Sent!</h1>

        {/* Payment Summary */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-1">Amount Sent</p>
            <p className="text-2xl font-bold text-gradient">
              {amount} {token}
            </p>
          </div>
          <div className="border-t border-white/10 pt-3">
            <p className="text-muted-foreground text-xs mb-1">To Address</p>
            <p className="font-mono text-sm text-foreground">{shortenAddress(to)}</p>
          </div>
        </div>

        {/* Transaction Hash */}
        {txHash && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
            <p className="text-sm text-muted-foreground">Transaction Hash</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-foreground break-all flex-1">
                {txHash}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyHash}
                className="shrink-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <a
              href={`https://testnet.snowtrace.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                variant="outline"
                className="w-full glass border-white/20"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Snowtrace
              </Button>
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleShare}
            className="w-full bg-primary hover:bg-primary-600 text-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Payment Link
          </Button>
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            className="w-full glass border-white/20"
          >
            Go to Dashboard
          </Button>
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full glass border-white/20"
          >
            Back to Home
          </Button>
        </div>

        {/* Share Link */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
          <p className="text-xs text-blue-600 mb-2">💾 Payment Link</p>
          <p className="font-mono text-xs text-blue-600 break-all">
            {`${window.location.origin}/send?to=${to}&amount=${amount}&token=${token}`}
          </p>
        </div>
      </Card>
    </div>
  );
}
