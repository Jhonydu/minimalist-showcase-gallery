
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ModelViewerProps {
  modelUrl: string;
  title: string;
  modelLoading: boolean;
  transitioning: boolean;
  onLoad: () => void;
}

const ModelViewer = ({ modelUrl, title, modelLoading, transitioning, onLoad }: ModelViewerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const handleIframeLoad = () => {
      // Delay onLoad call slightly to ensure model is rendered
      setTimeout(() => {
        onLoad();
      }, 500);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }
    
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [onLoad]);

  // Create smoother transition effect when switching models
  useEffect(() => {
    if (transitioning) {
      setFadingOut(true);
    } else {
      const timer = setTimeout(() => {
        setFadingOut(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [transitioning]);

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 w-full h-full overflow-hidden pointer-events-auto transition-opacity duration-700",
          (modelLoading || fadingOut) ? "opacity-0" : "opacity-100"
        )}
      >
        <iframe
          ref={iframeRef}
          title={`3D MODEL - ${title.toUpperCase()}`}
          src={`${modelUrl}?autospin=1&autostart=1&ui_controls=1&ui_infos=0&transparent=1`}
          className="w-full h-full scale-110"
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
        />
      </div>

      {transitioning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-white/10 border-t-white/60 animate-spin"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelViewer;
