
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { Project } from './ProjectGallery';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-white">
        <button 
          className="absolute right-4 top-4 z-10 bg-white/80 p-2 rounded-full"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="md:col-span-2 h-full">
            <div className="w-full aspect-video">
              {/* Visualizador 3D - exemplo do Sketchfab */}
              <iframe
                title="3D Model Viewer"
                src={project.modelUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                frameBorder="0"
              ></iframe>
            </div>
            
            <div className="p-6 border-t">
              {/* Área para conteúdo HTML embutido */}
              <div 
                className="w-full"
                dangerouslySetInnerHTML={{ __html: project.htmlContent }}
              ></div>
            </div>
          </div>
          
          <div className="p-6 border-l border-t md:border-t-0">
            <h3 className="text-xl font-medium mb-4">{project.title}</h3>
            <div className="text-sm text-muted-foreground mb-4">{project.type}</div>
            <p className="text-sm">{project.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
