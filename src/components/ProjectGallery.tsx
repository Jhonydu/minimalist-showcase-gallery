
import React from 'react';

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  modelUrl: string;
  htmlContent: string;
  type: string;
  description: string;
}

interface ProjectGalleryProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectGallery = ({ projects, onProjectClick }: ProjectGalleryProps) => {
  return (
    <div className="w-full overflow-x-auto gallery-container">
      <div className="flex space-x-6 pb-4 pt-24 px-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-item flex-shrink-0 w-72 h-96 cursor-pointer"
            onClick={() => onProjectClick(project)}
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors duration-300"></div>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-lg font-medium text-white drop-shadow-md">{project.title}</h3>
                <p className="text-sm text-white/80 drop-shadow-md">{project.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
