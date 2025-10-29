// components/PaymentModal.tsx
'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { MOONPAY_CONFIG } from '../lib/moonpay-config';

interface PaymentModalProps {
  recipientAddress: string;
  amount: string;
  token?: string;  // 'AVAX', 'USDC', or undefined for AVAX
  label?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentModal({
  recipientAddress,
  amount,
  token = 'AVAX',
  label,
  onSuccess,
  onCancel
}: PaymentModalProps) {
  const { address, isConnected } = useAccount();
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'card'>('crypto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate Moonpay fees
  const amountNum = parseFloat(amount);
  const moonpayFee = amountNum * 0.045; // 4.5%
  const moonpayTotal = amountNum + moonpayFee;

  /**
   * Handle crypto payment (wallet)
   */
  const handleCryptoPayment = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Import contract interaction here
      // const contract = getContract(...);
      // const tx = await contract.processPayment(...);
      // await tx.wait();
      
      // For demo purposes, simulate success
      console.log('Processing crypto payment...');
      setTimeout(() => {
        console.log('✅ Payment successful!');
        onSuccess();
      }, 2000);

    } catch (err: any) {
      console.error('Payment failed:', err);
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle card payment (Moonpay)
   */
  const handleCardPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Demo mode - simulate success
      console.log('Opening Moonpay widget...');
      
      setTimeout(() => {
        alert('Demo Mode: Moonpay widget would open here. Payment simulation successful! ✅');
        onSuccess();
      }, 1000);

    } catch (err: any) {
      console.error('Card payment failed:', err);
      setError(err.message || 'Card payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Pay {amount} {token}
          </h2>
          {label && (
            <p className="text-gray-600 mt-1">{label}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            To: {recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}
          </p>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Choose payment method:
          </p>
          
          <div className="space-y-3">
            {/* Crypto Option */}
            <button
              onClick={() => setPaymentMethod('crypto')}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                paymentMethod === 'crypto'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">🔐</div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Pay with Crypto Wallet
                    </div>
                    <div className="text-sm text-gray-600">
                      MetaMask, Core Wallet, etc.
                    </div>
                  </div>
                </div>
                {paymentMethod === 'crypto' && (
                  <div className="text-blue-500 text-xl">✓</div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Amount: {amount} {token}
              </div>
            </button>

            {/* Card Option */}
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">💳</div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Pay with Credit/Debit Card
                    </div>
                    <div className="text-sm text-gray-600">
                      Powered by Moonpay
                    </div>
                  </div>
                </div>
                {paymentMethod === 'card' && (
                  <div className="text-blue-500 text-xl">✓</div>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Total: ${moonpayTotal.toFixed(2)} USD
                <span className="text-xs ml-1">
                  (includes ${moonpayFee.toFixed(2)} fee)
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button
            onClick={paymentMethod === 'crypto' ? handleCryptoPayment : handleCardPayment}
            disabled={loading || (paymentMethod === 'crypto' && !isConnected)}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 font-semibold"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              `Pay ${paymentMethod === 'card' ? `$${moonpayTotal.toFixed(2)}` : `${amount} ${token}`}`
            )}
          </button>
        </div>

        {/* Wallet Connection Notice */}
        {paymentMethod === 'crypto' && !isConnected && (
          <p className="mt-3 text-sm text-center text-gray-500">
            Please connect your wallet to pay with crypto
          </p>
        )}

        {/* Moonpay Demo Notice */}
        {paymentMethod === 'card' && MOONPAY_CONFIG.isDemoMode && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Demo Mode:</strong> Real Moonpay integration will be added after securing grant funding.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
