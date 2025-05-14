
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Mail, MapPin, Clock, Copy, ExternalLink, Phone, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '@/components/ui/sonner';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast(`${label} copiado para a área de transferência`, {
      position: "bottom-right",
      duration: 3000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 bg-black/90 border-none">
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
            {/* Header message */}
            <div className="text-center mb-8">
              <h3 className="text-lg font-medium text-white flex items-center justify-center gap-2 mb-1">
                🤝 Vamos conversar?
              </h3>
              <p className="text-sm text-white/70">
                Estou disponível para novos projetos!
              </p>
            </div>
            
            {/* Email */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 transition-all hover:bg-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <Mail className="h-5 w-5 text-white/70 flex-shrink-0" />
                  <a href="mailto:contato@exemplo.com" className="text-base hover:underline">
                    contato@exemplo.com
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard("contato@exemplo.com", "Email")}
                  className="text-white/50 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Address */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 transition-all hover:bg-white/10">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-white/70 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-base">
                    Av. Paulista, 1000, SP
                  </p>
                  <p className="text-sm text-white/70">
                    CEP: 01310-000
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hours */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 transition-all hover:bg-white/10">
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-white/70 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-base">
                    Segunda a Sexta: 9h às 18h
                  </p>
                  <p className="text-sm text-white/70">
                    Sábado: Mediante agendamento
                  </p>
                </div>
              </div>
            </div>
            
            {/* WhatsApp */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 transition-all hover:bg-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <Phone className="h-5 w-5 text-white/70 flex-shrink-0" />
                  <span className="text-base">
                    WhatsApp: (11) 91234-5678
                  </span>
                </div>
                <a
                  href="https://wa.me/5511912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            {/* Instagram */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 transition-all hover:bg-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                  <Instagram className="h-5 w-5 text-white/70 flex-shrink-0" />
                  <span className="text-base">
                    Instagram: @jhonn.3d
                  </span>
                </div>
                <a
                  href="https://instagram.com/jhonn.3d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="pt-2 text-center">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white border-white/10"
              >
                Continuar no site
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
