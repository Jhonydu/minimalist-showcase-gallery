
import React, { useState } from 'react';
import Header from '@/components/Header';
import ProjectGallery from '@/components/ProjectGallery';
import ProjectModal from '@/components/ProjectModal';
import PricingModal from '@/components/PricingModal';
import ContactModal from '@/components/ContactModal';
import { projectsData } from '@/data/projectsData';
import { Project } from '@/components/ProjectGallery';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const handleProjectModalClose = () => {
    setProjectModalOpen(false);
    // Pequeno atraso antes de limpar o projeto selecionado para evitar efeitos visuais estranhos
    setTimeout(() => setSelectedProject(null), 300);
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
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        openPricing={handlePricingOpen} 
        openContact={handleContactOpen} 
      />
      
      <main className="min-h-screen">
        <ProjectGallery 
          projects={projectsData} 
          onProjectClick={handleProjectClick} 
        />
      </main>

      {/* Modais */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={projectModalOpen} 
        onClose={handleProjectModalClose} 
      />
      
      <PricingModal 
        isOpen={pricingModalOpen} 
        onClose={() => setPricingModalOpen(false)} 
      />
      
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
