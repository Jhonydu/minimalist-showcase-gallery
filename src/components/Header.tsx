
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  openPricing: () => void;
  openContact: () => void;
  className?: string;
}

const Header = ({ openPricing, openContact, className }: HeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <header className={cn(
      "w-full py-6 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10",
      "bg-background/80 backdrop-blur-md border-b",
      className
    )}>
      <div className="text-xl font-medium tracking-tighter">STUDIO</div>
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
