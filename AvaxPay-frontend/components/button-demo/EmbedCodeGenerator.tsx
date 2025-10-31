"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { ButtonStyle } from "./ButtonStylesSelector";

interface EmbedCodeGeneratorProps {
  style: ButtonStyle;
}

export function EmbedCodeGenerator({ style }: EmbedCodeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [linkId, setLinkId] = useState("");

  // Generate ID once on mount (in useEffect, not useMemo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const id = Math.random().toString(36).substr(2, 9);
    setLinkId(id);
  }, []);

  const getVariantColor = (variant: string) => {
    switch (variant) {
      case "primary":
        return "#3b82f6";
      case "secondary":
        return "#10b981";
      case "outline":
        return "transparent";
      case "gradient":
        return "linear-gradient(to right, #3b82f6, #10b981)";
      default:
        return "#3b82f6";
    }
  };

  const getSize = (size: string) => {
    switch (size) {
      case "small":
        return { padding: "8px 16px", fontSize: "14px" };
      case "medium":
        return { padding: "12px 24px", fontSize: "16px" };
      case "large":
        return { padding: "16px 32px", fontSize: "18px" };
      default:
        return { padding: "12px 24px", fontSize: "16px" };
    }
  };

  const getRounded = (rounded: string) => {
    switch (rounded) {
      case "none":
        return "0px";
      case "small":
        return "6px";
      case "medium":
        return "12px";
      case "full":
        return "9999px";
      default:
        return "12px";
    }
  };

  // Generate codes with useMemo to avoid recalculation on every render
  const codes = useMemo(() => {
    const htmlCode = `<!-- AvaxPay Payment Button -->
<button
  id="avaxpay-button"
  onclick="openAvaxPayWidget('${linkId}')"
  style="
    background: ${getVariantColor(style.variant)};
    color: white;
    border: none;
    padding: ${getSize(style.size).padding};
    font-size: ${getSize(style.size).fontSize};
    border-radius: ${getRounded(style.rounded)};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  "
  onmouseover="this.style.opacity='0.9'"
  onmouseout="this.style.opacity='1'"
>
  ${style.text}
</button>

<script src="https://avaxpay.local/widget.js"><\/script>`;

    const reactCode = `import { AvaxPayButton } from '@avaxpay/react';

export function PaymentButton() {
  return (
    <AvaxPayButton
      variant="${style.variant}"
      size="${style.size}"
      rounded="${style.rounded}"
      text="${style.text}"
      onSuccess={() => console.log('Payment successful')}
      onError={() => console.log('Payment failed')}
    />
  );
}`;

    return { htmlCode, reactCode };
  }, [linkId, style]);

  const handleCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* React */}
      <Card className="glass border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">React Component</h3>
          <Button
            onClick={() => handleCopy(codes.reactCode)}
            size="sm"
            variant="outline"
            className="glass border-white/20"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Code
          </Button>
        </div>

        <pre className="bg-black/30 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm text-blue-400 font-mono">
          <code>{codes.reactCode}</code>
        </pre>
      </Card>
      {/* HTML/Vanilla JS */}
      <Card className="glass border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Vanilla JavaScript</h3>
          <Button
            onClick={() => handleCopy(codes.htmlCode)}
            size="sm"
            variant="outline"
            className={`glass border-white/20 ${
              copied ? "bg-secondary/20 text-secondary" : ""
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
                Copy Code
              </>
            )}
          </Button>
        </div>

        <pre className="bg-black/30 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm text-green-400 font-mono">
          <code>{codes.htmlCode}</code>
        </pre>
      </Card>

      {/* Info */}
      <Card className="glass border border-white/10 p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold mb-3 text-foreground">Installation</h3>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
          <li>Copy the code above for your platform</li>
          <li>Paste it into your website or app</li>
          <li>
            Replace linkId with your payment link ID{" "}
            {linkId && `(currently: ${linkId})`}
          </li>
          <li>Test the button in development</li>
          <li>Deploy to production</li>
        </ol>
      </Card>
    </div>
  );
}
