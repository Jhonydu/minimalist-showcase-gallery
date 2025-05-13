
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ChevronRight as CollapseIcon, Filter } from 'lucide-react';
import Header from '@/components/Header';
import { projectsData } from '@/data/projectsData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ContactModal from '@/components/ContactModal';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

const Cases = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoPanelCollapsed, setInfoPanelCollapsed] = useState(false);
  const [htmlModalOpen, setHtmlModalOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [textAnimation, setTextAnimation] = useState({
    title: false,
    subtitle: false,
    description: false,
    tags: false
  });
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [filterCategory, setFilterCategory] = useState("TODOS");
  
  const currentCase = projectsData[currentIndex];
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract unique categories from projects and convert to uppercase
  const categories = ["TODOS", ...Array.from(new Set(projectsData.map(project => project.type?.toUpperCase() || "OUTROS")))];

  // Handle intro animation & timing with sequential text reveal
  useEffect(() => {
    // Set title for SEO
    document.title = "PORTFÓLIO 3D ODONTOLÓGICO | JONHNATAS LIMA | PROJETOS EXOCAD";
    
    // Sequence the text animations
    const titleTimer = setTimeout(() => setTextAnimation(prev => ({ ...prev, title: true })), 500);
    const subtitleTimer = setTimeout(() => setTextAnimation(prev => ({ ...prev, subtitle: true })), 1800);
    const descriptionTimer = setTimeout(() => setTextAnimation(prev => ({ ...prev, description: true })), 3200);
    const tagsTimer = setTimeout(() => setTextAnimation(prev => ({ ...prev, tags: true })), 5000);
    
    // Hide intro after 10 seconds
    const introTimer = setTimeout(() => {
      setIntroVisible(false);
    }, 10000);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(descriptionTimer);
      clearTimeout(tagsTimer);
      clearTimeout(introTimer);
    };
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

  // New effect to handle filter category changes
  useEffect(() => {
    if (filterCategory === "TODOS") {
      // If filter is set to "TODOS", go back to the first case
      setTransitioning(true);
      setCurrentIndex(0);
    } else {
      // Find the first case with the selected category
      const firstMatchingIndex = projectsData.findIndex(
        project => project.type?.toUpperCase() === filterCategory
      );
      
      if (firstMatchingIndex !== -1) {
        setTransitioning(true);
        setCurrentIndex(firstMatchingIndex);
      }
    }
  }, [filterCategory]);

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

  const handleContactOpen = () => {
    setContactModalOpen(true);
    toast("VISUALIZANDO INFORMAÇÕES DE CONTATO", {
      position: "bottom-right",
      duration: 3000,
    });
  };

  // Filter projects based on category
  const filteredThumbnails = filterCategory === "TODOS" 
    ? projectsData 
    : projectsData.filter(project => project.type?.toUpperCase() === filterCategory);

  return (
    <div className="min-h-screen bg-[#e5e5e5] overflow-hidden">
      {/* Intro Section - Absolute positioning to overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#e5e5e5] px-6 py-12 transition-all duration-1000",
          introVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className={cn(
            "transition-all duration-1000 transform",
            textAnimation.title ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight uppercase">
              PORTFÓLIO DIGITAL ODONTOLÓGICO
            </h1>
            <p className="text-2xl text-muted-foreground mt-2 font-light uppercase">JONHNATAS LIMA</p>
          </div>
          
          <div className={cn(
            "space-y-6 transition-all duration-1000 delay-300 transform",
            textAnimation.subtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="h-px w-24 bg-primary/50 mx-auto my-8"></div>
            
            <p className="text-xl leading-relaxed uppercase">
              ESPECIALISTA EM MODELAGEM 3D PARA APLICAÇÕES ODONTOLÓGICAS,
              COM FOCO EM PRECISÃO, ESTÉTICA E FUNCIONALIDADE.
            </p>
          </div>
          
          <div className={cn(
            "transition-all duration-1000 delay-500 transform",
            textAnimation.description ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <p className="text-lg text-muted-foreground leading-relaxed uppercase">
              UTILIZANDO SOFTWARE EXOCAD PARA CRIAR SOLUÇÕES PERSONALIZADAS,
              DESDE PRÓTESES SOBRE IMPLANTES ATÉ RESTAURAÇÕES ESTÉTICAS COMPLEXAS.
              INTEGRAÇÃO COMPLETA COM FLUXO DE TRABALHO DIGITAL, PERMITINDO
              RESULTADOS DE ALTA PRECISÃO E PREVISIBILIDADE CLÍNICA.
            </p>
          </div>
          
          <div className={cn(
            "flex flex-wrap justify-center gap-4 py-6 transition-all duration-1000 delay-700 transform",
            textAnimation.tags ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="bg-secondary/50 px-4 py-2 text-sm font-medium uppercase">EXOCAD DENTALCAD</div>
            <div className="bg-secondary/50 px-4 py-2 text-sm font-medium uppercase">CAD/CAM</div>
            <div className="bg-secondary/50 px-4 py-2 text-sm font-medium uppercase">IMPRESSÃO 3D</div>
            <div className="bg-secondary/50 px-4 py-2 text-sm font-medium uppercase">ZIRCÔNIA</div>
            <div className="bg-secondary/50 px-4 py-2 text-sm font-medium uppercase">DISSILICATO</div>
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
          title={`3D MODEL - ${currentCase.title.toUpperCase()}`}
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
            <span className="mt-3 text-sm uppercase">CARREGANDO MODELO...</span>
          </div>
        </div>
      )}

      {/* Content layout */}
      <div className={cn(
        "relative z-10 pointer-events-none transition-opacity duration-700",
        introVisible ? "opacity-0" : "opacity-100"
      )}>
        <Header 
          openContact={handleContactOpen}
          className="bg-transparent backdrop-blur-sm pointer-events-auto"
        />
        
        <div className="pt-24 md:pt-28 px-4 md:px-6 w-full h-[calc(100vh-6rem)] flex flex-col">
          {/* Collapsible Info panel - Updated positioning and styling */}
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
                className="absolute right-6 top-24 w-10 h-10 flex items-center justify-center z-20"
                aria-label="Expandir painel de informações"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg animate-fade-in relative border-t border-l border-white/20" style={{borderTopRightRadius: '12px', borderBottomLeftRadius: '12px'}}>
                <button 
                  onClick={toggleInfoPanel}
                  className="absolute right-3 top-3 w-8 h-8 flex items-center justify-center"
                  aria-label="Recolher painel de informações"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div>
                  <h1 className="text-xl font-medium mb-4 uppercase">{currentCase.title}</h1>
                  <p className="text-sm text-muted-foreground mb-6 uppercase">{currentCase.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2 uppercase">TECNOLOGIAS</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentCase.type && (
                        <span className="text-xs uppercase">{currentCase.type}</span>
                      )}
                      <span className="text-xs uppercase">EXOCAD</span>
                      <span className="text-xs uppercase">3D PRINT</span>
                    </div>
                  </div>
                  
                  {currentCase.htmlContent && (
                    <Button 
                      variant="link"
                      size="sm"
                      className="w-full justify-start mb-2 p-0 uppercase hover:text-primary transition-colors group"
                      onClick={() => setHtmlModalOpen(true)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                      VER CASO COMPLETO (HTML)
                    </Button>
                  )}
                  
                  {/* Navigation buttons - Updated for better visibility */}
                  <div className="mt-auto flex justify-between pt-4">
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={goToPreviousCase} 
                      className="p-0 uppercase hover:text-primary transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      ANTERIOR
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={goToNextCase} 
                      className="p-0 uppercase hover:text-primary transition-colors"
                    >
                      PRÓXIMO
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Filter Bar - Reduced spacing */}
          <div className="fixed top-24 left-6 z-10 py-3 pointer-events-auto">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center">
                {categories.map((category, idx) => (
                  <React.Fragment key={category}>
                    {idx > 0 && <span className="text-muted-foreground mx-0.5">|</span>}
                    <button
                      onClick={() => setFilterCategory(category)}
                      className={cn(
                        "px-1 py-1 text-xs uppercase transition-colors",
                        filterCategory === category
                          ? 'text-primary font-medium underline underline-offset-4'
                          : 'text-muted-foreground hover:text-primary'
                      )}
                    >
                      {category}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Info Panel - Moved to bottom with collapse/expand button in middle */}
          <div className="md:hidden fixed bottom-16 left-0 right-0 z-10 pointer-events-auto">
            <div className="flex flex-col items-center">
              <button 
                onClick={toggleInfoPanel}
                className="mb-2 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full"
              >
                {infoPanelCollapsed ? 
                  <ChevronRight className="h-5 w-5 transform -rotate-90" /> : 
                  <ChevronRight className="h-5 w-5 transform rotate-90" />
                }
              </button>
              
              {!infoPanelCollapsed && (
                <div className="bg-white/5 backdrop-blur-sm p-4 w-full max-h-28 overflow-y-auto border-t border-white/20">
                  <h3 className="text-sm font-medium uppercase">{currentCase.title}</h3>
                  <p className="text-xs text-muted-foreground uppercase line-clamp-2">{currentCase.description}</p>
                  
                  <div className="flex justify-between mt-2">
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={goToPreviousCase}
                      className="p-0 text-xs uppercase hover:text-primary transition-colors"
                    >
                      <ChevronLeft className="h-3 w-3 mr-0.5" />
                      ANTERIOR
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={goToNextCase}
                      className="p-0 text-xs uppercase hover:text-primary transition-colors"
                    >
                      PRÓXIMO
                      <ChevronRight className="h-3 w-3 ml-0.5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mini Carousel of Thumbnails - Updated to remove background */}
          <div className="fixed bottom-4 left-0 right-0 flex justify-center overflow-x-auto py-2 px-4 pointer-events-auto">
            <div className="flex gap-2 p-2">
              {filteredThumbnails.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => {
                    setTransitioning(true);
                    setCurrentIndex(projectsData.findIndex(p => p.id === project.id));
                  }}
                  className={cn(
                    "transition-all duration-300 rounded-full overflow-hidden group",
                    currentCase.id === project.id ? "ring-2 ring-primary scale-110" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <div className="relative">
                    <img 
                      src={project.thumbnail} 
                      alt={project.title.toUpperCase()}
                      className="h-10 w-10 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                        {project.title.substring(0, 8).toUpperCase()}...
                      </span>
                    </div>
                  </div>
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
                  className="w-full h-full overflow-auto p-4 styled-html-content"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </div>
  );
};

// Sample HTML content for the visualization inspired by kenyihancco.com
const htmlContent = `
<div style="font-family: 'Inter', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; text-transform: uppercase;">
  <div style="margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 30px;">
    <h1 style="font-size: 32px; margin-bottom: 10px; font-weight: 600;">CASO CLÍNICO: PRÓTESE SOBRE IMPLANTE</h1>
    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px;">
      <span style="background-color: #f3f4f6; padding: 6px 14px; font-size: 14px; font-weight: 500;">IMPLANTE</span>
      <span style="background-color: #f3f4f6; padding: 6px 14px; font-size: 14px; font-weight: 500;">CAD/CAM</span>
      <span style="background-color: #f3f4f6; padding: 6px 14px; font-size: 14px; font-weight: 500;">ZIRCÔNIA</span>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 40px;">
    <div>
      <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=800" style="width: 100%; height: 240px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    </div>
    <div>
      <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800" style="width: 100%; height: 240px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    </div>
  </div>

  <div style="margin-bottom: 40px;">
    <h2 style="font-size: 22px; margin-bottom: 16px; font-weight: 600;">DESCRIÇÃO DO CASO</h2>
    <p style="line-height: 1.8; color: #374151; margin-bottom: 16px;">
      PACIENTE COM AUSÊNCIA DOS ELEMENTOS 14 A 16, NECESSITANDO REABILITAÇÃO PROTÉTICA SOBRE IMPLANTES. 
      FOI REALIZADO PLANEJAMENTO DIGITAL COMPLETO, UTILIZANDO ESCANEAMENTO INTRAORAL E MODELAGEM NO SOFTWARE EXOCAD.
    </p>
    <p style="line-height: 1.8; color: #374151;">
      APÓS O PLANEJAMENTO VIRTUAL, FOI CONFECCIONADA INFRAESTRUTURA EM ZIRCÔNIA FRESADA COM ALTA PRECISÃO,
      GARANTINDO ADAPTAÇÃO PASSIVA SOBRE OS IMPLANTES E EXCELENTE RESULTADO ESTÉTICO FINAL.
    </p>
  </div>

  <div style="margin-bottom: 40px; background-color: #f9fafb; padding: 30px; border-radius: 12px;">
    <h2 style="font-size: 22px; margin-bottom: 20px; font-weight: 600;">ESPECIFICAÇÕES TÉCNICAS</h2>
    <ul style="list-style-type: none; padding: 0; margin: 0;">
      <li style="padding: 12px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #111;">MATERIAL</span>
        <span>ZIRCÔNIA MULTICAMADAS CAD/CAM</span>
      </li>
      <li style="padding: 12px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #111;">SOFTWARE</span>
        <span>EXOCAD DENTALCAD 3.1</span>
      </li>
      <li style="padding: 12px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #111;">IMPLANTES</span>
        <span>NEODENT GM 4.3 X 11.5MM</span>
      </li>
      <li style="padding: 12px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #111;">CONEXÃO</span>
        <span>INTERFACE DE TITÂNIO</span>
      </li>
      <li style="padding: 12px 0; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #111;">ACABAMENTO</span>
        <span>CARACTERIZAÇÃO E GLAZE</span>
      </li>
    </ul>
  </div>

  <div>
    <h2 style="font-size: 22px; margin-bottom: 20px; font-weight: 600;">VANTAGENS DA TÉCNICA</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
      <div style="background-color: #f3f4f6; padding: 24px; border-radius: 12px; text-align: center;">
        <h3 style="font-weight: 600; margin-bottom: 8px; font-size: 18px;">PRECISÃO</h3>
        <p style="font-size: 15px; color: #6b7280; line-height: 1.6;">ALTA ADAPTAÇÃO MARGINAL E EXCELENTE AJUSTE OCLUSAL</p>
      </div>
      <div style="background-color: #f3f4f6; padding: 24px; border-radius: 12px; text-align: center;">
        <h3 style="font-weight: 600; margin-bottom: 8px; font-size: 18px;">ESTÉTICA</h3>
        <p style="font-size: 15px; color: #6b7280; line-height: 1.6;">RESULTADO NATURAL E HARMONIOSO COM OS ELEMENTOS ADJACENTES</p>
      </div>
      <div style="background-color: #f3f4f6; padding: 24px; border-radius: 12px; text-align: center;">
        <h3 style="font-weight: 600; margin-bottom: 8px; font-size: 18px;">DURABILIDADE</h3>
        <p style="font-size: 15px; color: #6b7280; line-height: 1.6;">MATERIAL DE ALTA RESISTÊNCIA PARA FUNÇÃO PROLONGADA</p>
      </div>
    </div>
  </div>
  
  <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee; text-align: center;">
    <p style="color: #6b7280; font-size: 14px;">© 2025 PORTFÓLIO DIGITAL ODONTOLÓGICO | JONHNATAS LIMA</p>
  </div>
</div>
`;

export default Cases;
