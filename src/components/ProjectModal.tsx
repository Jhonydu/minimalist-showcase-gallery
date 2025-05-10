
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ExternalLink } from 'lucide-react';
import { Project } from './ProjectGallery';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

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
              {/* Visualizador 3D - iframe do Sketchfab */}
              <iframe
                title="3D Model Viewer"
                src={project.modelUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                frameBorder="0"
              ></iframe>
            </div>
            
            {project.htmlContent && (
              <div className="p-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-medium">Visualização HTML do projeto</h4>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Ver em tela cheia</span>
                  </Button>
                </div>
                
                <Card className="border overflow-hidden">
                  <CardContent className="p-0">
                    <div 
                      className="w-full h-[300px] overflow-auto"
                      dangerouslySetInnerHTML={{ __html: project.htmlContent }}
                    ></div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          <div className="p-6 border-l border-t md:border-t-0">
            <h3 className="text-xl font-medium mb-4">{project.title}</h3>
            <div className="text-sm text-muted-foreground mb-4">{project.type}</div>
            <p className="text-sm">{project.description}</p>
            
            <div className="mt-8 pt-8 border-t">
              <h4 className="text-sm font-medium mb-2">Tecnologias utilizadas</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-secondary text-xs rounded-full">Exocad</span>
                <span className="px-2 py-1 bg-secondary text-xs rounded-full">3D Print</span>
                <span className="px-2 py-1 bg-secondary text-xs rounded-full">Zircônia</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
