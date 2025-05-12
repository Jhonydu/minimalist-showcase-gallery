
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ExternalLink, ChevronRight as CollapseIcon } from 'lucide-react';
import Header from '@/components/Header';
import { projectsData } from '@/data/projectsData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Cases = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoPanelCollapsed, setInfoPanelCollapsed] = useState(false);
  const [htmlModalOpen, setHtmlModalOpen] = useState(false);
  const currentCase = projectsData[currentIndex];

  const goToNextCase = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const goToPreviousCase = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  const toggleInfoPanel = () => {
    setInfoPanelCollapsed(!infoPanelCollapsed);
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5]">
      {/* 3D viewer as background that covers the entire screen - now with pointer-events-auto */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-auto">
        <iframe
          title={`3D Model - ${currentCase.title}`}
          src={`${currentCase.modelUrl}?autospin=1&autostart=1&ui_controls=1&ui_infos=0&transparent=1`}
          className="w-full h-full scale-110"
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
        />
      </div>

      {/* Content layout */}
      <div className="relative z-10 pointer-events-none">
        <Header 
          openPricing={() => navigate('/', { state: { openPricing: true } })} 
          openContact={() => navigate('/', { state: { openContact: true } })}
          currentPage="casos"
          className="bg-transparent backdrop-blur-sm pointer-events-auto"
        />
        
        <div className="pt-24 md:pt-28 px-4 md:px-6 w-full h-[calc(100vh-6rem)] flex flex-col">
          {/* Collapsible Info panel */}
          <div 
            className={cn(
              "transition-all duration-300 pointer-events-auto",
              infoPanelCollapsed 
                ? "ml-auto w-12" 
                : "ml-auto w-full md:w-1/4 lg:w-1/5"
            )}
          >
            {infoPanelCollapsed ? (
              <button 
                onClick={toggleInfoPanel}
                className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-l-lg flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            ) : (
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm animate-fade-in relative">
                <button 
                  onClick={toggleInfoPanel}
                  className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-white/70 backdrop-blur-sm rounded-l-lg flex items-center justify-center"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div>
                  <h1 className="text-xl font-medium mb-4">{currentCase.title}</h1>
                  <p className="text-sm text-muted-foreground mb-6">{currentCase.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Tecnologias</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentCase.type && (
                        <span className="px-2 py-1 bg-white/50 text-xs rounded-full">{currentCase.type}</span>
                      )}
                      <span className="px-2 py-1 bg-white/50 text-xs rounded-full">Exocad</span>
                      <span className="px-2 py-1 bg-white/50 text-xs rounded-full">3D Print</span>
                    </div>
                  </div>
                  
                  {currentCase.htmlContent && (
                    <Button 
                      variant="outline"
                      size="sm"
                      className="w-full justify-start mb-2 bg-white/80 hover:bg-white"
                      onClick={() => setHtmlModalOpen(true)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver Caso Completo (HTML)
                    </Button>
                  )}
                  
                  {/* Navigation buttons */}
                  <div className="mt-auto flex justify-between pt-4">
                    <Button variant="outline" size="sm" onClick={goToPreviousCase} className="bg-white/80 hover:bg-white">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm" onClick={goToNextCase} className="bg-white/80 hover:bg-white">
                      Próximo
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Mini Carousel of Thumbnails */}
          <div className="fixed bottom-4 left-0 right-0 flex justify-center overflow-x-auto py-2 px-4 pointer-events-auto">
            <div className="flex gap-2 p-2 bg-white/50 backdrop-blur-sm rounded-full">
              {projectsData.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "transition-all duration-300 rounded-full overflow-hidden",
                    currentIndex === idx ? "ring-2 ring-primary scale-110" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="h-10 w-10 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HTML Content Modal */}
      <Dialog open={htmlModalOpen} onOpenChange={setHtmlModalOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-transparent">
          <div className="w-full h-[80vh] bg-gradient-to-br from-[#9b87f5] to-black p-6 rounded-lg">
            <div className="w-full h-full bg-white rounded-lg overflow-hidden">
              {currentCase.htmlContent && (
                <div 
                  className="w-full h-full overflow-auto p-4"
                  dangerouslySetInnerHTML={{ __html: currentCase.htmlContent }}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cases;
