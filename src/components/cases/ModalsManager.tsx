
import React, { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import ContactModal from '@/components/ContactModal';
import AboutModal from '@/components/AboutModal';
import HtmlContentModal from '@/components/cases/HtmlContentModal';

interface ModalsManagerProps {
  currentCaseHtmlContent: string;
  currentCaseExocadHtmlUrl?: string;
}

const ModalsManager: React.FC<ModalsManagerProps> = ({
  currentCaseHtmlContent,
  currentCaseExocadHtmlUrl
}) => {
  const [htmlModalOpen, setHtmlModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

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

  return (
    <>
      {/* HTML Content Modal */}
      <HtmlContentModal
        isOpen={htmlModalOpen}
        onOpenChange={setHtmlModalOpen}
        htmlContent={currentCaseHtmlContent}
        exocadHtmlUrl={currentCaseExocadHtmlUrl}
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
      
      {/* Return the handlers for external use */}
      <div className="hidden">
        {/* This div is not rendered, just holding the return values */}
        {JSON.stringify({
          openHtmlModal: () => setHtmlModalOpen(true),
          openContactModal: handleContactOpen,
          openAboutModal: handleAboutOpen
        })}
      </div>
    </>
  );
};

// Export the component and associated hooks
export { ModalsManager };

export const useModals = () => {
  const [htmlModalOpen, setHtmlModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

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

  return {
    htmlModalOpen,
    contactModalOpen,
    aboutModalOpen,
    setHtmlModalOpen,
    setContactModalOpen,
    setAboutModalOpen,
    handleContactOpen,
    handleAboutOpen
  };
};
