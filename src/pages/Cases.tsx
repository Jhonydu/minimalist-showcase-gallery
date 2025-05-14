import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import { projectsData } from '@/data/projectsData';
import { Dialog } from '@/components/ui/dialog';
import ContactModal from '@/components/ContactModal';
import AboutModal from '@/components/AboutModal';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';

// Import the new components
import IntroSection from '@/components/cases/IntroSection';
import ModelViewer from '@/components/cases/ModelViewer';
import FilterBar from '@/components/cases/FilterBar';
import ThumbnailCarousel from '@/components/cases/ThumbnailCarousel';
import InfoPanel from '@/components/cases/InfoPanel';
import HtmlContentModal from '@/components/cases/HtmlContentModal';

// Sample HTML content for the visualization
const htmlContent = `
<div style="font-family: 'Inter', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #fff; text-transform: uppercase; background-color: transparent;">
  <div style="margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 30px;">
    <h1 style="font-size: 32px; margin-bottom: 10px; font-weight: 600;">CASO CLÍNICO: PRÓTESE SOBRE IMPLANTE</h1>
    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px;">
      <span style="background-color: rgba(255,255,255,0.1); padding: 6px 14px; font-size: 14px; font-weight: 500;">IMPLANTE</span>
      <span style="background-color: rgba(255,255,255,0.1); padding: 6px 14px; font-size: 14px; font-weight: 500;">CAD/CAM</span>
      <span style="background-color: rgba(255,255,255,0.1); padding: 6px 14px; font-size: 14px; font-weight: 500;">ZIRCÔNIA</span>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 40px;">
    <div>
      <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=800" style="width: 100%; height: 240px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
    </div>
    <div>
      <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800" style="width: 100%; height: 240px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
    </div>
  </div>

  <div style="margin-bottom: 40px;">
    <h2 style="font-size: 22px; margin-bottom: 16px; font-weight: 600;">DESCRIÇÃO DO CASO</h2>
    <p style="line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 16px;">
      PACIENTE COM AUSÊNCIA DOS ELEMENTOS 14 A 16, NECESSITANDO REABILITAÇÃO PROTÉTICA SOBRE IMPLANTES. 
      FOI REALIZADO PLANEJAMENTO DIGITAL COMPLETO, UTILIZANDO ESCANEAMENTO INTRAORAL E MODELAGEM NO SOFTWARE EXOCAD.
    </p>
    <p style="line-height: 1.8; color: rgba(255,255,255,0.7);">
      APÓS O PLANEJAMENTO VIRTUAL, FOI CONFECCIONADA INFRAESTRUTURA EM ZIRCÔNIA FRESADA COM ALTA PRECISÃO,
      GARANTINDO ADAPTAÇÃO PASSIVA SOBRE OS IMPLANTES E EXCELENTE RESULTADO ESTÉTICO FINAL.
    </p>
  </div>

  <div style="margin-bottom: 40px; background-color: rgba(255,255,255,0.05); padding: 30px; border-radius: 12px;">
    <h2 style="font-size: 22px; margin-bottom: 20px; font-weight: 600;">ESPECIFICAÇÕES TÉCNICAS</h2>
    <ul style="list-style-type: none; padding: 0; margin: 0;">
      <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #fff;">MATERIAL</span>
        <span style="color: rgba(255,255,255,0.7);">ZIRCÔNIA MULTICAMADAS CAD/CAM</span>
      </li>
      <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #fff;">SOFTWARE</span>
        <span style="color: rgba(255,255,255,0.7);">EXOCAD DENTALCAD 3.1</span>
      </li>
      <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #fff;">IMPLANTES</span>
        <span style="color: rgba(255,255,255,0.7);">NEODENT GM 4.3 X 11.5MM</span>
      </li>
      <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #fff;">CONEXÃO</span>
        <span style="color: rgba(255,255,255,0.7);">INTERFACE DE TITÂNIO</span>
      </li>
      <li style="padding: 12px 0; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #fff;">ACABAMENTO</span>
        <span style="color: rgba(255,255,255,0.7);">CARACTERIZAÇÃO E GLAZE</span>
      </li>
    </ul>
  </div>

  <div>
    <h2 style="font-size: 22px; margin-bottom: 20px; font-weight: 600;">VANTAGENS DA TÉCNICA</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
      <div style="background-color: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; text-align: center;">
        <h3 style="font-weight: 600; margin-bottom: 8px; font-size: 18px;">PRECISÃO</h3>
        <p style="font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.6;">ALTA ADAPTAÇÃO MARGINAL E EXCELENTE AJUSTE OCLUSAL</p>
      </div>
      <div style="background-color: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; text-align: center;">
        <h3 style="font-weight: 600; margin-bottom: 8px; font-size: 18px;">ESTÉTICA</h3>
        <p style="font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.6;">RESULTADO NATURAL E HARMONIOSO COM OS ELEMENTOS ADJACENTES</p>
      </div>
      <div style="background-color: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; text-align: center;">
        <h3 style="font-weight: 600; margin-bottom: 8px; font-size: 18px;">DURABILIDADE</h3>
        <p style="font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.6;">MATERIAL DE ALTA RESISTÊNCIA PARA FUNÇÃO PROLONGADA</p>
      </div>
    </div>
  </div>
  
  <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
    <p style="color: rgba(255,255,255,0.5); font-size: 14px;">© 2025 PORTFÓLIO DIGITAL ODONTOLÓGICO | JONHNATAS LIMA</p>
  </div>
</div>
`;

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
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [filterCategory, setFilterCategory] = useState("TODOS");
  
  const isMobile = useIsMobile();
  const currentCase = projectsData[currentIndex];

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
  }, [currentIndex]);

  const handleModelLoad = () => {
    setTimeout(() => {
      setTransitioning(false);
      setModelLoading(false);
    }, 800);
  };

  // Effect to handle filter category changes
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
  
  const handleAboutOpen = () => {
    setAboutModalOpen(true);
    toast("QUEM SOU EU", {
      position: "bottom-right",
      duration: 3000,
    });
  };

  const handleSelectProject = (idx: number) => {
    setTransitioning(true);
    setCurrentIndex(idx);
  };

  // Filter projects based on category
  const filteredThumbnails = filterCategory === "TODOS" 
    ? projectsData 
    : projectsData.filter(project => project.type?.toUpperCase() === filterCategory);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Intro Section */}
      <IntroSection 
        introVisible={introVisible} 
        textAnimation={textAnimation} 
      />

      {/* 3D Model Viewer */}
      <ModelViewer
        modelUrl={currentCase.modelUrl}
        title={currentCase.title}
        modelLoading={modelLoading}
        transitioning={transitioning}
        onLoad={handleModelLoad}
      />

      {/* Content layout */}
      <div className={cn(
        "relative z-10 pointer-events-none transition-opacity duration-700",
        introVisible ? "opacity-0" : "opacity-100"
      )}>
        <Header 
          openContact={handleContactOpen}
          openAbout={handleAboutOpen}
          className="bg-black/5 backdrop-blur-sm pointer-events-auto"
        />
        
        <div className="pt-24 md:pt-28 px-4 md:px-6 w-full h-[calc(100vh-6rem)] flex flex-col">
          {/* Mobile navigation arrows */}
          {isMobile && (
            <>
              <button 
                onClick={goToPreviousCase}
                className="fixed left-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center pointer-events-auto transition-colors"
                aria-label="Caso anterior"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              <button 
                onClick={goToNextCase}
                className="fixed right-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center pointer-events-auto transition-colors"
                aria-label="Próximo caso"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}
          
          {/* Info Panel */}
          <InfoPanel
            title={currentCase.title}
            description={currentCase.description}
            type={currentCase.type}
            htmlContent={currentCase.htmlContent}
            exocadHtmlUrl={currentCase.exocadHtmlUrl}
            infoPanelCollapsed={infoPanelCollapsed}
            onToggleInfoPanel={toggleInfoPanel}
            onShowHtmlModal={() => setHtmlModalOpen(true)}
            onNavigateNext={goToNextCase}
            onNavigatePrevious={goToPreviousCase}
            isMobile={isMobile}
          />
          
          {/* Filter Bar */}
          <FilterBar
            categories={categories}
            selectedCategory={filterCategory}
            onSelectCategory={setFilterCategory}
          />
          
          {/* Thumbnail Carousel */}
          <ThumbnailCarousel
            projects={filteredThumbnails}
            currentProjectId={currentCase.id}
            onSelectProject={(idx) => {
              const projectIndex = projectsData.findIndex(p => p.id === filteredThumbnails[idx].id);
              handleSelectProject(projectIndex);
            }}
          />
        </div>
      </div>

      {/* HTML Content Modal */}
      <HtmlContentModal
        isOpen={htmlModalOpen}
        onOpenChange={setHtmlModalOpen}
        htmlContent={currentCase.htmlContent || htmlContent}
        exocadHtmlUrl={currentCase.exocadHtmlUrl}
      />

      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
      
      {/* About Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />
    </div>
  );
};

export default Cases;
