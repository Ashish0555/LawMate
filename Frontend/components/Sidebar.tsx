'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  User,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

interface SidebarProps {
  userRole: 'client' | 'lawyer';
  onLogout?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const clientLinks = [
  { href: '/client/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/client/messages', label: 'Messages', icon: MessageSquare },
  { href: '/booking', label: 'Find Lawyers', icon: Calendar },
  { href: '/client/profile', label: 'My Profile', icon: User },
];

const lawyerLinks = [
  { href: '/lawyer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/lawyer/messages', label: 'Messages', icon: MessageSquare },
  { href: '/lawyer/availability', label: 'Availability', icon: Calendar },
  { href: '/lawyer/profile', label: 'My Profile', icon: User },
];

export function Sidebar({
  userRole,
  onLogout,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const links = userRole === 'lawyer' ? lawyerLinks : clientLinks;

  const toggleCollapse = () => {
    onToggleCollapse?.(!isCollapsed);
  };

  return (
    <aside
      className={cn(
        'bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="font-bold text-sidebar-foreground">Menu</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className="hidden md:flex ml-auto"
        >
          <ChevronLeft
            className={cn(
              'w-4 h-4 transition-transform',
              isCollapsed && 'rotate-180'
            )}
          />
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              title={isCollapsed ? link.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4 space-y-2">
        <Link
          href={userRole === 'lawyer' ? '/lawyer/settings' : '/client/settings'}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm font-medium"
          title={isCollapsed ? 'Settings' : ''}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </Link>
        <Button
          variant="ghost"
          onClick={onLogout}
          className={cn(
            'w-full justify-start gap-3 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground',
            isCollapsed && 'justify-center'
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
