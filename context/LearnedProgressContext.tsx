import { createContext, useContext, useState } from "react";

type ProgressContextType = {
  learnedKanji: string[];
  todayLearned: number;
  highestDailyCount: number;
  lastLearnedDate: string | null;
  longestStreak: number;
  addLearnedKanji: (kanji: string) => void;
};

export const LearnedprogressContext = createContext<ProgressContextType | null>(
  null,
);

export const ProgressProvider = ({ children }: { children: any }) => {
  const [learnedKanji, setLearnedKanji] = useState<string[]>([]);
  const [todayLearned, setTodayLearned] = useState(0);
  const [highestDailyCount, setHighestDailyCount] = useState(0);
  const [lastLearnedDate, setLastLearnedDate] = useState<string | null>(null);
  const [longestStreak, setLongestStreak] = useState(0);

  const addLearnedKanji = (kanji: string) => {
    setLearnedKanji((prev) => {
      if (prev.includes(kanji)) return prev;
      return [...prev, kanji];
    });
  };
  const today = new Date().toDateString();

  if (lastLearnedDate !== today) {
    setTodayLearned(1);
    setLastLearnedDate(today);
  } else {
    const updated = todayLearned + 1;
    setTodayLearned(updated);

    if (updated > highestDailyCount) {
      setHighestDailyCount(updated);
    }
  }

  return (
    <LearnedprogressContext.Provider
      value={{
        learnedKanji,
        todayLearned,
        highestDailyCount,
        lastLearnedDate,
        longestStreak,
        addLearnedKanji,
      }}
    >
      {children}
    </LearnedprogressContext.Provider>
  );
};
export const useLearning = () => {
  const context = useContext(LearnedprogressContext);
  if (!context) throw new Error("useLearning must be inside LearningProvider");
  return context;
};
