'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ThemeToggle } from './ThemeToggle';
import { NetworkBadge } from './NetworkBadge';
import { useWallet } from '@/lib/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Home, 
  Menu,
  X,
  Clock
} from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { isConnected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl  flex items-center justify-center transform group-hover:scale-105 transition-transform ">
              <Image
                src="/avalanche-avax-logo.svg"
                alt="Avalanche Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-none">
                AvaxPay
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" className="glass border border-white/10 hover:bg-white/20">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>

            {isConnected && (
              <>
                {/* Subscriptions Button */}
                <Link href="/dashboard">
                  <Button variant="ghost" className="glass border border-white/10 hover:bg-white/20">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard/subscriptions">
                  <Button variant="ghost" className="glass border border-white/10 hover:bg-white/20">
                    <Clock className="w-4 h-4 mr-2" />
                    Subscriptions
                  </Button>
                </Link>
              </>
            )}

            <ThemeToggle />
            <ConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="glass border border-white/20"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 glass border-t border-white/10">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start glass border border-white/10">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>

            {isConnected && (
              <>
                {/* Subscriptions Button Mobile */}
                <Link href="/dashboard/subscriptions" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start glass border border-white/10">
                    <Clock className="w-4 h-4 mr-2" />
                    Subscriptions
                  </Button>
                </Link>

                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start glass border border-white/10">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              </>
            )}

            <div className="px-2">
              <ConnectButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}