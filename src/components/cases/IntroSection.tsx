
import React from 'react';
import { cn } from '@/lib/utils';

interface IntroSectionProps {
  introVisible: boolean;
  textAnimation: {
    title: boolean;
    subtitle: boolean;
    description: boolean;
    tags: boolean;
  };
}

const IntroSection = ({ introVisible, textAnimation }: IntroSectionProps) => {
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 py-12 transition-all duration-1000",
        introVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className={cn(
          "transition-all duration-1000 transform",
          textAnimation.title ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight uppercase text-white">
            PORTFÓLIO DIGITAL ODONTOLÓGICO
          </h1>
          <p className="text-2xl text-white/60 mt-2 font-light uppercase">JONHNATAS LIMA</p>
        </div>
        
        <div className={cn(
          "space-y-6 transition-all duration-1000 delay-300 transform",
          textAnimation.subtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="h-px w-24 bg-white/30 mx-auto my-8"></div>
          
          <p className="text-xl leading-relaxed uppercase text-white">
            ESPECIALISTA EM MODELAGEM 3D PARA APLICAÇÕES ODONTOLÓGICAS,
            COM FOCO EM PRECISÃO, ESTÉTICA E FUNCIONALIDADE.
          </p>
        </div>
        
        <div className={cn(
          "transition-all duration-1000 delay-500 transform",
          textAnimation.description ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="text-lg text-white/60 leading-relaxed uppercase">
            UTILIZANDO SOFTWARE EXOCAD PARA CRIAR SOLUÇÕES PERSONALIZADAS,
            DESDE PRÓTESES SOBRE IMPLANTES ATÉ RESTAURAÇÕES ESTÉTICAS COMPLEXAS.
            INTEGRAÇÃO COMPLETA COM FLUXO DE TRABALHO DIGITAL, PERMITINDO
            RESULTADOS DE ALTA PRECISÃO E PREVISIBILIDADE CLÍNICA.
          </p>
        </div>
        
        <div className={cn(
          "flex flex-wrap justify-center gap-4 py-6 transition-all duration-1000 delay-700 transform",
          textAnimation.tags ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 text-sm font-medium uppercase text-white">EXOCAD DENTALCAD</div>
          <div className="bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 text-sm font-medium uppercase text-white">CAD/CAM</div>
          <div className="bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 text-sm font-medium uppercase text-white">IMPRESSÃO 3D</div>
          <div className="bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 text-sm font-medium uppercase text-white">ZIRCÔNIA</div>
          <div className="bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 text-sm font-medium uppercase text-white">DISSILICATO</div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
