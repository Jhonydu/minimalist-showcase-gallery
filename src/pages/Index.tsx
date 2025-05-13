
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ProjectGallery from '@/components/ProjectGallery';
import ProjectModal from '@/components/ProjectModal';
import ContactModal from '@/components/ContactModal';
import { projectsData } from '@/data/projectsData';
import { Project } from '@/components/ProjectGallery';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle state from navigation
  useEffect(() => {
    if (location.state) {
      if (location.state.openContact) {
        setContactModalOpen(true);
        // Clear the state
        navigate('/', { replace: true });
      }
    }
  }, [location, navigate]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const handleProjectModalClose = () => {
    setProjectModalOpen(false);
    // Pequeno atraso antes de limpar o projeto selecionado para evitar efeitos visuais estranhos
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleContactOpen = () => {
    setContactModalOpen(true);
    toast("VISUALIZANDO INFORMAÇÕES DE CONTATO", {
      position: "bottom-right",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header openContact={handleContactOpen} />
      
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
      
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
