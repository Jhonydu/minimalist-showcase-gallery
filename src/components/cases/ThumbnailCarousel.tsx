
import React from 'react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  modelUrl: string;
  htmlContent: string;
  type: string;
  description: string;
}

interface ThumbnailCarouselProps {
  projects: Project[];
  currentProjectId: string;
  onSelectProject: (index: number) => void;
}

const ThumbnailCarousel = ({ projects, currentProjectId, onSelectProject }: ThumbnailCarouselProps) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center overflow-x-auto py-2 px-4 pointer-events-auto">
      <div className="flex gap-2 p-2">
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
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
