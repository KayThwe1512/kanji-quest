import {
    getAllProgress,
    saveSectionProgress,
    SectionProgress,
} from "@/services/progressService";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface ProgressContextType {
  progressData: Record<string, SectionProgress>;
  updateProgress: (progress: SectionProgress) => void;
}

export const ProgressContext = createContext<ProgressContextType>({
  progressData: {},
  updateProgress: () => {},
});

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progressData, setProgressData] = useState<
    Record<string, SectionProgress>
  >({});

  useEffect(() => {
    const loadProgress = async () => {
      const data = await getAllProgress();
      setProgressData(data);
    };
    loadProgress();
  }, []);

  const updateProgress = async (progress: SectionProgress) => {
    // Update in AsyncStorage
    await saveSectionProgress(progress);
    // Update in memory
    setProgressData((prev) => ({
      ...prev,
      [progress.sectionId]: progress,
    }));
  };

  return (
    <ProgressContext.Provider value={{ progressData, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
