// app/button-demo/page.tsx

export default function ButtonDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AvaxPay Payment Button
          </h1>
          <p className="text-xl text-gray-600">
            Accept crypto payments on ANY website in 30 seconds
          </p>
        </div>

        {/* Live Demo */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 Live Demo
          </h2>
          <p className="text-gray-600 mb-6">
            Click the button below to see the payment flow:
          </p>
          
          {/* Demo Button */}
          <div 
            data-avaxpay-button
            data-amount="29.99"
            data-recipient="0x60Be870885C5b537AC179CfACdcc9Fad145CAC55"
            data-label="Buy Premium Plan"
            data-token="USDC"
            data-theme="blue"
          ></div>
        </div>

        {/* Installation */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            📦 Installation (Copy & Paste)
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">1. Add this to your website's HTML:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`<script src="https://avaxpay.xyz/widget.js"></script>`}
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">2. Add payment button wherever you want:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`<div 
  data-avaxpay-button
  data-amount="29.99"
  data-recipient="0xYOUR_WALLET_ADDRESS"
  data-label="Buy Product"
  data-token="USDC"
  data-theme="blue"
></div>`}
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">3. Done! 🎉</p>
              <p className="text-gray-600">That's it! Your payment button is live.</p>
            </div>
          </div>
        </div>

        {/* Customization */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎨 Customization Options
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="pb-2 font-semibold">Attribute</th>
                  <th className="pb-2 font-semibold">Required</th>
                  <th className="pb-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-mono text-blue-600">data-amount</td>
                  <td className="py-2">✅ Yes</td>
                  <td className="py-2">Payment amount (e.g., "29.99")</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-mono text-blue-600">data-recipient</td>
                  <td className="py-2">✅ Yes</td>
                  <td className="py-2">Your wallet address</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-mono text-blue-600">data-label</td>
                  <td className="py-2">❌ No</td>
                  <td className="py-2">Button text (default: "Pay Now")</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 font-mono text-blue-600">data-token</td>
                  <td className="py-2">❌ No</td>
                  <td className="py-2">AVAX, USDC, or USDT (default: AVAX)</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-blue-600">data-theme</td>
                  <td className="py-2">❌ No</td>
                  <td className="py-2">blue, green, purple, or black</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ✨ Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-semibold text-gray-900">Instant Setup</h3>
                <p className="text-sm text-gray-600">Copy 2 lines of code, done!</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌐</span>
              <div>
                <h3 className="font-semibold text-gray-900">Universal</h3>
                <p className="text-sm text-gray-600">Works on ANY website platform</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔐</span>
              <div>
                <h3 className="font-semibold text-gray-900">Secure</h3>
                <p className="text-sm text-gray-600">Non-custodial, you control funds</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-2xl">💳</span>
              <div>
                <h3 className="font-semibold text-gray-900">Card + Crypto</h3>
                <p className="text-sm text-gray-600">Accept both payment methods</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Load widget script */}
      <script src="/widget.js"></script>
    </div>
  );
}
