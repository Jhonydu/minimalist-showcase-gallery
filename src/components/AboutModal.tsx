
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-gradient-to-br from-[#9b87f5]/90 to-black/95 border-none">
        <div className="p-6">
          <button 
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
          
          <DialogHeader className="mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">SOBRE MIM</h2>
            <DialogDescription className="text-white/60">
              Conheça mais sobre meu trabalho e experiência em modelagem 3D para odontologia
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column with text content - single container */}
            <div className="glass-card p-6">
              <div className="space-y-6 text-justify">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">FORMAÇÃO E EXPERIÊNCIA</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Sou especializado em modelagem digital para aplicações odontológicas, com mais de 5 anos de experiência 
                    utilizando o software exocad para criar soluções personalizadas. Meu trabalho é focado em desenvolver 
                    modelos tridimensionais de alta precisão para próteses, implantes e restaurações estéticas.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">ÁREAS DE ATUAÇÃO</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Desenvolvo projetos de coroas unitárias, pontes, coroas e pontes sobre implantes, lentes de contato dental, 
                    restaurações, provisórios, placas de bruxismo e modelos com implantes. Cada trabalho é cuidadosamente planejado 
                    para atender aos requisitos específicos de cada caso, considerando aspectos estéticos e funcionais.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">METODOLOGIA DE TRABALHO</h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Utilizo uma abordagem meticulosa para cada projeto, buscando aliar precisão técnica com resultados 
                    esteticamente superiores. O processo envolve análise detalhada dos requisitos, modelagem 3D no exocad, 
                    simulação virtual e refinamento constante para alcançar a melhor solução possível para cada caso clínico.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">TECNOLOGIAS UTILIZADAS</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1.5 bg-white/10 text-xs text-white rounded-full">EXOCAD DENTALCAD</span>
                    <span className="px-3 py-1.5 bg-white/10 text-xs text-white rounded-full">CAD/CAM</span>
                    <span className="px-3 py-1.5 bg-white/10 text-xs text-white rounded-full">IMPRESSÃO 3D</span>
                    <span className="px-3 py-1.5 bg-white/10 text-xs text-white rounded-full">ZIRCÔNIA</span>
                    <span className="px-3 py-1.5 bg-white/10 text-xs text-white rounded-full">DISSILICATO</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column with large profile photo */}
            <div className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden h-full flex items-center justify-center">
              {/* Placeholder for profile photo */}
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-500/20 to-black/30 flex flex-col items-center justify-center text-center p-8">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/30 to-black/30 mb-6 backdrop-blur-md border border-white/10"></div>
                <h3 className="text-xl font-medium text-white mb-2">JONHNATAS LIMA</h3>
                <p className="text-white/60 mb-6">Especialista em Modelagem 3D para Odontologia</p>
                
                <div className="space-y-2">
                  <p className="text-sm text-white/80">✉️ contato@exemplo.com</p>
                  <p className="text-sm text-white/80">📱 (00) 00000-0000</p>
                </div>
                
                <Button variant="outline" className="mt-6 bg-white/10 hover:bg-white/20 text-white border-white/10">
                  Entre em Contato
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
