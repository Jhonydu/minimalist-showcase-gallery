
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { AspectRatio } from './ui/aspect-ratio';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl p-0 bg-black/90 border-none">
        <div className="p-6 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium text-white">Sobre Mim</DialogTitle>
            <button 
              className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Large photo area */}
            <div className="overflow-hidden rounded-lg">
              <AspectRatio ratio={4/5} className="bg-black/20">
                <div className="w-full h-full bg-gradient-to-br from-purple-light to-purple-dark opacity-70 flex items-center justify-center">
                  <span className="text-4xl font-light text-white">JL</span>
                </div>
              </AspectRatio>
            </div>
            
            {/* Content area - unified in a single glass panel */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Jonhnatas Lima</h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  Especialista em modelagem digital 3D para aplicações odontológicas, com mais de 8 anos de experiência
                  no desenvolvimento de soluções personalizadas usando tecnologia ExoCAD.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Expertise</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span>Modelagem de próteses sobre implantes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span>Planejamento digital de soluções estéticas</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span>Integração com tecnologias CAD/CAM</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-white">•</span>
                    <span>Desenvolvimento de fluxos digitais odontológicos</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Missão</h4>
                <p className="text-sm text-white/70 leading-relaxed text-justify">
                  Criar soluções odontológicas personalizadas com precisão técnica e foco na harmonia estética,
                  garantindo resultados de excelência que transformam sorrisos e vidas.
                </p>
              </div>
              
              <div className="pt-2 text-center">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/10"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
