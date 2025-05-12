
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ChevronRight as CollapseIcon } from 'lucide-react';
import Header from '@/components/Header';
import { projectsData } from '@/data/projectsData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PricingModal from '@/components/PricingModal';
import ContactModal from '@/components/ContactModal';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

const Cases = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoPanelCollapsed, setInfoPanelCollapsed] = useState(false);
  const [htmlModalOpen, setHtmlModalOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  
  const currentCase = projectsData[currentIndex];
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle intro animation & timing
  useEffect(() => {
    // Set title for SEO
    document.title = "Portifólio 3D Odontológico | Jonhnatas Lima | Projetos Exocad";
    
    // Hide intro after 6 seconds
    const timer = setTimeout(() => {
      setIntroVisible(false);
    }, 6000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle model loading status
  useEffect(() => {
    setModelLoading(true);
    
    const handleLoad = () => {
      setTimeout(() => {
        setModelLoading(false);
      }, 800); // Small delay for smooth transition
    };
    
    // Pre-load the next model when transitioning
    const handleIframeLoad = () => {
      setTransitioning(false);
      handleLoad();
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }
    
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [currentIndex]);

  const goToNextCase = () => {
    setTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const goToPreviousCase = () => {
    setTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  const toggleInfoPanel = () => {
    setInfoPanelCollapsed(!infoPanelCollapsed);
  };

  const handlePricingOpen = () => {
    setPricingModalOpen(true);
    toast("Visualizando informações de preços", {
      position: "bottom-right",
      duration: 3000,
    });
  };

  const handleContactOpen = () => {
    setContactModalOpen(true);
    toast("Visualizando informações de contato", {
      position: "bottom-right",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-[#e5e5e5] overflow-hidden">
      {/* Intro Section - Absolute positioning to overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-6 py-12 transition-all duration-1000",
          introVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              Portifólio Digital Odontológico
            </h1>
            <p className="text-xl text-muted-foreground">Jonhnatas Lima</p>
          </div>
          
          <div className="space-y-6 delay-300 animate-fade-in">
            <div className="h-px w-24 bg-primary/50 mx-auto my-8"></div>
            
            <p className="text-lg">
              Especialista em modelagem 3D para aplicações odontológicas,
              utilizando tecnologia de ponta e fluxo digital completo.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 py-4">
              <div className="bg-secondary/50 px-4 py-2 rounded-full text-sm">Exocad</div>
              <div className="bg-secondary/50 px-4 py-2 rounded-full text-sm">CAD/CAM</div>
              <div className="bg-secondary/50 px-4 py-2 rounded-full text-sm">Impressão 3D</div>
              <div className="bg-secondary/50 px-4 py-2 rounded-full text-sm">Zircônia</div>
              <div className="bg-secondary/50 px-4 py-2 rounded-full text-sm">Dissilicato</div>
            </div>
          </div>
          
          <div className="pt-8 delay-500 animate-fade-in">
            <div className="loading-indicator">
              <svg className="animate-spin h-6 w-6 text-primary/60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-2 text-sm text-muted-foreground">Carregando portfólio...</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D viewer as background that covers the entire screen with pointer-events-auto */}
      <div 
        className={cn(
          "fixed inset-0 w-full h-full overflow-hidden pointer-events-auto transition-opacity duration-700",
          (modelLoading || transitioning) ? "opacity-0" : "opacity-100"
        )}
      >
        <iframe
          ref={iframeRef}
          title={`3D Model - ${currentCase.title}`}
          src={`${currentCase.modelUrl}?autospin=1&autostart=1&ui_controls=1&ui_infos=0&transparent=1`}
          className="w-full h-full scale-110"
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
        />
      </div>

      {/* Loading overlay for model transitions */}
      {transitioning && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-primary/60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="mt-3 text-sm">Carregando modelo...</span>
          </div>
        </div>
      )}

      {/* Content layout */}
      <div className={cn(
        "relative z-10 pointer-events-none transition-opacity duration-700",
        introVisible ? "opacity-0" : "opacity-100"
      )}>
        <Header 
          openPricing={handlePricingOpen}
          openContact={handleContactOpen}
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
                aria-label="Expandir painel de informações"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            ) : (
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm animate-fade-in relative">
                <button 
                  onClick={toggleInfoPanel}
                  className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-white/70 backdrop-blur-sm rounded-l-lg flex items-center justify-center"
                  aria-label="Recolher painel de informações"
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
                      className="w-full justify-start mb-2 bg-white/80 hover:bg-white group"
                      onClick={() => setHtmlModalOpen(true)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                      Ver Caso Completo (HTML)
                    </Button>
                  )}
                  
                  {/* Navigation buttons */}
                  <div className="mt-auto flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={goToPreviousCase} 
                      className="bg-white/80 hover:bg-white"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Anterior
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={goToNextCase} 
                      className="bg-white/80 hover:bg-white"
                    >
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
                  onClick={() => {
                    setTransitioning(true);
                    setCurrentIndex(idx);
                  }}
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
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pricing Modal */}
      <PricingModal 
        isOpen={pricingModalOpen} 
        onClose={() => setPricingModalOpen(false)} 
      />
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </div>
  );
};

// Sample HTML content for the visualization
const htmlContent = `
<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
  <div style="margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
    <h2 style="font-size: 24px; margin-bottom: 10px;">Caso Clínico: Prótese sobre Implante</h2>
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <span style="background-color: #f3f4f6; padding: 4px 12px; border-radius: 9999px; font-size: 14px;">Implante</span>
      <span style="background-color: #f3f4f6; padding: 4px 12px; border-radius: 9999px; font-size: 14px;">CAD/CAM</span>
      <span style="background-color: #f3f4f6; padding: 4px 12px; border-radius: 9999px; font-size: 14px;">Zircônia</span>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
    <div>
      <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=800" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
    </div>
    <div>
      <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
    </div>
  </div>

  <div style="margin-bottom: 30px;">
    <h3 style="font-size: 18px; margin-bottom: 10px;">Descrição do Caso</h3>
    <p style="line-height: 1.6; color: #374151;">
      Paciente com ausência dos elementos 14 a 16, necessitando reabilitação protética sobre implantes. 
      Foi realizado planejamento digital completo, seguido de confecção de infraestrutura em zircônia fresada com alta precisão.
    </p>
  </div>

  <div style="margin-bottom: 30px; background-color: #f9fafb; padding: 20px; border-radius: 8px;">
    <h3 style="font-size: 18px; margin-bottom: 10px;">Especificações Técnicas</h3>
    <ul style="list-style-type: none; padding: 0; margin: 0;">
      <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
        <span style="font-weight: 500; display: inline-block; width: 180px;">Material</span>
        <span>Zircônia multicamadas CAD/CAM</span>
      </li>
      <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
        <span style="font-weight: 500; display: inline-block; width: 180px;">Software</span>
        <span>Exocad DentalCAD 3.1</span>
      </li>
      <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
        <span style="font-weight: 500; display: inline-block; width: 180px;">Implantes</span>
        <span>Neodent GM 4.3 x 11.5mm</span>
      </li>
      <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
        <span style="font-weight: 500; display: inline-block; width: 180px;">Conexão</span>
        <span>Interface de titânio</span>
      </li>
      <li style="padding: 8px 0;">
        <span style="font-weight: 500; display: inline-block; width: 180px;">Acabamento</span>
        <span>Caracterização e glaze</span>
      </li>
    </ul>
  </div>

  <div>
    <h3 style="font-size: 18px; margin-bottom: 10px;">Vantagens da Técnica</h3>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
        <p style="font-weight: 500; margin-bottom: 5px;">Precisão</p>
        <p style="font-size: 14px; color: #6b7280;">Alta adaptação marginal</p>
      </div>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
        <p style="font-weight: 500; margin-bottom: 5px;">Estética</p>
        <p style="font-size: 14px; color: #6b7280;">Resultado natural</p>
      </div>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
        <p style="font-weight: 500; margin-bottom: 5px;">Durabilidade</p>
        <p style="font-size: 14px; color: #6b7280;">Material de alta resistência</p>
      </div>
    </div>
  </div>
</div>
`;

export default Cases;
