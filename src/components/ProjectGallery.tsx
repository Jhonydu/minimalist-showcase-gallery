
import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ChevronRight, Filter, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  modelUrl: string;
  htmlContent: string;
  exocadHtmlUrl?: string; // Added this property
  type: string;
  description: string;
  category?: string;
}

interface ProjectGalleryProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectGallery = ({ projects, onProjectClick }: ProjectGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS");
  
  // Extract unique categories from projects and convert to uppercase
  const categories = ["TODOS", ...Array.from(new Set(projects.map(project => project.type?.toUpperCase() || "OUTROS")))];
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "TODOS" 
    ? projects 
    : projects.filter(project => project.type?.toUpperCase() === selectedCategory);

  return (
    <div className="w-full overflow-x-auto gallery-container">
      {/* Category filters - Updated with consistent styling */}
      <div className="fixed top-24 left-6 z-10 py-3">
        <div className="flex items-center space-x-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center">
            {categories.map((category, idx) => (
              <React.Fragment key={category}>
                {idx > 0 && <span className="text-muted-foreground mx-1">|</span>}
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-1 py-1 text-xs uppercase transition-colors",
                    selectedCategory === category
                      ? 'text-primary font-medium underline underline-offset-4'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {category}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery - Updated with consistent styling */}
      <div className="flex space-x-6 pb-4 pt-36 px-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-item flex-shrink-0 w-72 h-96 cursor-pointer group"
            onClick={() => onProjectClick(project)}
          >
            <div className="w-full h-full relative overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-lg font-medium text-white drop-shadow-md uppercase">{project.title}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80 drop-shadow-md uppercase">{project.type}</p>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button className="rounded-full p-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <Info className="h-3 w-3 text-white" />
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" className="w-64 text-sm uppercase">
                      {project.description}
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full flex items-center space-x-1 text-sm font-medium uppercase hover:bg-white transition-colors">
                  <span>VER DETALHES</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
