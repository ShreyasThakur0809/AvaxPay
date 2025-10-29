// app/pay/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentModal from '../../components/PaymentModal';

export default function PayPage() {
  const searchParams = useSearchParams();
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const dataParam = searchParams.get('data');
      if (dataParam) {
        const decoded = JSON.parse(decodeURIComponent(dataParam));
        setPaymentData(decoded);
      } else {
        setError('Missing payment data');
      }
    } catch (err) {
      setError('Invalid payment data');
      console.error(err);
    }
  }, [searchParams]);

  const handleSuccess = () => {
    // Send message to parent window (if in iframe)
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'avaxpay-payment-complete',
        payment: paymentData
      }, '*');
    }
    
    // Show success message
    alert('Payment completed successfully! ✅');
  };

  const handleCancel = () => {
    // Close window or go back
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'avaxpay-payment-cancelled'
      }, '*');
    } else {
      window.close();
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <PaymentModal
        recipientAddress={paymentData.to}
        amount={paymentData.amount}
        token={paymentData.token}
        label={paymentData.label}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}
