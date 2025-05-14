
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface HeaderProps {
  openContact: () => void;
  openAbout: () => void; // Added new prop for opening About modal
  className?: string;
  currentPage?: string;
}

const Header = ({ openContact, openAbout, className }: HeaderProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  return (
    <header className={cn(
      "w-full py-6 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10",
      "bg-black/5 backdrop-blur-md", 
      className
    )}>
      <div 
        className="text-xl font-medium tracking-tighter cursor-pointer flex items-center gap-2" 
        onClick={() => navigate('/')}
      >
        <span className="font-semibold uppercase text-white">STUDIO</span>
        <span className="text-sm font-light text-white/60 uppercase">/ JONHNATAS LIMA</span>
      </div>
      <nav className="flex items-center space-x-4 md:space-x-6">
        <Button 
          onClick={openAbout}
          variant="ghost"
          className="text-sm font-medium relative overflow-hidden group px-2 py-1 h-auto uppercase text-white hover:bg-white/5"
        >
          <span className="relative z-10 flex items-center">
            <User className="h-3.5 w-3.5 mr-2 opacity-70 group-hover:opacity-100" />
            QUEM SOU EU
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </Button>
        
        <Button 
          onClick={openContact}
          variant="ghost"
          className="text-sm font-medium relative overflow-hidden group px-2 py-1 h-auto uppercase text-white hover:bg-white/5"
        >
          <span className="relative z-10">CONTATO</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
