
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ExternalLink } from 'lucide-react';
import { Project } from './ProjectGallery';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import HtmlContentModal from './cases/HtmlContentModal';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [htmlModalOpen, setHtmlModalOpen] = useState(false);
  
  if (!project) return null;

  // Process the Exocad URL to ensure proper HTML rendering
  const getProcessedExocadUrl = (url?: string) => {
    if (!url) return '';
    
    // Add content_type parameter to ensure HTML rendering
    if (url.includes('?')) {
      return `${url}&content_type=text/html`;
    }
    
    return `${url}?content_type=text/html`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-gradient-to-br from-[#9b87f5]/90 to-black/95 border-none">
        <VisuallyHidden>
          <DialogTitle>{project.title}</DialogTitle>
        </VisuallyHidden>
        
        <div className="p-6">
          <button 
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-full">
              <div className="w-full aspect-video relative overflow-hidden rounded-lg">
                {/* Enhanced 3D model viewer with better integration */}
                <iframe
                  title={`3D Model - ${project.title}`}
                  src={`${project.modelUrl}?autostart=1&ui_controls=1&ui_infos=0&ui_theme=dark`}
                  className="w-full h-full absolute inset-0 scale-105"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  frameBorder="0"
                ></iframe>
              </div>
              
              {(project.htmlContent || project.exocadHtmlUrl) && (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-white">Visualização interativa do projeto</h4>
                  </div>
                  
                  <Card className="border-0 overflow-hidden bg-white/10 backdrop-blur-sm">
                    <CardContent className="p-0">
                      {project.exocadHtmlUrl ? (
                        <div className="w-full h-[300px] relative">
                          <Button 
                            variant="secondary" 
                            className="absolute top-2 right-2 z-10 bg-white/80 text-black hover:bg-white"
                            onClick={() => setHtmlModalOpen(true)}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Abrir Visualização Completa
                          </Button>
                          <div className="w-full h-[300px] bg-gray-900 rounded-md">
                            <iframe
                              src={getProcessedExocadUrl(project.exocadHtmlUrl)}
                              className="w-full h-full border-none rounded-md"
                              title="Exocad Preview"
                            ></iframe>
                          </div>
                        </div>
                      ) : project.htmlContent ? (
                        <div className="w-full h-[300px] overflow-auto bg-white rounded-md">
                          <Button 
                            variant="secondary" 
                            className="absolute top-2 right-2 z-10 bg-white/80 text-black hover:bg-white"
                            onClick={() => setHtmlModalOpen(true)}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Abrir Visualização Completa
                          </Button>
                          <div
                            className="w-full h-full overflow-auto p-4"
                            dangerouslySetInnerHTML={{ __html: project.htmlContent }}
                          ></div>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
            
            <div className="bg-black/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-medium text-white mb-4">{project.title}</h3>
              <div className="text-sm text-white/70 mb-4">{project.type}</div>
              <p className="text-sm text-white/90">{project.description}</p>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-sm font-medium text-white mb-2">Tecnologias utilizadas</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white/10 hover:bg-white/15 transition-colors text-xs rounded-full text-white">Exocad</span>
                  <span className="px-2 py-1 bg-white/10 hover:bg-white/15 transition-colors text-xs rounded-full text-white">3D Print</span>
                  <span className="px-2 py-1 bg-white/10 hover:bg-white/15 transition-colors text-xs rounded-full text-white">Zircônia</span>
                </div>
              </div>
              
              <div className="mt-8 pt-4 text-right">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="bg-white/20 hover:bg-white/30 transition-colors text-white border-white/20"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
      
      {/* HTML Content Modal for full-screen viewing */}
      <HtmlContentModal
        isOpen={htmlModalOpen}
        onOpenChange={setHtmlModalOpen}
        htmlContent={project.htmlContent || ""}
        exocadHtmlUrl={project.exocadHtmlUrl}
      />
    </Dialog>
  );
};

export default ProjectModal;
