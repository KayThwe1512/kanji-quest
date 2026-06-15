import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "app_progress";

export interface ProgressContextType {
  learnedKanji: string[];
  todayLearned: number;
  highestDailyCount: number;
  lastLearnedDate: string | null;
  longestStreak: number;
  loaded: boolean;
  addLearnedKanji: (kanji: string, customDate?: Date) => void;

  dailyCounts: Record<number, number>;
  getPseudoDayIndex: (date: Date) => number;
}

export const LearnedprogressContext = createContext<ProgressContextType | null>(
  null,
);

export const ProgressProvider = ({ children }: { children: any }) => {
  const [learnedKanji, setLearnedKanji] = useState<string[]>([]);
  const [todayLearned, setTodayLearned] = useState(0);
  const [highestDailyCount, setHighestDailyCount] = useState(0);
  const [lastLearnedDate, setLastLearnedDate] = useState<string | null>(null);
  const [longestStreak, setLongestStreak] = useState(0);

  const [dailyCounts, setDailyCounts] = useState<Record<number, number>>({});

  const [loaded, setLoaded] = useState(false);

  const NORMAL_DAY_LENGTH_MS = 24 * 60 * 60 * 1000;

  const getPseudoDayIndex = (date: Date) => {
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    return Math.floor(target.getTime() / NORMAL_DAY_LENGTH_MS);
  };

  useEffect(() => {
    const loadProgress = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setLearnedKanji(data.learnedKanji || []);
        setTodayLearned(data.todayLearned || 0);
        setHighestDailyCount(data.highestDailyCount || 0);
        setLastLearnedDate(data.lastLearnedDate || null);
        setLongestStreak(data.longestStreak || 0);
        setDailyCounts(data.dailyCounts || {});
      }
      setLoaded(true);
    };
    loadProgress();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        learnedKanji,
        todayLearned,
        highestDailyCount,
        lastLearnedDate,
        longestStreak,
        dailyCounts,
      }),
    );
  }, [
    learnedKanji,
    todayLearned,
    highestDailyCount,
    lastLearnedDate,
    longestStreak,
    dailyCounts,
    loaded,
  ]);
  const addLearnedKanji = (kanji: string, customDate?: Date) => {
    if (!loaded) return;

    const now = customDate ?? new Date();
    const todayString = now.toDateString();
    const dayIndex = getPseudoDayIndex(now);

    // Add kanji
    setLearnedKanji((prev) => (prev.includes(kanji) ? prev : [...prev, kanji]));

    // Update dailyCounts and calculate streak
    setDailyCounts((prev) => {
      const updatedCounts = {
        ...prev,
        [dayIndex]: (prev[dayIndex] || 0) + 1,
      };

      // Calculate streak by looking backwards from today
      let streak = 0;
      let currentIndex = dayIndex;
      while (updatedCounts[currentIndex] && updatedCounts[currentIndex] > 0) {
        streak += 1;
        currentIndex -= 1;
      }
      setLongestStreak(streak);

      // Update todayLearned and highestDailyCount using the **updatedCounts**
      const todayCount = updatedCounts[dayIndex];
      setTodayLearned(todayCount);
      setHighestDailyCount((prevHigh) => Math.max(prevHigh, todayCount));

      return updatedCounts;
    });

    // Update last learned date
    setLastLearnedDate(todayString);
  };
  // const addLearnedKanji = (kanji: string, customDate?: Date) => {
  //   if (!loaded) return;

  //   const now = customDate ?? new Date();
  //   const todayString = now.toDateString();
  //   const dayIndex = getPseudoDayIndex(now);

  //   setLearnedKanji((prev) => (prev.includes(kanji) ? prev : [...prev, kanji]));

  //   setDailyCounts((prev) => {
  //     const updatedCounts = {
  //       ...prev,
  //       [dayIndex]: (prev[dayIndex] || 0) + 1,
  //     };

  //     let streak = 0;
  //     let currentIndex = dayIndex;
  //     while (updatedCounts[currentIndex] && updatedCounts[currentIndex] > 0) {
  //       streak += 1;
  //       currentIndex -= 1;
  //     }

  //     setLongestStreak(streak);

  //     return updatedCounts;
  //   });

  //   setTodayLearned((prev) => {
  //     const todayCount = (dailyCounts[dayIndex] || 0) + 1;
  //     setHighestDailyCount((prevHigh) => Math.max(prevHigh, todayCount));
  //     return todayCount;
  //   });

  //   setLastLearnedDate(todayString);
  // };

  return (
    <LearnedprogressContext.Provider
      value={{
        learnedKanji,
        todayLearned,
        highestDailyCount,
        lastLearnedDate,
        longestStreak,
        loaded,
        addLearnedKanji,
        dailyCounts,
        getPseudoDayIndex,
      }}
    >
      {children}
    </LearnedprogressContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearnedprogressContext);
  if (!context) throw new Error("useLearning must be inside ProgressProvider");
  return context;
};
