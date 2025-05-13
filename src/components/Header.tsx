
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  openContact: () => void;
  openPricing?: () => void;  // Added as optional since we want to make it backward compatible
  className?: string;
  currentPage?: string;
}

const Header = ({ openContact, className }: HeaderProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  return (
    <header className={cn(
      "W-FULL PY-6 PX-6 FLEX JUSTIFY-BETWEEN ITEMS-CENTER FIXED TOP-0 LEFT-0 RIGHT-0 Z-10",
      "BG-BACKGROUND/80 BACKDROP-BLUR-MD", 
      className
    )}>
      <div 
        className="TEXT-XL FONT-MEDIUM TRACKING-TIGHTER CURSOR-POINTER FLEX ITEMS-CENTER GAP-2" 
        onClick={() => navigate('/')}
      >
        <span className="FONT-SEMIBOLD UPPERCASE">STUDIO</span>
        <span className="TEXT-SM FONT-LIGHT TEXT-MUTED-FOREGROUND UPPERCASE">/ JONHNATAS LIMA</span>
      </div>
      <nav className="FLEX ITEMS-CENTER SPACE-X-4 MD:SPACE-X-6">
        <Button 
          onClick={openContact}
          variant="ghost"
          className="TEXT-SM FONT-MEDIUM RELATIVE OVERFLOW-HIDDEN GROUP PX-2 PY-1 H-AUTO UPPERCASE"
        >
          <span className="RELATIVE Z-10">CONTATO</span>
          <span className="ABSOLUTE BOTTOM-0 LEFT-0 W-FULL H-0.5 BG-PRIMARY SCALE-X-0 GROUP-HOVER:SCALE-X-100 TRANSITION-TRANSFORM DURATION-300 ORIGIN-LEFT"></span>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
