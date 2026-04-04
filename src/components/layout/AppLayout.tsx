import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardCheck, Target, BarChart3, Flame, Gift, User, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Home' },
  { path: '/check-in', icon: ClipboardCheck, label: 'Check-In' },
  { path: '/goals', icon: Target, label: 'Goals' },
  { path: '/progress', icon: BarChart3, label: 'Progress' },
  { path: '/streaks', icon: Flame, label: 'Streaks' },
  { path: '/rewards', icon: Gift, label: 'Rewards' },
  { path: '/avatar', icon: Smile, label: 'Avatar' },
  { path: '/profile', icon: User, label: 'Profile' },
];

function BottomNav() {
  const location = useLocation();
  const mainItems = navItems.slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 pb-safe lg:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {mainItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <Link key={path} to={path} className="flex flex-col items-center gap-0.5 px-2 py-1.5 relative">
              {active && (
                <motion.div
                  layoutId="bottomNav"
                  className="absolute -top-1.5 w-8 h-1 bg-primary rounded-full"
                />
              )}
              <Icon className={`w-5 h-5 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[10px] font-medium transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-card border-r border-border p-6 fixed left-0 top-0 bottom-0">
      <div className="mb-8">
        <h1 className="font-heading text-xl font-bold text-primary flex items-center gap-2">
          <span className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-primary-foreground text-sm">🌿</span>
          </span>
          Daily Health
        </h1>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Daily Health Companion</p>
      </div>
    </aside>
  );
}

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-64 pb-24 lg:pb-8">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}