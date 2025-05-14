
import React from 'react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import InfoPanel from '@/components/cases/InfoPanel';
import FilterBar from '@/components/cases/FilterBar';
import ThumbnailCarousel from '@/components/cases/ThumbnailCarousel';
import { useIsMobile } from '@/hooks/use-mobile';
import { projectsData } from '@/data/projectsData';

interface CasesContentProps {
  introVisible: boolean;
  currentCase: any;
  infoPanelCollapsed: boolean;
  toggleInfoPanel: () => void;
  openHtmlModal: () => void;
  openContactModal: () => void;
  openAboutModal: () => void;
  categories: string[];
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filteredThumbnails: any[];
  onSelectProject: (idx: number) => void;
  goToNextCase: () => void;
  goToPreviousCase: () => void;
}

const CasesContent: React.FC<CasesContentProps> = ({
  introVisible,
  currentCase,
  infoPanelCollapsed,
  toggleInfoPanel,
  openHtmlModal,
  openContactModal,
  openAboutModal,
  categories,
  filterCategory,
  setFilterCategory,
  filteredThumbnails,
  onSelectProject,
  goToNextCase,
  goToPreviousCase
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "relative z-10 pointer-events-none transition-opacity duration-700",
      introVisible ? "opacity-0" : "opacity-100"
    )}>
      <Header 
        openContact={openContactModal}
        openAbout={openAboutModal}
        className="bg-black/5 backdrop-blur-sm pointer-events-auto"
      />
      
      <div className="pt-24 md:pt-28 px-4 md:px-6 w-full h-[calc(100vh-6rem)] flex flex-col">
        {/* Info Panel */}
        <InfoPanel
          title={currentCase.title}
          description={currentCase.description}
          type={currentCase.type}
          htmlContent={currentCase.htmlContent}
          exocadHtmlUrl={currentCase.exocadHtmlUrl}
          infoPanelCollapsed={infoPanelCollapsed}
          onToggleInfoPanel={toggleInfoPanel}
          onShowHtmlModal={openHtmlModal}
          onNavigateNext={goToNextCase}
          onNavigatePrevious={goToPreviousCase}
          isMobile={isMobile}
        />
        
        {/* Filter Bar */}
        <FilterBar
          categories={categories}
          selectedCategory={filterCategory}
          onSelectCategory={setFilterCategory}
        />
        
        {/* Thumbnail Carousel */}
        <ThumbnailCarousel
          projects={filteredThumbnails}
          currentProjectId={currentCase.id}
          onSelectProject={(idx) => {
            // Fix: Use filteredThumbnails index instead of referencing projectsData
            onSelectProject(idx);
          }}
          onNavigateNext={goToNextCase}
          onNavigatePrevious={goToPreviousCase}
        />
      </div>
    </div>
  );
};

export default CasesContent;
