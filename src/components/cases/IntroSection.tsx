
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface IntroSectionProps {
  introVisible: boolean;
  textAnimation: {
    title: boolean;
    subtitle: boolean;
    description: boolean;
    tags: boolean;
  };
  onSkipIntro: () => void;
  modelLoaded: boolean;
}

const IntroSection = ({ introVisible, textAnimation, onSkipIntro, modelLoaded }: IntroSectionProps) => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);
  const [showSkipButton, setShowSkipButton] = useState(false);

  // Generate floating particles effect
  useEffect(() => {
    if (!introVisible) return;

    const particleCount = 40;
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

  // Show skip button as soon as model is loaded
  useEffect(() => {
    if (modelLoaded && introVisible) {
      setShowSkipButton(true);
    }
  }, [modelLoaded, introVisible]);

  // Categories for dental work
  const dentalServices = [
    'COROAS', 
    'COROAS SOBRE IMPLANTE', 
    'PONTES', 
    'PONTES SOBRE IMPLANTE', 
    'LENTES', 
    'RESTAURADOS', 
    'PROVISÓRIOS', 
    'CASCA DE OVO', 
    'PLACAS DE BRUXISMO', 
    'PLANEJAMENTOS', 
    'MODELOS', 
    'MODELOS COM IMPLANTE E GENGIVA'
  ];

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 py-12 transition-all duration-1000 overflow-hidden",
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

      {/* Glow effects */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-gradient-to-r from-white/3 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-10 w-[250px] h-[250px] bg-gradient-to-r from-white/3 to-transparent rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <div className={cn(
          "transition-all duration-1000 transform",
          textAnimation.title ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h1 className="text-4xl sm:text-7xl font-bold mb-6 tracking-tight uppercase text-white animate-pulse">
            PORTFÓLIO DIGITAL ODONTOLÓGICO
          </h1>
          <p className="text-2xl text-white/60 mt-4 font-light uppercase">JONHNATAS LIMA</p>
        </div>
        
        <div className={cn(
          "space-y-6 transition-all duration-1000 delay-300 transform",
          textAnimation.subtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-8"></div>
          
          <p className="text-xl leading-relaxed uppercase text-white">
            ESPECIALISTA EM MODELAGEM 3D PARA APLICAÇÕES ODONTOLÓGICAS,
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-1000 after:animate-[scale-x-100_2s_ease-in-out_forwards]">
              <span className="relative z-10"> FOCO EM PRECISÃO, ESTÉTICA E FUNCIONALIDADE.</span>
            </span>
          </p>
        </div>
        
        {/* Service categories - with enhanced styling and larger boxes */}
        <div className={cn(
          "transition-all duration-1000 delay-700 transform mt-12",
          textAnimation.tags ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 py-8">
            {dentalServices.map((service, index) => (
              <div 
                key={service}
                className="bg-white/10 hover:bg-white/15 transition-all duration-500 px-4 py-6 text-sm md:text-base font-medium uppercase text-white relative overflow-hidden group hover:scale-105 rounded-md backdrop-blur-sm"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">{service}</div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated skip button - positioned better at the bottom */}
        {showSkipButton && (
          <div 
            className={cn(
              "fixed bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-700 cursor-pointer",
              showSkipButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            onClick={onSkipIntro}
          >
            <div className="flex flex-col items-center space-y-2 group">
              <span className="text-white/60 text-sm font-medium uppercase group-hover:text-white transition-colors">Pular introdução</span>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 animate-bounce">
                <ChevronDown className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroSection;
