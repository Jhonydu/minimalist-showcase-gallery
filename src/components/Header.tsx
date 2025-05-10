
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  openPricing: () => void;
  openContact: () => void;
  className?: string;
}

const Header = ({ openPricing, openContact, className }: HeaderProps) => {
  return (
    <header className={cn("w-full py-8 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm", className)}>
      <div className="text-xl font-medium tracking-tighter">STUDIO</div>
      <nav className="flex items-center space-x-8">
        <button onClick={openPricing} className="nav-link">
          Preços
        </button>
        <button onClick={openContact} className="nav-link">
          Contato
        </button>
      </nav>
    </header>
  );
};

export default Header;
