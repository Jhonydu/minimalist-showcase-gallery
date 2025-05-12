
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 bg-gradient-to-br from-[#9b87f5]/90 to-black/95 border-none">
        <div className="p-6 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium text-white">Tabela de Preços</DialogTitle>
            <button 
              className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          
          <div className="space-y-6 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-all hover:bg-white/15">
              <h3 className="text-lg font-medium text-white mb-2">Visualização 3D Básica</h3>
              <div className="text-2xl font-light mb-2 text-white/90">R$ 1.200</div>
              <p className="text-sm text-white/70">
                Renderização 3D do projeto com visualização interativa básica.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-all hover:bg-white/15">
              <h3 className="text-lg font-medium text-white mb-2">Modelo Completo</h3>
              <div className="text-2xl font-light mb-2 text-white/90">R$ 2.800</div>
              <p className="text-sm text-white/70">
                Modelo 3D completo com texturas detalhadas e ambientação.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-all hover:bg-white/15">
              <h3 className="text-lg font-medium text-white mb-2">Projeto Customizado</h3>
              <div className="text-2xl font-light mb-2 text-white/90">Entre em contato</div>
              <p className="text-sm text-white/70">
                Para projetos especiais com necessidades específicas.
              </p>
            </div>
            
            <div className="pt-2 text-center">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
