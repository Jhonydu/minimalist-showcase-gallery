
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

interface HeaderProps {
  openPricing: () => void;
  openContact: () => void;
  className?: string;
  currentPage?: string;
}

const Header = ({ openPricing, openContact, className }: HeaderProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  return (
    <header className={cn(
      "w-full py-6 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10",
      "bg-background/80 backdrop-blur-md", // No border-b
      className
    )}>
      <div 
        className="text-xl font-medium tracking-tighter cursor-pointer flex items-center gap-2" 
        onClick={() => navigate('/')}
      >
        <span className="font-semibold">STUDIO</span>
        <span className="text-sm font-light text-muted-foreground">/ Jonhnatas Lima</span>
      </div>
      <nav className="flex items-center space-x-4 md:space-x-6">
        <Button 
          onClick={openPricing} 
          variant="ghost"
          className="text-sm font-medium relative overflow-hidden group px-2 py-1 h-auto"
        >
          <span className="relative z-10">Preços</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </Button>
        
        <Toggle
          aria-label="Toggle dark mode"
          pressed={theme === "dark"}
          onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 h-auto rounded-full"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Toggle>
        
        <Button 
          onClick={openContact}
          variant="ghost"
          className="text-sm font-medium relative overflow-hidden group px-2 py-1 h-auto"
        >
          <span className="relative z-10">Contato</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
