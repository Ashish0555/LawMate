'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userRole: 'client' | 'lawyer';
  onLogout?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const clientLinks = [
  { href: '/client/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/client/dashboard', label: 'Active Chats', icon: MessageSquare },
  { href: '/booking', label: 'Bookings', icon: Calendar },
  { href: '/client/dashboard', label: 'Profile', icon: User },
];

const lawyerLinks = [
  { href: '/lawyer/dashboard', label: 'Practice Hub', icon: LayoutDashboard },
  { href: '/lawyer/dashboard', label: 'Inbox', icon: MessageSquare },
  { href: '/lawyer/dashboard', label: 'Availability', icon: Calendar },
  { href: '/lawyer/dashboard', label: 'Profile', icon: User },
];

export function Sidebar({
  userRole,
  onLogout,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const links = userRole === 'lawyer' ? lawyerLinks : clientLinks;

  return (
    <aside
      className={cn(
        'hidden border-r border-white/70 bg-white/70 px-4 py-6 backdrop-blur-xl md:flex md:min-h-[calc(100vh-72px)] md:flex-col',
        isCollapsed ? 'md:w-[96px]' : 'md:w-[280px]',
      )}
    >
      <div className="mb-6 flex items-center justify-between px-2">
        {!isCollapsed ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
              Workspace
            </p>
            <h2 className="mt-2 font-heading text-xl font-semibold text-foreground">
              {userRole === 'lawyer' ? 'Lawyer Console' : 'Client Dashboard'}
            </h2>
          </div>
        ) : null}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onToggleCollapse?.(!isCollapsed)}
          className="rounded-full"
        >
          <ChevronLeft
            className={cn('size-4 transition-transform', isCollapsed && 'rotate-180')}
          />
        </Button>
      </div>

      <div
        className={cn(
          'mb-6 rounded-[28px] border border-primary/10 bg-[linear-gradient(180deg,rgba(36,85,255,0.08),rgba(123,168,255,0.02))] p-4',
          isCollapsed && 'px-3',
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_18px_40px_-22px_rgba(36,85,255,0.8)]">
            <Sparkles className="size-4" />
          </div>
          {!isCollapsed ? (
            <div>
              <p className="text-sm font-semibold text-foreground">Priority Support</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Fast routing, active chats, and secure legal records in one place.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-[0_18px_36px_-26px_rgba(36,85,255,0.9)]'
                  : 'text-muted-foreground hover:bg-white hover:text-foreground',
                isCollapsed && 'justify-center px-0',
              )}
              title={isCollapsed ? link.label : undefined}
            >
              <Icon className="size-5 shrink-0" />
              {!isCollapsed ? <span>{link.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 space-y-2 border-t border-border/60 pt-6">
        <Link
          href={userRole === 'lawyer' ? '/lawyer/dashboard' : '/client/dashboard'}
          className={cn(
            'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-white hover:text-foreground',
            isCollapsed && 'justify-center px-0',
          )}
        >
          <Settings className="size-5 shrink-0" />
          {!isCollapsed ? <span>Settings</span> : null}
        </Link>
        <Button
          variant="outline"
          onClick={onLogout}
          className={cn(
            'w-full justify-start rounded-2xl border-border/70',
            isCollapsed && 'justify-center px-0',
          )}
        >
          <LogOut className="size-4 shrink-0" />
          {!isCollapsed ? <span>Logout</span> : null}
        </Button>
      </div>
    </aside>
  );
}
