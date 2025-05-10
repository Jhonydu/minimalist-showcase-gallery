
import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ChevronRight, Filter, Info } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  modelUrl: string;
  htmlContent: string;
  type: string;
  description: string;
  category?: string;
}

interface ProjectGalleryProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectGallery = ({ projects, onProjectClick }: ProjectGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  
  // Extract unique categories from projects
  const categories = ["Todos", ...Array.from(new Set(projects.map(project => project.type)))];
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "Todos" 
    ? projects 
    : projects.filter(project => project.type === selectedCategory);

  return (
    <div className="w-full overflow-x-auto gallery-container">
      {/* Category filters */}
      <div className="fixed top-24 left-6 right-6 z-10 bg-background/90 backdrop-blur-sm py-3">
        <div className="flex items-center space-x-2 mb-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">Filtrar por:</span>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery */}
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
                <h3 className="text-lg font-medium text-white drop-shadow-md">{project.title}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80 drop-shadow-md">{project.type}</p>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button className="rounded-full p-1 bg-white/20 backdrop-blur-sm">
                        <Info className="h-3 w-3 text-white" />
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" className="w-64 text-sm">
                      {project.description}
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full flex items-center space-x-1 text-sm font-medium">
                  <span>Ver detalhes</span>
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
