'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface ButtonStyle {
  variant: 'primary' | 'secondary' | 'outline' | 'gradient';
  size: 'small' | 'medium' | 'large';
  rounded: 'none' | 'small' | 'medium' | 'full';
  text: string;
}

interface ButtonStylesSelectorProps {
  style: ButtonStyle;
  onStyleChange: (style: Partial<ButtonStyle>) => void;
}

export function ButtonStylesSelector({
  style,
  onStyleChange,
}: ButtonStylesSelectorProps) {
  const variants: Array<ButtonStyle['variant']> = [
    'primary',
    'secondary',
    'outline',
    'gradient',
  ];
  const sizes: Array<ButtonStyle['size']> = ['small', 'medium', 'large'];
  const roundedOptions: Array<ButtonStyle['rounded']> = [
    'none',
    'small',
    'medium',
    'full',
  ];

  const getButtonSizeClass = (size: ButtonStyle['size']) => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      case 'medium':
        return 'px-6 py-3 text-base';
      case 'large':
        return 'px-8 py-4 text-lg';
    }
  };

  const getRoundedClass = (rounded: ButtonStyle['rounded']) => {
    switch (rounded) {
      case 'none':
        return 'rounded-none';
      case 'small':
        return 'rounded-md';
      case 'medium':
        return 'rounded-xl';
      case 'full':
        return 'rounded-full';
    }
  };

  const getVariantClass = (variant: ButtonStyle['variant']) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary hover:bg-primary-600 text-white';
      case 'secondary':
        return 'bg-secondary hover:bg-secondary-600 text-white';
      case 'outline':
        return 'glass border-white/20 text-foreground hover:bg-white/10';
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white';
    }
  };

  return (
    <Card className="glass border border-white/10 p-8 space-y-6">
      <h2 className="text-2xl font-bold">Customize Button</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Variant Selection */}
        <div className="space-y-2">
          <Label htmlFor="variant">Button Variant</Label>
          <Select
            value={style.variant}
            onValueChange={(value) =>
              onStyleChange({ variant: value as ButtonStyle['variant'] })
            }
          >
            <SelectTrigger className="glass border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              {variants.map((v) => (
                <SelectItem key={v} value={v} className="capitalize">
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <Label htmlFor="size">Button Size</Label>
          <Select
            value={style.size}
            onValueChange={(value) =>
              onStyleChange({ size: value as ButtonStyle['size'] })
            }
          >
            <SelectTrigger className="glass border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              {sizes.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Border Radius */}
        <div className="space-y-2">
          <Label htmlFor="rounded">Border Radius</Label>
          <Select
            value={style.rounded}
            onValueChange={(value) =>
              onStyleChange({ rounded: value as ButtonStyle['rounded'] })
            }
          >
            <SelectTrigger className="glass border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              {roundedOptions.map((r) => (
                <SelectItem key={r} value={r} className="capitalize">
                  {r === 'none' ? 'Square' : `${r} Rounded`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Button Text */}
        <div className="space-y-2">
          <Label htmlFor="text">Button Text</Label>
          <input
            id="text"
            type="text"
            value={style.text}
            onChange={(e) => onStyleChange({ text: e.target.value })}
            placeholder="Enter button text"
            className="w-full px-4 py-2 glass border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-3">
        <Label>Preview</Label>
        <div className="p-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center min-h-24">
          <button
            className={`font-semibold transition-all ${getButtonSizeClass(style.size)} ${getRoundedClass(style.rounded)} ${getVariantClass(style.variant)}`}
          >
            {style.text}
          </button>
        </div>
      </div>
    </Card>
  );
}
