'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bell, Home, LogOut, Menu, ShieldCheck, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
  userRole?: 'client' | 'lawyer';
  onLogout?: () => void;
  onMenuToggle?: (open: boolean) => void;
}

const guestLinks = [
  { href: '#features', label: 'Features' },
  { href: '#experience', label: 'Experience' },
  { href: '#trust', label: 'Trust' },
];

export function Navbar({
  isLoggedIn = false,
  userName,
  userRole,
  onLogout,
  onMenuToggle,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = isLoggedIn
    ? userRole === 'lawyer'
      ? [
          { href: '/lawyer/dashboard', label: 'Dashboard' },
          { href: '/lawyer/dashboard', label: 'Requests' },
          { href: '/lawyer/dashboard', label: 'Practice' },
        ]
      : [
          { href: '/client/dashboard', label: 'Dashboard' },
          { href: '/booking', label: 'Bookings' },
          { href: '/client/dashboard', label: 'Activity' },
        ]
    : guestLinks;

  const toggleMenu = () => {
    const nextOpen = !mobileMenuOpen;
    setMobileMenuOpen(nextOpen);
    onMenuToggle?.(nextOpen);
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2455ff,#7ba8ff)] text-base font-bold text-white shadow-[0_18px_40px_-20px_rgba(36,85,255,0.9)] transition-transform duration-300 group-hover:-translate-y-0.5">
            L
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">LawMate</p>
            <p className="text-xs text-muted-foreground">Legal help, beautifully delivered</p>
          </div>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {links.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="ml-3 flex items-center gap-3">
              <button
                className="glass-border flex size-10 items-center justify-center rounded-full text-muted-foreground transition-transform hover:-translate-y-0.5 hover:text-foreground"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
              </button>
              <div className="glass-border hidden items-center gap-3 rounded-full px-3 py-2 lg:flex">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {(userName ?? 'U').slice(0, 1)}
                </div>
                <div className="pr-2">
                  <p className="text-sm font-semibold text-foreground">{userName}</p>
                  <p className="text-xs capitalize text-muted-foreground">{userRole} workspace</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="ml-3 flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 lg:flex">
                <ShieldCheck className="size-4" />
                Verified lawyers online now
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="#features">Explore</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/booking">Book a Call</Link>
              </Button>
            </div>
          )}
        </div>

        <button
          onClick={toggleMenu}
          className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-white/80 text-foreground transition md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-white/70 bg-white/90 px-4 py-4 md:hidden">
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-slate-50"
              >
                <span>{link.label}</span>
                <Home className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {isLoggedIn ? (
              <Button variant="outline" onClick={onLogout} className="justify-center">
                <LogOut className="size-4" />
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="#features" onClick={() => setMobileMenuOpen(false)}>
                    Explore
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                    Book a Call
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
