'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // This is the official Next.js pattern for theme toggles
  // ESLint warning is a false positive - this is correct usage
  useEffect(() => {
    setMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="glass border border-white/20"
        disabled
        aria-label="Loading theme toggle"
      >
        <div className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="glass border border-white/20 hover:bg-white/20 transition-all"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-white transition-transform hover:rotate-180 duration-500" />
      ) : (
        <Moon className="h-5 w-5 transition-transform hover:-rotate-12 duration-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
