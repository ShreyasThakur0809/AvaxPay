'use client';

import { PageLayout } from '@/components/layout/PageLayout';
import { ButtonStylesSelector, ButtonStyle } from '@/components/button-demo/ButtonStylesSelector';
import { EmbedCodeGenerator } from '@/components/button-demo/EmbedCodeGenerator';
import { IntegrationGuide } from '@/components/button-demo/IntegrationGuide';
import { useState } from 'react';

export default function ButtonDemoPage() {
  const [buttonStyle, setButtonStyle] = useState<ButtonStyle>({
    variant: 'primary',
    size: 'medium',
    rounded: 'medium',
    text: 'Pay with AVAX',
  });

  const handleStyleChange = (updates: Partial<ButtonStyle>) => {
    setButtonStyle((prev) => ({ ...prev, ...updates }));
  };

  return (
    <PageLayout
      title="Payment Button"
      description="Customize and embed payment buttons on your website."
    >
      <div className="space-y-12">
        {/* Customization Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ButtonStylesSelector
              style={buttonStyle}
              onStyleChange={handleStyleChange}
            />
          </div>

          {/* Quick Reference */}
          <div className="space-y-6">
            <div className="glass rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4">Current Settings</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Variant:</span>
                  <span className="font-medium capitalize">{buttonStyle.variant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-medium capitalize">{buttonStyle.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rounded:</span>
                  <span className="font-medium capitalize">{buttonStyle.rounded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Text:</span>
                  <span className="font-medium">{buttonStyle.text}</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl border p-6 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-3">Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Use large buttons for CTAs</li>
                <li>Match your brand colors</li>
                <li>Test on mobile devices</li>
                <li>Use clear button text</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Embed Code Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Embed Code</h2>
          <EmbedCodeGenerator style={buttonStyle} />
        </div>

        {/* Integration Guides */}
        <div>
          <IntegrationGuide />
        </div>
      </div>
    </PageLayout>
  );
}
