// app/api/moonpay/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/moonpay/webhook
 * Handles Moonpay webhook notifications
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📨 Moonpay webhook received:', body);
    
    // Verify webhook signature (production)
    // const signature = request.headers.get('moonpay-signature');
    // if (!verifyWebhookSignature(body, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }
    
    const { type, data } = body;
    
    // Handle different webhook types
    switch (type) {
      case 'transaction_completed':
        console.log('✅ Transaction completed:', data.id);
        // TODO: Update database, notify user, mark payment as completed
        break;
        
      case 'transaction_failed':
        console.log('❌ Transaction failed:', data.id);
        // TODO: Update database, notify user, handle failure
        break;
        
      default:
        console.log('❓ Unknown webhook type:', type);
    }
    
    // Always return 200 to Moonpay
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
