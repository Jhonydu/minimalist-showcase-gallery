
import React, { useEffect, useState } from 'react';
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
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);

  // Generate floating particles effect
  useEffect(() => {
    if (!introVisible) return;

    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 4,
      speed: 0.5 + Math.random() * 1.5
    }));

    setParticles(newParticles);

    // Animate particles
    const animationInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed / 5,
        // Reset particle position when it goes off the screen
        ...(particle.y < -5 ? { y: 105, x: Math.random() * 100 } : {})
      })));
    }, 50);

    return () => clearInterval(animationInterval);
  }, [introVisible]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900/20 to-black px-6 py-12 transition-all duration-1000 overflow-hidden",
        introVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Animated background particles */}
      {particles.map(particle => (
        <div 
          key={particle.id}
          className="absolute rounded-full bg-white/10 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.2 + Math.random() * 0.3,
            transition: 'transform 0.5s ease-out'
          }}
        />
      ))}

      {/* Radial glow effect */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
        <div className={cn(
          "transition-all duration-1000 transform",
          textAnimation.title ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight uppercase text-white animate-pulse">
            PORTFÓLIO DIGITAL ODONTOLÓGICO
          </h1>
          <p className="text-2xl text-white/60 mt-2 font-light uppercase">JONHNATAS LIMA</p>
        </div>
        
        <div className={cn(
          "space-y-6 transition-all duration-1000 delay-300 transform",
          textAnimation.subtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-8"></div>
          
          <p className="text-xl leading-relaxed uppercase text-white">
            ESPECIALISTA EM MODELAGEM 3D PARA APLICAÇÕES ODONTOLÓGICAS,
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-1000 after:animate-[scale-x-100_2s_ease-in-out_forwards]">
              <span className="relative z-10"> FOCO EM PRECISÃO, ESTÉTICA E FUNCIONALIDADE.</span>
            </span>
          </p>
        </div>
        
        <div className={cn(
          "transition-all duration-1000 delay-500 transform relative",
          textAnimation.description ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="text-lg text-white/60 leading-relaxed uppercase relative z-10">
            UTILIZANDO SOFTWARE EXOCAD PARA CRIAR SOLUÇÕES PERSONALIZADAS,
            DESDE PRÓTESES SOBRE IMPLANTES ATÉ RESTAURAÇÕES ESTÉTICAS COMPLEXAS.
            <br />
            <span className="relative inline-block text-white/80 mt-2">
              INTEGRAÇÃO COMPLETA COM FLUXO DE TRABALHO DIGITAL, PERMITINDO
              RESULTADOS DE ALTA PRECISÃO E PREVISIBILIDADE CLÍNICA.
            </span>
          </p>
          
          {/* Animated highlight */}
          <div className="absolute inset-0 bg-white/5 blur-xl rounded-full scale-y-50 scale-x-75 opacity-30 animate-pulse"></div>
        </div>
        
        <div className={cn(
          "flex flex-wrap justify-center gap-4 py-6 transition-all duration-1000 delay-700 transform",
          textAnimation.tags ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {['EXOCAD DENTALCAD', 'CAD/CAM', 'IMPRESSÃO 3D', 'ZIRCÔNIA', 'DISSILICATO'].map((tag, index) => (
            <div 
              key={tag}
              className="bg-white/5 hover:bg-white/10 transition-all duration-300 px-4 py-2 text-sm font-medium uppercase text-white relative overflow-hidden group hover:scale-105"
              style={{ 
                animationDelay: `${index * 200}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {tag}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Animated arrow */}
        <div className={cn(
          "absolute bottom-10 left-1/2 transform -translate-x-1/2",
          textAnimation.tags ? "opacity-100" : "opacity-0",
          "animate-bounce"
        )}>
          <div className="w-6 h-6 border-b-2 border-r-2 border-white/40 transform rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
