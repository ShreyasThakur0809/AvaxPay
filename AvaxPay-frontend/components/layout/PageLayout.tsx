'use client';

import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
}

/**
 * Reusable page layout wrapper
 * Automatically handles navbar spacing and consistent styling
 * Use this for all pages that need spacing below the fixed navbar
 */
export function PageLayout({
  children,
  title,
  description,
  showHeader = true,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Optional Header */}
      {/* {showHeader && (title || description) && (
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {title && <h1 className="text-4xl font-bold mb-2">{title}</h1>}
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      )} */}

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  );
}
