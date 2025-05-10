
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Contato</DialogTitle>
          <button 
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5" />
            <a href="mailto:contato@exemplo.com" className="text-lg hover:underline">
              contato@exemplo.com
            </a>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Endereço</h3>
            <p className="text-sm text-muted-foreground">
              Av. Paulista, 1000<br />
              São Paulo, SP<br />
              CEP: 01310-000
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Horário de Atendimento</h3>
            <p className="text-sm text-muted-foreground">
              Segunda a Sexta: 9h às 18h<br />
              Sábados: Mediante agendamento
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
