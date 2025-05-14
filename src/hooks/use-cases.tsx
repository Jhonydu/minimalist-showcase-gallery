
import { useState, useEffect } from 'react';
import { projectsData } from '@/data/projectsData';

export type TextAnimation = {
  title: boolean;
  subtitle: boolean;
  description: boolean;
  tags: boolean;
};

export function useCases() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("TODOS");
  
  const currentCase = projectsData[currentIndex];
  
  // Extract unique categories from projects and convert to uppercase
  const categories = ["TODOS", ...Array.from(new Set(projectsData.map(project => project.type?.toUpperCase() || "OUTROS")))];
  
  // Effect to handle filter category changes
  useEffect(() => {
    if (filterCategory === "TODOS") {
      // If filter is set to "TODOS", go back to the first case
      setTransitioning(true);
      setCurrentIndex(0);
    } else {
      // Find the first case with the selected category
      const firstMatchingIndex = projectsData.findIndex(
        project => project.type?.toUpperCase() === filterCategory
      );
      
      if (firstMatchingIndex !== -1) {
        setTransitioning(true);
        setCurrentIndex(firstMatchingIndex);
      }
    }
  }, [filterCategory]);

  const goToNextCase = () => {
    setTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const goToPreviousCase = () => {
    setTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  const handleModelLoad = () => {
    setTimeout(() => {
      setTransitioning(false);
      setModelLoading(false);
    }, 800);
  };

  const handleSelectProject = (idx: number) => {
    setTransitioning(true);
    setCurrentIndex(idx);
  };

  // Filter projects based on category
  const filteredThumbnails = filterCategory === "TODOS" 
    ? projectsData 
    : projectsData.filter(project => project.type?.toUpperCase() === filterCategory);

  return {
    currentCase,
    currentIndex,
    transitioning,
    modelLoading,
    filterCategory,
    categories,
    filteredThumbnails,
    setFilterCategory,
    goToNextCase,
    goToPreviousCase,
    handleModelLoad,
    handleSelectProject
  };
}
