
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 bg-gradient-to-br from-[#9b87f5]/90 to-black/95 border-none">
        <div className="p-6 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium text-white">Contato</DialogTitle>
            <button 
              className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </DialogHeader>
          
          <div className="space-y-6 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-all hover:bg-white/15">
              <div className="flex items-center gap-3 text-white">
                <Mail className="h-5 w-5 text-white/70" />
                <a href="mailto:contato@exemplo.com" className="text-lg hover:underline">
                  contato@exemplo.com
                </a>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-all hover:bg-white/15">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-white/70 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Endereço</h3>
                  <p className="text-sm text-white/70">
                    Av. Paulista, 1000<br />
                    São Paulo, SP<br />
                    CEP: 01310-000
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transition-all hover:bg-white/15">
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-white/70 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Horário de Atendimento</h3>
                  <p className="text-sm text-white/70">
                    Segunda a Sexta: 9h às 18h<br />
                    Sábados: Mediante agendamento
                  </p>
                </div>
              </div>
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

export default ContactModal;
