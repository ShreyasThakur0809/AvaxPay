'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Share2, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentLinkDisplayProps {
  link: string;
  amount: string;
  token: string;
  description: string;
  recipientWallet: string;
  onPreview?: () => void;  // Add this line
}

export function PaymentLinkDisplay({
  link,
  amount,
  token,
  description,
  recipientWallet,
  onPreview,  // Add this line
}: PaymentLinkDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const qrElement = document.getElementById('qr-code');
    if (qrElement) {
      const canvas = qrElement.querySelector('canvas');
      if (canvas) {
        const anchor = document.createElement('a');
        anchor.href = canvas.toDataURL('image/png');
        anchor.download = `payment-link-${Date.now()}.png`;
        anchor.click();
        toast.success('QR code downloaded!');
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Link',
          text: `Pay ${amount} ${token} for: ${description}`,
          url: link,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error('Share not supported on this device');
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="glass border border-white/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Amount</p>
            <p className="text-2xl font-bold text-primary">{amount}</p>
            <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
              {token}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Description</p>
            <p className="text-lg font-semibold text-foreground">{description}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Recipient</p>
            <p className="font-mono text-sm text-foreground">
              {recipientWallet.slice(0, 10)}...{recipientWallet.slice(-8)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <Badge className="bg-secondary/20 text-secondary border-secondary/30">
              Active
            </Badge>
          </div>
        </div>
      </Card>

      {/* QR Code & Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* QR Code */}
        <Card className="glass border border-white/10 p-8 flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground mb-4">Scan to Pay</p>
          <div id="qr-code" className="bg-white p-4 rounded-lg">
            <QRCodeSVG value={link} size={256} level="H" includeMargin={true} />
          </div>
          <Button
            onClick={handleDownloadQR}
            variant="outline"
            className="glass border-white/20 mt-4 w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
        </Card>

        {/* Payment Link */}
        <Card className="glass border border-white/10 p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-3">Payment Link</p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4 break-all font-mono text-sm text-foreground">
              {link}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleCopy}
              className={`w-full transition-all ${
                copied
                  ? 'bg-secondary hover:bg-secondary'
                  : 'bg-primary hover:bg-primary-600'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full glass border-white/20"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>

            {onPreview && (
              <Button
                onClick={onPreview}
                variant="outline"
                className="w-full glass border-white/20"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Payment
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Info Box */}
      <Card className="glass border border-white/10 p-6 bg-secondary/5">
        <h3 className="font-semibold mb-3 text-foreground">💡 How to Use</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✓ Copy the payment link and send it to your customer</li>
          <li>✓ Share the QR code on social media or print it</li>
          <li>✓ Customer can scan the QR or click the link to pay instantly</li>
          <li>✓ Funds automatically go to {recipientWallet.slice(0, 10)}...{recipientWallet.slice(-8)}</li>
          <li>✓ Payment confirmed on Avalanche blockchain</li>
        </ul>
      </Card>
    </div>
  );
}
