
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import { projectsData } from '@/data/projectsData';
import { Button } from '@/components/ui/button';

const Cases = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCase = projectsData[currentIndex];

  const goToNextCase = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const goToPreviousCase = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        openPricing={() => navigate('/', { state: { openPricing: true } })} 
        openContact={() => navigate('/', { state: { openContact: true } })}
        currentPage="casos"
      />
      
      <div className="pt-24 md:pt-28 px-4 md:px-6 w-full h-[calc(100vh-6rem)]">
        <div className="w-full h-full flex flex-col md:flex-row rounded-xl overflow-hidden">
          {/* 3D Viewer Section - 80% on desktop */}
          <div className="w-full md:w-4/5 h-[60vh] md:h-full viewer-container bg-[#e5e5e5]">
            <iframe
              title={`3D Model - ${currentCase.title}`}
              src={`${currentCase.modelUrl}?autostart=1&ui_controls=0&ui_infos=0`}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
            />
          </div>
          
          {/* Information Section - 20% on desktop */}
          <div className="w-full md:w-1/5 h-auto md:h-full bg-[#e5e5e5] p-6 flex flex-col">
            <div className="animate-fade-in">
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
                  onClick={() => window.open(`/projetos/${currentCase.id}`, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver Caso Completo (HTML)
                </Button>
              )}
              
              <Button 
                variant="outline"
                size="sm"
                className="w-full justify-start mb-2 bg-white/80 hover:bg-white"
                onClick={() => alert('Download disponível em breve!')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Download do Planejamento
              </Button>
            </div>
            
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
        
        {/* Mini Carousel of Thumbnails */}
        <div className="flex justify-center mt-4 overflow-x-auto py-2 px-4">
          {projectsData.map((project, idx) => (
            <button
              key={project.id}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "mx-1 p-1 rounded-md transition-all",
                currentIndex === idx ? "ring-2 ring-primary" : ""
              )}
            >
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="h-12 w-16 object-cover rounded"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cases;
