import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, Clock, History, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/activities', label: 'Atividades', icon: FolderOpen },
  { to: '/register', label: 'Registrar', icon: Clock },
  { to: '/history', label: 'Histórico', icon: History },
  { to: '/settings', label: 'Configurações', icon: Settings },
];

export const Navigation = () => {
  return (
    <nav className="bg-gradient-card border-b shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};