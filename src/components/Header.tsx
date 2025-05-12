
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  openPricing: () => void;
  openContact: () => void;
  className?: string;
  currentPage?: string;
}

const Header = ({ openPricing, openContact, className }: HeaderProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
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
      <nav className="flex items-center space-x-4 md:space-x-8">
        <button 
          onClick={openPricing} 
          className="nav-link text-sm font-medium relative overflow-hidden group"
        >
          <span className="relative z-10">Preços</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </button>
        <button 
          onClick={openContact}
          className="nav-link text-sm font-medium relative overflow-hidden group"
        >
          <span className="relative z-10">Contato</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
