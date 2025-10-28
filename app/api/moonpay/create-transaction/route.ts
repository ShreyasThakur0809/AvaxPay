// app/api/moonpay/create-transaction/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { MOONPAY_CONFIG, getMoonpayWidgetUrl } from '../../../../lib/moonpay-config';

/**
 * POST /api/moonpay/create-transaction
 * Creates a Moonpay transaction and returns widget URL
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      walletAddress,
      amount,           // Fiat amount in USD
      currencyCode,     // e.g., 'usdc_avalanche'
      paymentId         // Our internal payment ID
    } = body;
    
    // Validate input
    if (!walletAddress || !amount || !currencyCode) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // Validate wallet address
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }
    
    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 30 || numAmount > 20000) {
      return NextResponse.json(
        { error: 'Amount must be between $30 and $20,000' },
        { status: 400 }
      );
    }
    
    // DEMO MODE: Simulate Moonpay transaction
    if (MOONPAY_CONFIG.isDemoMode) {
      const demoWidgetUrl = getMoonpayWidgetUrl({
        walletAddress,
        currencyCode,
        baseCurrencyAmount: numAmount,
        externalTransactionId: paymentId
      });
      
      // Simulate transaction ID
      const transactionId = `demo_txn_${Date.now()}`;
      
      return NextResponse.json({
        success: true,
        transactionId,
        widgetUrl: demoWidgetUrl,
        message: 'Demo mode: Real Moonpay will be integrated after grant funding',
        demoMode: true
      });
    }
    
    // PRODUCTION MODE: Real Moonpay API call
    // NOTE: This will be implemented after securing grant
    /*
    const response = await fetch(`${MOONPAY_CONFIG.apiUrl}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MOONPAY_CONFIG.secretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        walletAddress,
        currencyCode,
        baseCurrencyAmount: numAmount,
        externalTransactionId: paymentId,
        redirectURL: `${process.env.NEXT_PUBLIC_APP_URL}/payment/${paymentId}/success`
      })
    });
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      transactionId: data.id,
      widgetUrl: data.url
    });
    */
    
    return NextResponse.json(
      { error: 'Production mode not yet configured' },
      { status: 501 }
    );
    
  } catch (error) {
    console.error('Moonpay transaction creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
