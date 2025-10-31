'use client';

import { useEffect, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, XCircle, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { AVAXPAY_PROCESSOR_ABI, getProcessorAddress } from '@/lib/contract';
import { getNetwork, getExplorerTxUrl } from '@/lib/contracts';
import { shortenAddress } from '@/lib/utils';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function SendPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const { writeContract, data: hash, error, isPending, status } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ 
    hash,
    confirmations: 1 
  });

  const processorAddress = getProcessorAddress(chainId);
  const network = getNetwork(chainId);

  // Parse payment details
  const paymentDetails = useMemo(() => ({
    to: searchParams.get('to') || '',
    amount: searchParams.get('amount') || '',
    token: (searchParams.get('token') || 'AVAX') as 'AVAX' | 'USDC' | 'USDT',
    label: searchParams.get('label') || '',
    memo: searchParams.get('memo') || '',
  }), [searchParams]);

  useEffect(() => {
    if (error) {
      console.error('Payment error:', error);
      toast.error(`Error: ${error.message}`);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess && hash) {
      console.log('Payment successful:', hash);
      toast.success('Payment sent successfully!');
      setTimeout(() => {
        router.push(
          `/send/success?tx=${hash}&to=${paymentDetails.to}&amount=${paymentDetails.amount}&token=${paymentDetails.token}`
        );
      }, 2000);
    }
  }, [isSuccess, hash, paymentDetails, router]);

  const handleSendPayment = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (chainId !== 43113 && chainId !== 43114) {
      toast.error('Please switch to Avalanche network (Fuji or Mainnet)');
      return;
    }

    if (!paymentDetails.to || !paymentDetails.amount) {
      toast.error('Invalid payment details');
      return;
    }

    // Validate recipient address
    if (!/^0x[a-fA-F0-9]{40}$/.test(paymentDetails.to)) {
      toast.error('Invalid recipient address');
      return;
    }

    try {
      const amountInWei = parseEther(paymentDetails.amount);

      if (paymentDetails.token === 'AVAX') {
        // Native AVAX payment
        console.log('Processing AVAX payment:', {
          to: paymentDetails.to,
          amount: paymentDetails.amount,
          processorAddress,
          label: paymentDetails.label,
          memo: paymentDetails.memo
        });

        writeContract({
          address: processorAddress,
          abi: AVAXPAY_PROCESSOR_ABI,
          functionName: 'processPayment',
          args: [
            paymentDetails.to as `0x${string}`,
            paymentDetails.label || 'Payment',
            paymentDetails.memo || '',
          ],
          value: amountInWei,
        });
      } else {
        toast.error('Token payments coming soon!');
      }
    } catch (err) {
      console.error('Error initiating payment:', err);
      toast.error('Failed to initiate payment');
    }
  };

  const isValidRequest = paymentDetails.to && paymentDetails.amount;
  const explorerTxUrl = hash && network ? getExplorerTxUrl(chainId, hash) : '';

  return (
    <div className="min-h-screen bg-background">
      

      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Complete Payment</h1>
          <p className="text-muted-foreground">Review and send your payment</p>
        </div>

        {!isValidRequest ? (
          <Card className="glass border border-white/10 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Invalid Payment Link</h3>
            <p className="text-muted-foreground mb-6">
              This payment link is invalid or expired
            </p>
            <Link href="/create-payment-link">
              <Button>Create New Payment Link</Button>
            </Link>
          </Card>
        ) : (
          <Card className="glass border border-white/10 p-8 space-y-6">
            {/* Payment Details */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
              <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-lg">
                {/* Amount */}
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gradient">
                      {paymentDetails.amount}
                    </div>
                    <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                      {paymentDetails.token}
                    </Badge>
                  </div>
                </div>

                {/* Recipient */}
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <span className="text-muted-foreground">Recipient</span>
                  <span className="font-mono text-sm">
                    {shortenAddress(paymentDetails.to)}
                  </span>
                </div>

                {/* Label */}
                {paymentDetails.label && (
                  <div className="flex justify-between border-t border-white/10 pt-4">
                    <span className="text-muted-foreground">Description</span>
                    <span className="text-right">{paymentDetails.label}</span>
                  </div>
                )}

                {/* Memo */}
                {paymentDetails.memo && (
                  <div className="flex justify-between border-t border-white/10 pt-4">
                    <span className="text-muted-foreground">Memo</span>
                    <span className="text-sm text-right">{paymentDetails.memo}</span>
                  </div>
                )}

                {/* Network */}
                <div className="flex justify-between border-t border-white/10 pt-4">
                  <span className="text-muted-foreground">Network</span>
                  <span className="font-mono text-sm">{network?.name || 'Avalanche'}</span>
                </div>

                {/* Sender */}
                {isConnected && address && (
                  <div className="flex justify-between border-t border-white/10 pt-4">
                    <span className="text-muted-foreground">From</span>
                    <span className="font-mono text-sm">{shortenAddress(address)}</span>
                  </div>
                )}

                {/* Fee */}
                <div className="flex justify-between border-t border-white/10 pt-4">
                  <span className="text-muted-foreground">Fee</span>
                  <span className="font-mono text-sm">0.5%</span>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {!isConnected && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-600 font-medium">Wallet Not Connected</p>
                  <p className="text-xs text-yellow-600/80 mt-1">Please connect your wallet to send payment</p>
                </div>
              </div>
            )}

            {isPending && status === 'pending' && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Awaiting Confirmation</p>
                  <p className="text-xs text-blue-600/80 mt-1">Please confirm the transaction in your wallet</p>
                </div>
              </div>
            )}

            {isConfirming && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Transaction Pending</p>
                  <p className="text-xs text-blue-600/80 mt-1">Your transaction is being confirmed on the blockchain</p>
                  {hash && (
                    <a
                      href={explorerTxUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 underline mt-2 inline-block"
                    >
                      View on Explorer →
                    </a>
                  )}
                </div>
              </div>
            )}

            {isSuccess && hash && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Payment Successful!</p>
                    <p className="text-xs text-green-600/80 mt-1">Your transaction has been confirmed on the blockchain</p>
                  </div>
                </div>
                <div className="ml-8">
                  <a
                    href={explorerTxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-600 hover:text-green-700 underline break-all"
                  >
                    View Transaction on Snowtrace →
                  </a>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-600 font-medium">Transaction Failed</p>
                  <p className="text-xs text-red-600/80 mt-1">{error?.message || 'An error occurred while processing your payment'}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              {!isSuccess ? (
                <>
                  {!isConnected ? (
                    <ConnectButton />
                  ) : (
                    <Button
                      onClick={handleSendPayment}
                      disabled={isPending || isConfirming || !isConnected}
                      className="w-full bg-primary hover:bg-primary-600 text-white h-12 text-base group"
                      size="lg"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Confirm in Wallet
                        </>
                      ) : isConfirming ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                          Send {paymentDetails.amount} {paymentDetails.token}
                        </>
                      )}
                    </Button>
                  )}
                </>
              ) : (
                <Link href="/create-payment-link" className="w-full">
                  <Button className="w-full" size="lg">
                    Create Another Payment Link
                  </Button>
                </Link>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center space-y-2">
              <p className="text-xs text-blue-600">
                🔒 Contract: {shortenAddress(processorAddress)}
              </p>
              <p className="text-xs text-blue-600">
                All transactions are processed on Avalanche blockchain and are irreversible
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function SendPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <Loader2 className="h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading payment...</p>
          </div>
        </div>
      }
    >
      <SendPageContent />
    </Suspense>
  );
}
