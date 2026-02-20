// import AsyncStorage from "@react-native-async-storage/async-storage";

// export async function saveProgress(sectionId: string, kanji: string) {
//   const cacheKey = `progress_${sectionId}`;
//   const data = JSON.parse((await AsyncStorage.getItem(cacheKey)) || "[]");
//   if (!data.includes(kanji)) data.push(kanji);
//   await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
//   console.log("Saved progress:", data);
// }

// export async function getProgress(sectionId: string) {
//   return JSON.parse(
//     (await AsyncStorage.getItem(`progress_${sectionId}`)) || "[]",
//   );
// }
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROGRESS_KEY = "user_progress";

export interface SectionProgress {
  sectionId: string;
  level: string;
  learnedKanji: string[];
  lastIndex: number;
}

export async function saveSectionProgress(progress: SectionProgress) {
  const allProgress = await getAllProgress();

  allProgress[progress.sectionId] = progress;

  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
}

export async function getAllProgress() {
  const data = await AsyncStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : {};
}
