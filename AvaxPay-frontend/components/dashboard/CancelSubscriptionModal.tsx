'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';
import { shortenAddress } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriberAddress: string;
  amount: string;
  onConfirm: () => Promise<void>;
}

export function CancelSubscriptionModal({
  isOpen,
  onClose,
  subscriberAddress,
  amount,
  onConfirm,
}: CancelSubscriptionModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      toast.success('Subscription cancelled successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to cancel subscription');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="glass border-white/10">
        <AlertDialogHeader>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-muted-foreground">
                You&apos;re about to cancel the subscription for{' '}
                <span className="font-mono text-foreground">
                  {shortenAddress(subscriberAddress)}
                </span>
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Details */}
        <div className="space-y-3 my-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subscription Amount:</span>
            <span className="font-semibold text-foreground">${amount}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            This action cannot be undone. The subscriber will need to create a new subscription to continue payments.
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <AlertDialogCancel className="glass border-white/20">
            Keep Subscription
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isLoading ? 'Cancelling...' : 'Yes, Cancel Subscription'}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
