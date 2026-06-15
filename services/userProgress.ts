import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "app_progress";

export interface SectionProgress {
  sectionId: string;
  level: string;
  lastIndex: number;
}

export interface AppProgress {
  sections: {
    [sectionId: string]: SectionProgress;
  };
  learnedKanji: string[];
  todayLearned: number;
  highestDailyCount: number;
  lastLearnedDate: string | null;
  longestStreak: number;
}

export async function getProgress(): Promise<AppProgress> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data) {
      const parsed = JSON.parse(data);

      return {
        sections: parsed.sections ?? {},
        learnedKanji: parsed.learnedKanji ?? [],
        todayLearned: parsed.todayLearned ?? 0,
        highestDailyCount: parsed.highestDailyCount ?? 0,
        lastLearnedDate: parsed.lastLearnedDate ?? null,
        longestStreak: parsed.longestStreak ?? 0,
      };
    }

    return {
      sections: {},
      learnedKanji: [],
      todayLearned: 0,
      highestDailyCount: 0,
      lastLearnedDate: null,
      longestStreak: 0,
    };
  } catch (error) {
    console.error("Error loading progress:", error);

    return {
      sections: {},
      learnedKanji: [],
      todayLearned: 0,
      highestDailyCount: 0,
      lastLearnedDate: null,
      longestStreak: 0,
    };
  }
}

export async function saveProgress(progress: AppProgress) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving progress:", error);
  }
}

export async function saveSectionProgress(section: SectionProgress) {
  try {
    const progress = await getProgress();

    progress.sections[section.sectionId] = section;

    await saveProgress(progress);
  } catch (error) {
    console.error("Error saving section progress:", error);
  }
}

export async function getSectionProgress(sectionId: string) {
  try {
    const progress = await getProgress();
    return progress.sections[sectionId] || null;
  } catch (error) {
    console.error("Error getting section progress:", error);
    return null;
  }
}
