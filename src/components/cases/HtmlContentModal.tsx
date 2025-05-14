
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface HtmlContentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  htmlContent: string;
  exocadHtmlUrl?: string;
}

const HtmlContentModal = ({ isOpen, onOpenChange, htmlContent, exocadHtmlUrl }: HtmlContentModalProps) => {
  const [activeTab, setActiveTab] = useState<string>(exocadHtmlUrl ? 'exocad' : 'details');
  const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true);

  // Reset loading state when the modal opens
  useEffect(() => {
    if (isOpen) {
      setIsIframeLoading(true);
      setActiveTab(exocadHtmlUrl ? 'exocad' : 'details');
    }
  }, [isOpen, exocadHtmlUrl]);

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  // Process the Exocad URL to ensure proper HTML rendering
  const getProcessedExocadUrl = () => {
    if (!exocadHtmlUrl) return '';
    
    // Always force content_type=text/html and add X-Frame-Options header if possible
    if (exocadHtmlUrl.includes('?')) {
      return `${exocadHtmlUrl}&content_type=text/html`;
    }
    
    return `${exocadHtmlUrl}?content_type=text/html`;
  };

  // Create a direct link for opening in a new tab as a fallback
  const getExternalLink = () => {
    return exocadHtmlUrl ? getProcessedExocadUrl() : '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-transparent">
        {/* Add a hidden DialogTitle for accessibility */}
        <VisuallyHidden>
          <DialogTitle>Visualização do Caso</DialogTitle>
        </VisuallyHidden>
        
        <div className="w-full h-[80vh] bg-gradient-to-br from-[#1a1a1a] to-black p-6 rounded-lg relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 z-50 bg-black/20 hover:bg-black/40 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full h-full"
          >
            <TabsList className="grid grid-cols-2 mb-4 bg-black/20">
              {exocadHtmlUrl && (
                <TabsTrigger value="exocad" className="text-white data-[state=active]:bg-white/10">
                  VISUALIZAÇÃO 3D
                </TabsTrigger>
              )}
              <TabsTrigger value="details" className="text-white data-[state=active]:bg-white/10">
                DETALHES DO CASO
              </TabsTrigger>
            </TabsList>
            
            {exocadHtmlUrl && (
              <TabsContent value="exocad" className="w-full h-[calc(100%-60px)]">
                <div className="relative w-full h-full bg-black/80 rounded-lg overflow-hidden">
                  {isIframeLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/90 text-white z-10">
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-10 w-10 animate-spin mb-2" />
                        <span className="text-sm uppercase">Carregando visualização 3D...</span>
                      </div>
                    </div>
                  )}
                  
                  <iframe
                    src={getProcessedExocadUrl()}
                    className="w-full h-full border-none"
                    onLoad={handleIframeLoad}
                    title="Exocad 3D Viewer"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    allow="autoplay; fullscreen"
                  />
                  
                  {/* Fallback option to open in a new tab */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                      onClick={() => window.open(getExternalLink(), '_blank')}
                    >
                      Abrir em nova aba
                    </Button>
                  </div>
                </div>
              </TabsContent>
            )}
            
            <TabsContent value="details" className="w-full h-[calc(100%-60px)]">
              <div className="w-full h-full bg-black/80 rounded-lg overflow-hidden">
                {htmlContent && (
                  <div 
                    className="w-full h-full overflow-auto p-4 styled-html-content"
                    style={{ color: 'white' }}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HtmlContentModal;
