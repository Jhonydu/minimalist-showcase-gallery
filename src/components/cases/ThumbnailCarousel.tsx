
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  modelUrl: string;
  htmlContent: string;
  type: string;
  description: string;
  exocadHtmlUrl?: string;
}

interface ThumbnailCarouselProps {
  projects: Project[];
  currentProjectId: string;
  onSelectProject: (index: number) => void;
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
}

const ThumbnailCarousel = ({ 
  projects, 
  currentProjectId, 
  onSelectProject,
  onNavigateNext,
  onNavigatePrevious
}: ThumbnailCarouselProps) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center overflow-x-auto py-2 px-4 pointer-events-auto">
      <div className="flex items-center gap-2 p-2">
        {/* Previous button */}
        <button
          onClick={onNavigatePrevious}
          className="h-14 w-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 transition-colors transform hover:scale-105"
          aria-label="Caso anterior"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        
        {/* Thumbnails */}
        {projects.map((project, idx) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(idx)}
            className={cn(
              "transition-all duration-300 rounded-full overflow-hidden group",
              currentProjectId === project.id ? "ring-2 ring-white scale-110" : "opacity-70 hover:opacity-100"
            )}
          >
            <div className="relative">
              <img 
                src={project.thumbnail} 
                alt={project.title.toUpperCase()}
                className="h-10 w-10 object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                  {project.title.substring(0, 8).toUpperCase()}...
                </span>
              </div>
            </div>
          </button>
        ))}
        
        {/* Next button */}
        <button
          onClick={onNavigateNext}
          className="h-14 w-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 transition-colors transform hover:scale-105"
          aria-label="Próximo caso"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
