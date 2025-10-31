'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, Copy, Download, Share2, Eye, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CreatePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  generatedLink?: {
    link: string;
    amount: string;
    token: string;
    description: string;
    recipientWallet: string;
  } | null;
}

export function CreatePaymentModal({
  open,
  onOpenChange,
  generatedLink,
}: CreatePaymentModalProps) {
  const [copied, setCopied] = useState(false);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleCopy = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink.link);
      setCopied(true);
      toast.success('Link copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadQR = () => {
    const qrElement = document.getElementById('modal-qr-code');
    if (qrElement) {
      const canvas = qrElement.querySelector('canvas');
      if (canvas) {
        const anchor = document.createElement('a');
        anchor.href = canvas.toDataURL('image/png');
        anchor.download = `payment-qr-${Date.now()}.png`;
        anchor.click();
        toast.success('QR code downloaded!');
      }
    }
  };

  const handleShare = async () => {
    if (generatedLink && navigator.share) {
      try {
        await navigator.share({
          title: 'Payment Link',
          text: `Pay ${generatedLink.amount} ${generatedLink.token}`,
          url: generatedLink.link,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePreview = () => {
    if (generatedLink) {
      window.open(generatedLink.link, '_blank');
    }
  };

  if (!generatedLink) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="glass border border-white/10 w-[98vw] h-[95vh] max-w-2xl p-0 overflow-hidden flex flex-col"
        onPointerDownOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        {/* Header - ONLY ONE CLOSE BUTTON */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-black/60 backdrop-blur-md shrink-0">
          <h2 className="text-3xl font-bold">Your Payment Link</h2>
          <Button
            onClick={handleClose}
            size="icon"
            className="h-10 w-10 p-0 bg-white/10 hover:bg-white/20 rounded-lg"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-8 py-8 space-y-8 max-w-2xl mx-auto w-full">
            
            {/* Success Message */}
            {/* <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-base text-green-600 font-medium">Payment link created successfully!</p>
            </div> */}

            {/* Summary Card */}
            <Card className="glass border border-white/10 p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Amount</p>
                  <p className="text-3xl md:text-4xl font-bold text-foreground">{generatedLink.amount}</p>
                  <Badge className="mt-3 bg-primary/20 text-primary border-primary/30">{generatedLink.token}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Description</p>
                  <p className="text-lg font-semibold text-foreground line-clamp-2">{generatedLink.description}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Recipient</p>
                  <p className="font-mono text-sm text-foreground break-all">{generatedLink.recipientWallet.slice(0, 10)}...{generatedLink.recipientWallet.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Status</p>
                  <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Active</Badge>
                </div>
              </div>
            </Card>

            {/* Single Column: QR Above */}
            <Card className="glass border border-white/10 p-8 flex flex-col items-center">
              <p className="text-center text-base text-muted-foreground font-medium mb-8">
                Scan to Pay
              </p>
              <div id="modal-qr-code" className="bg-white p-6 rounded-2xl mb-8">
                <QRCodeSVG
                  value={generatedLink.link}
                  size={300}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <Button
                onClick={handleDownloadQR}
                variant="outline"
                className="w-full glass border-white/20 hover:bg-white/10 h-12 text-base font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </Card>

            {/* Single Column: Link Below */}
            <Card className="glass border border-white/10 p-8 flex flex-col">
              <p className="text-base text-muted-foreground font-medium mb-4">
                Payment Link
              </p>

              {/* Link Display Box */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 font-mono text-sm text-foreground break-all mb-6 max-h-40 overflow-y-auto">
                {generatedLink.link}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleCopy}
                  className={`w-full h-12 text-base font-medium transition-all ${
                    copied
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-primary hover:bg-primary-600 text-white'
                  }`}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full h-12 glass border-white/20 hover:bg-white/10 font-medium text-base"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Link
                </Button>

                <Button
                  onClick={handlePreview}
                  variant="outline"
                  className="w-full h-12 glass border-white/20 hover:bg-white/10 font-medium text-base"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Payment
                </Button>
              </div>
            </Card>

            {/* Tip Box */}
            <Card className="glass border border-white/10 p-6 bg-blue-500/5">
              <p className="text-sm text-blue-400">
                <span className="font-bold">Tip:</span> Share the payment link via email, SMS, or social media. Customers can scan the QR code or click the link to pay instantly.
              </p>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
