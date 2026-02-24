import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "user_progress";

export interface SectionProgress {
  sectionId: string;
  level: string;
  learnedKanji: string[];
  lastIndex: number;
}

export async function saveSectionProgress(progress: SectionProgress) {
  const allProgress = await getAllProgress();

  allProgress[progress.sectionId] = progress;

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
}

export async function getAllProgress() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}
