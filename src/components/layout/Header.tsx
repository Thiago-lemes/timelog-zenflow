import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gradient-card border-b shadow-card sticky top-0 z-50">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <SidebarTrigger className="hover:bg-primary/10 h-8 w-8 sm:h-9 sm:w-9" />
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full hover:bg-primary/10 h-8 w-8 sm:h-9 sm:w-9"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};