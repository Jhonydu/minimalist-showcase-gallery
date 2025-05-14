
import React, { useState } from 'react';
import { projectsData } from '@/data/projectsData';
import { toast } from '@/components/ui/sonner';
import { Dialog } from '@/components/ui/dialog';

// Import custom hooks
import { useCases } from '@/hooks/use-cases';
import { useIntro } from '@/hooks/use-intro';
import { useModals } from '@/components/cases/ModalsManager';

// Import components
import ModelViewer from '@/components/cases/ModelViewer';
import IntroSection from '@/components/cases/IntroSection';
import CasesContent from '@/components/cases/CasesContent';
import HtmlContentModal from '@/components/cases/HtmlContentModal';
import ContactModal from '@/components/ContactModal';
import AboutModal from '@/components/AboutModal';

const Cases = () => {
  // Custom hooks for state management
  const { 
    currentCase, transitioning, modelLoading, 
    filterCategory, categories, filteredThumbnails,
    setFilterCategory, goToNextCase, goToPreviousCase, 
    handleModelLoad, handleSelectProject 
  } = useCases();
  
  const { introVisible, textAnimation, skipIntro } = useIntro();
  const {
    htmlModalOpen, contactModalOpen, aboutModalOpen,
    setHtmlModalOpen, setContactModalOpen, setAboutModalOpen,
    handleContactOpen, handleAboutOpen
  } = useModals();

  // Local state for UI elements
  const [infoPanelCollapsed, setInfoPanelCollapsed] = useState(false);

  const toggleInfoPanel = () => {
    setInfoPanelCollapsed(!infoPanelCollapsed);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* 3D Model Viewer - load in background during intro */}
      <ModelViewer
        modelUrl={currentCase.modelUrl}
        title={currentCase.title}
        modelLoading={modelLoading}
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

      {/* Main content layout */}
      <CasesContent 
        introVisible={introVisible}
        currentCase={currentCase}
        infoPanelCollapsed={infoPanelCollapsed}
        toggleInfoPanel={toggleInfoPanel}
        openHtmlModal={() => setHtmlModalOpen(true)}
        openContactModal={handleContactOpen}
        openAboutModal={handleAboutOpen}
        categories={categories}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filteredThumbnails={filteredThumbnails}
        onSelectProject={handleSelectProject}
        goToNextCase={goToNextCase}
        goToPreviousCase={goToPreviousCase}
      />

      {/* Modals */}
      <HtmlContentModal
        isOpen={htmlModalOpen}
        onOpenChange={setHtmlModalOpen}
        htmlContent={currentCase.htmlContent}
        exocadHtmlUrl={currentCase.exocadHtmlUrl}
      />

      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
      
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />
    </div>
  );
};

export default Cases;
