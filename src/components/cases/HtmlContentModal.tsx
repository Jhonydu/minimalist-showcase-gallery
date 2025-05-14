
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface HtmlContentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  htmlContent: string;
}

const HtmlContentModal = ({ isOpen, onOpenChange, htmlContent }: HtmlContentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-transparent">
        <div className="w-full h-[80vh] bg-gradient-to-br from-[#9b87f5] to-black p-6 rounded-lg">
          <div className="w-full h-full bg-black/80 rounded-lg overflow-hidden">
            {htmlContent && (
              <div 
                className="w-full h-full overflow-auto p-4 styled-html-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HtmlContentModal;
