import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type ProgressContextType = {
  learnedKanji: string[];
  todayLearned: number;
  highestDailyCount: number;
  lastLearnedDate: string | null;
  longestStreak: number;
  dailyProgress: Record<string, number>;
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
  const [dailyProgress, setDailyProgress] = useState<Record<string, number>>(
    {},
  );

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
        setDailyProgress(data.dailyProgress || {});
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
        dailyProgress,
      }),
    );
  }, [
    learnedKanji,
    todayLearned,
    highestDailyCount,
    lastLearnedDate,
    longestStreak,
    loaded,
    dailyProgress,
  ]);
  const getTodayKey = () => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  };

  const addLearnedKanji = (kanji: string) => {
    const todayKey = getTodayKey();

    setLearnedKanji((prev) => {
      if (prev.includes(kanji)) return prev;
      return [...prev, kanji];
    });

    setDailyProgress((prev) => {
      const updated = {
        ...prev,
        [todayKey]: (prev[todayKey] || 0) + 1,
      };

      const todayCount = updated[todayKey];
      setTodayLearned(todayCount);

      if (todayCount > highestDailyCount) {
        setHighestDailyCount(todayCount);
      }

      return updated;
    });

    // streak logic
    if (lastLearnedDate !== todayKey) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().split("T")[0];

      if (lastLearnedDate === yesterdayKey) {
        setLongestStreak((prev) => prev + 1);
      } else {
        setLongestStreak(1);
      }

      setLastLearnedDate(todayKey);
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
        dailyProgress,
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
