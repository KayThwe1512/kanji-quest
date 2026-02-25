import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type ProgressContextType = {
  learnedKanji: string[];
  todayLearned: number;
  highestDailyCount: number;
  lastLearnedDate: string | null;
  longestStreak: number;
  addLearnedKanji: (kanji: string) => void;
};

const STORAGE_KEY = "learning_progress";

export const LearnedprogressContext = createContext<ProgressContextType | null>(
  null,
);

export const ProgressProvider = ({ children }: { children: any }) => {
  const [learnedKanji, setLearnedKanji] = useState<string[]>([]);
  const [todayLearned, setTodayLearned] = useState(0);
  const [highestDailyCount, setHighestDailyCount] = useState(0);
  const [lastLearnedDate, setLastLearnedDate] = useState<string | null>(null);
  const [longestStreak, setLongestStreak] = useState(0);

  const [loaded, setLoaded] = useState(false);

  //get user progress data from storage
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
      }

      setLoaded(true);
    };

    loadProgress();
  }, []);

  //save progress to storage whatever changes in these items
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
      }),
    );
  }, [
    learnedKanji,
    todayLearned,
    highestDailyCount,
    lastLearnedDate,
    longestStreak,
    loaded,
  ]);

  const addLearnedKanji = (kanji: string) => {
    const today = new Date();
    const todayString = today.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    setLearnedKanji((prev) => {
      if (prev.includes(kanji)) return prev;
      return [...prev, kanji];
    });

    if (lastLearnedDate !== todayString) {
      if (lastLearnedDate === yesterdayString) {
        setLongestStreak((prev) => prev + 1);
      } else {
        setLongestStreak(1);
      }

      setTodayLearned(1);
      setLastLearnedDate(todayString);

      if (1 > highestDailyCount) {
        setHighestDailyCount(1);
      }
    } else {
      const updated = todayLearned + 1;
      setTodayLearned(updated);

      if (updated > highestDailyCount) {
        setHighestDailyCount(updated);
      }
    }
  };

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
