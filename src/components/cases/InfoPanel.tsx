
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProjectInfoProps {
  title: string;
  description: string;
  type?: string;
  htmlContent?: string;
  exocadHtmlUrl?: string;
  infoPanelCollapsed: boolean;
  onToggleInfoPanel: () => void;
  onShowHtmlModal: () => void;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
  isMobile: boolean;
}

const InfoPanel = ({
  title,
  description,
  type,
  htmlContent,
  exocadHtmlUrl,
  infoPanelCollapsed,
  onToggleInfoPanel,
  onShowHtmlModal,
  onNavigateNext,
  onNavigatePrevious,
  isMobile
}: ProjectInfoProps) => {

  const hasContent = htmlContent || exocadHtmlUrl;

  if (isMobile) {
    return (
      <div 
        className={cn(
          "fixed bottom-16 right-0 left-0 transition-all duration-300 pointer-events-auto z-20",
          infoPanelCollapsed 
            ? "h-10 bg-transparent" 
            : "pb-16"
        )}
      >
        {infoPanelCollapsed ? (
          <button 
            onClick={onToggleInfoPanel}
            className="mx-auto w-full flex items-center justify-center h-10"
            aria-label="Expandir painel de informações"
          >
            <div className="bg-white/5 hover:bg-white/10 px-4 py-1 rounded-full flex items-center transition-colors">
              <span className="text-xs mr-1 uppercase text-white">Informações</span>
              <ChevronUp className="h-3 w-3 text-white" />
            </div>
          </button>
        ) : (
          <div className="bg-black/5 backdrop-blur-sm p-4 rounded-t-lg mx-4 animate-fade-in relative">
            <button 
              onClick={onToggleInfoPanel}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Recolher painel de informações"
            >
              <ChevronDown className="h-4 w-4 text-white" />
            </button>

            <div>
              <h1 className="text-base font-medium mb-2 uppercase text-white">{title}</h1>
              <p className="text-xs text-white/60 mb-3 uppercase">{description}</p>
              
              <div className="mb-3">
                <h3 className="text-xs font-medium mb-1 uppercase text-white/80">TECNOLOGIAS</h3>
                <div className="flex flex-wrap gap-1">
                  {type && (
                    <span className="px-1.5 py-0.5 text-xs uppercase bg-white/5 hover:bg-white/10 transition-colors rounded-sm text-white">{type}</span>
                  )}
                  <span className="px-1.5 py-0.5 text-xs uppercase bg-white/5 hover:bg-white/10 transition-colors rounded-sm text-white">EXOCAD</span>
                  <span className="px-1.5 py-0.5 text-xs uppercase bg-white/5 hover:bg-white/10 transition-colors rounded-sm text-white">3D PRINT</span>
                </div>
              </div>
              
              {hasContent && (
                <Button 
                  variant="link"
                  size="sm"
                  className="w-full justify-start p-0 text-xs uppercase text-white/60 hover:text-white transition-colors group"
                  onClick={onShowHtmlModal}
                >
                  <ExternalLink className="mr-1 h-3 w-3 group-hover:text-white transition-colors" />
                  {exocadHtmlUrl ? 'VER EXOCAD 3D (HTML)' : 'VER CASO COMPLETO (HTML)'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Desktop version
  return (
    <div 
      className={cn(
        "absolute top-28 right-6 transition-all duration-300 pointer-events-auto",
        infoPanelCollapsed 
          ? "w-12 h-12" 
          : "w-full md:w-1/4 lg:w-1/5"
      )}
    >
      {infoPanelCollapsed ? (
        <button 
          onClick={onToggleInfoPanel}
          className="absolute right-0 top-0 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
          aria-label="Expandir painel de informações"
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
      ) : (
        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg animate-fade-in relative">
          <button 
            onClick={onToggleInfoPanel}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Recolher painel de informações"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          <div>
            <h1 className="text-xl font-medium mb-4 uppercase text-white">{title}</h1>
            <p className="text-sm text-white/60 mb-6 uppercase">{description}</p>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 uppercase text-white/80">TECNOLOGIAS</h3>
              <div className="flex flex-wrap gap-2">
                {type && (
                  <span className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 transition-colors rounded-sm uppercase text-white">{type}</span>
                )}
                <span className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 transition-colors rounded-sm uppercase text-white">EXOCAD</span>
                <span className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 transition-colors rounded-sm uppercase text-white">3D PRINT</span>
              </div>
            </div>
            
            {hasContent && (
              <Button 
                variant="link"
                size="sm"
                className="w-full justify-start mb-2 p-0 uppercase text-white/60 hover:text-white transition-colors group"
                onClick={onShowHtmlModal}
              >
                <ExternalLink className="mr-2 h-4 w-4 group-hover:text-white transition-colors" />
                {exocadHtmlUrl ? 'VER EXOCAD 3D (HTML)' : 'VER CASO COMPLETO (HTML)'}
              </Button>
            )}
            
            {/* Navigation buttons - Only on desktop */}
            <div className="mt-auto flex justify-between pt-4">
              <Button 
                variant="link" 
                size="sm" 
                onClick={onNavigatePrevious} 
                className="p-0 uppercase hover:text-white text-white/60 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                ANTERIOR
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                onClick={onNavigateNext} 
                className="p-0 uppercase hover:text-white text-white/60 transition-colors"
              >
                PRÓXIMO
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
