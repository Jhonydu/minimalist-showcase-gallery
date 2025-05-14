
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { projectsData } from '@/data/projectsData';
import { Dialog } from '@/components/ui/dialog';
import ContactModal from '@/components/ContactModal';
import AboutModal from '@/components/AboutModal';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';

// Import the components
import IntroSection from '@/components/cases/IntroSection';
import ModelViewer from '@/components/cases/ModelViewer';
import FilterBar from '@/components/cases/FilterBar';
import ThumbnailCarousel from '@/components/cases/ThumbnailCarousel';
import InfoPanel from '@/components/cases/InfoPanel';
import HtmlContentModal from '@/components/cases/HtmlContentModal';

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
      if (!modelLoading) {
        setIntroVisible(false);
      }
    }, 10000);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(descriptionTimer);
      clearTimeout(tagsTimer);
      clearTimeout(introTimer);
    };
  }, [modelLoading]);
  
  // Handle model loading status
  useEffect(() => {
    if (!introVisible) {
      setModelLoading(true);
    }
  }, [currentIndex, introVisible]);

  const handleModelLoad = () => {
    setTimeout(() => {
      setTransitioning(false);
      setModelLoading(false);
      
      // If the intro is still visible and the model is loaded,
      // we'll let the natural timeout hide the intro
    }, 800);
  };

  // Skip intro and go straight to model view
  const skipIntro = () => {
    setIntroVisible(false);
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
    toast("SOBRE MIM", {
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
      {/* Always render ModelViewer to allow preloading in background during intro */}
      <ModelViewer
        modelUrl={currentCase.modelUrl}
        title={currentCase.title}
        modelLoading={introVisible || modelLoading}
        transitioning={transitioning}
        onLoad={handleModelLoad}
      />

      {/* Intro Section - updated with modelLoaded prop and onSkipIntro callback */}
      <IntroSection 
        introVisible={introVisible} 
        textAnimation={textAnimation}
        onSkipIntro={skipIntro}
        modelLoaded={!modelLoading} 
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

          {/* Thumbnail Carousel with integrated navigation buttons */}
          <ThumbnailCarousel
            projects={filteredThumbnails}
            currentProjectId={currentCase.id}
            onSelectProject={(idx) => {
              const projectIndex = projectsData.findIndex(p => p.id === filteredThumbnails[idx].id);
              handleSelectProject(projectIndex);
            }}
            onNavigateNext={goToNextCase}
            onNavigatePrevious={goToPreviousCase}
          />
        </div>
      </div>

      {/* HTML Content Modal */}
      <HtmlContentModal
        isOpen={htmlModalOpen}
        onOpenChange={setHtmlModalOpen}
        htmlContent={currentCase.htmlContent}
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
