
import React, { useRef, useEffect } from 'react';
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

  useEffect(() => {
    const handleIframeLoad = () => {
      onLoad();
      
      // Apply custom styling to the Sketchfab iframe to make the model smaller
      setTimeout(() => {
        if (iframeRef.current) {
          try {
            const iframe = iframeRef.current;
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            
            if (iframeDoc) {
              // Create a style element to inject custom CSS
              const style = iframeDoc.createElement('style');
              style.textContent = `
                .model-container { 
                  transform: scale(0.75) !important; 
                }
              `;
              iframeDoc.head.appendChild(style);
              
              console.log("Applied custom styling to Sketchfab iframe");
            }
          } catch (err) {
            console.error("Error applying custom styles to iframe:", err);
          }
        }
      }, 2000); // Delay to ensure the iframe content is loaded
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

  // Construct Sketchfab URL with parameters to hide UI elements
  const getSketchfabUrl = (url: string) => {
    // Base parameters
    const params = new URLSearchParams({
      autospin: "1",
      autostart: "1",
      ui_controls: "0", // Hide controls 
      ui_infos: "0",    // Hide info button
      ui_inspector: "0", // Hide inspector
      ui_watermark: "0", // Hide watermark
      ui_ar: "0",       // Hide AR button
      ui_help: "0",     // Hide help button
      ui_settings: "0", // Hide settings
      ui_vr: "0",       // Hide VR button
      ui_fullscreen: "0", // Hide fullscreen button
      ui_annotations: "0", // Hide annotations
      transparent: "1"
    });
    
    // Check if URL already has parameters
    if (url.includes('?')) {
      return `${url}&${params.toString()}`;
    }
    
    return `${url}?${params.toString()}`;
  };

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 w-full h-full overflow-hidden pointer-events-auto transition-opacity duration-700",
          (modelLoading || transitioning) ? "opacity-0" : "opacity-100"
        )}
      >
        <iframe
          ref={iframeRef}
          title={`3D MODEL - ${title.toUpperCase()}`}
          src={getSketchfabUrl(modelUrl)}
          className="w-full h-full scale-110"
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
        />
      </div>

      {transitioning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-white/60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="mt-3 text-sm uppercase text-white">CARREGANDO MODELO...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelViewer;
