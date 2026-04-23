'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const footerLinks = [
  { href: '/festivals', label: 'Festivals' },
  { href: '/aartis', label: 'Aartis' },
  { href: '/bhajans', label: 'Bhajans' },
  { href: '/chalisas', label: 'Chalisas' },
  { href: '/mantras', label: 'Mantras' },
  { href: '/stories', label: 'Stories' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-900 to-red-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold">Bhakti</h3>
          </div>
          
          {/* Tagline */}
          <p className="text-xl text-orange-200 mb-8 max-w-2xl mx-auto">
            A Sacred Space for Devotion
          </p>
          
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-orange-200 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-orange-800 pt-8 text-center">
          <p className="text-orange-300 text-sm mb-4">
            © 2024 Bhakti. Preserving and sharing sacred traditions of Hindu culture.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-orange-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
