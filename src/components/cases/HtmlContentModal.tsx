
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

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
    }
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-transparent">
        <div className="w-full h-[80vh] bg-gradient-to-br from-[#9b87f5] to-black p-6 rounded-lg">
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
                    src={exocadHtmlUrl}
                    className="w-full h-full border-none"
                    onLoad={handleIframeLoad}
                    title="Exocad 3D Viewer"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    allow="autoplay; fullscreen"
                  />
                </div>
              </TabsContent>
            )}
            
            <TabsContent value="details" className="w-full h-[calc(100%-60px)]">
              <div className="w-full h-full bg-black/80 rounded-lg overflow-hidden">
                {htmlContent && (
                  <div 
                    className="w-full h-full overflow-auto p-4 styled-html-content"
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
