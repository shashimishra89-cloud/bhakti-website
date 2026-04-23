'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  activeNav?: string;
}

const navItems = [
  { href: '/festivals', label: 'Festivals' },
  { href: '/aartis', label: 'Aartis' },
  { href: '/bhajans', label: 'Bhajans' },
  { href: '/chalisas', label: 'Chalisas' },
  { href: '/mantras', label: 'Mantras' },
  { href: '/stories', label: 'Stories' },
  { href: '/gods', label: 'Gods' },
];

export function Header({ activeNav }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Consistent with homepage */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Bhakti
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = activeNav === item.label.toLowerCase();
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    isActive
                      ? 'text-orange-600 font-semibold'
                      : 'text-orange-800 hover:text-orange-600'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
