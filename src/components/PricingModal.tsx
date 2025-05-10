
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Preços</DialogTitle>
          <button 
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Visualização 3D Básica</h3>
            <div className="text-2xl font-light mb-2">R$ 1.200</div>
            <p className="text-sm text-muted-foreground">
              Renderização 3D do projeto com visualização interativa básica.
            </p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium mb-2">Modelo Completo</h3>
            <div className="text-2xl font-light mb-2">R$ 2.800</div>
            <p className="text-sm text-muted-foreground">
              Modelo 3D completo com texturas detalhadas e ambientação.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Projeto Customizado</h3>
            <div className="text-2xl font-light mb-2">Entre em contato</div>
            <p className="text-sm text-muted-foreground">
              Para projetos especiais com necessidades específicas.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
