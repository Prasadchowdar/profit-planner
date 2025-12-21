import { LogOut, User, History, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onHistoryClick?: () => void;
}

export function Header({ onHistoryClick }: HeaderProps) {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="container flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <h1 className="text-lg font-bold tracking-tight">AgriLogistics Pro</h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                {onHistoryClick && (
                  <DropdownMenuItem onClick={onHistoryClick}>
                    <History className="h-4 w-4 mr-2" />
                    Past Calculations
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
