
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
    <div className="W-FULL OVERFLOW-X-AUTO GALLERY-CONTAINER">
      {/* Category filters - Simplified design with reduced spacing */}
      <div className="FIXED TOP-24 LEFT-6 Z-10 PY-3">
        <div className="FLEX ITEMS-CENTER SPACE-X-2">
          <Filter className="H-4 W-4 TEXT-MUTED-FOREGROUND" />
          <div className="FLEX ITEMS-CENTER">
            {categories.map((category, idx) => (
              <React.Fragment key={category}>
                {idx > 0 && <span className="TEXT-MUTED-FOREGROUND MX-0.5">|</span>}
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "PX-1 PY-1 TEXT-XS UPPERCASE TRANSITION-COLORS",
                    selectedCategory === category
                      ? 'TEXT-PRIMARY FONT-MEDIUM UNDERLINE UNDERLINE-OFFSET-4'
                      : 'TEXT-MUTED-FOREGROUND HOVER:TEXT-PRIMARY'
                  )}
                >
                  {category}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="FLEX SPACE-X-6 PB-4 PT-36 PX-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="PROJECT-ITEM FLEX-SHRINK-0 W-72 H-96 CURSOR-POINTER GROUP"
            onClick={() => onProjectClick(project)}
          >
            <div className="W-FULL H-FULL RELATIVE OVERFLOW-HIDDEN ROUNDED-MD">
              <div className="ABSOLUTE INSET-0 BG-BLACK/5 GROUP-HOVER:BG-BLACK/0 TRANSITION-COLORS DURATION-300"></div>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="W-FULL H-FULL OBJECT-COVER TRANSITION-TRANSFORM DURATION-500 GROUP-HOVER:SCALE-105"
              />
              <div className="ABSOLUTE BOTTOM-0 LEFT-0 P-4 W-FULL BG-GRADIENT-TO-T FROM-BLACK/70 TO-TRANSPARENT">
                <h3 className="TEXT-LG FONT-MEDIUM TEXT-WHITE DROP-SHADOW-MD UPPERCASE">{project.title}</h3>
                <div className="FLEX ITEMS-CENTER JUSTIFY-BETWEEN">
                  <p className="TEXT-SM TEXT-WHITE/80 DROP-SHADOW-MD UPPERCASE">{project.type}</p>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button className="ROUNDED-FULL P-1 BG-WHITE/20 BACKDROP-BLUR-SM">
                        <Info className="H-3 W-3 TEXT-WHITE" />
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" className="W-64 TEXT-SM UPPERCASE">
                      {project.description}
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
              <div className="ABSOLUTE INSET-0 FLEX ITEMS-CENTER JUSTIFY-CENTER BG-BLACK/40 OPACITY-0 GROUP-HOVER:OPACITY-100 TRANSITION-OPACITY DURATION-300">
                <div className="PX-4 PY-2 BG-WHITE/90 BACKDROP-BLUR-SM ROUNDED-FULL FLEX ITEMS-CENTER SPACE-X-1 TEXT-SM FONT-MEDIUM UPPERCASE">
                  <span>VER DETALHES</span>
                  <ChevronRight className="H-4 W-4" />
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
