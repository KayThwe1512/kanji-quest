import kanjiData from "@/assets/data/kanjiData.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFlashcardKanji(sectionId: string, kanjiIds: string[]) {
  const cacheKey = `kanji-${sectionId}`;

  const cachedData = await AsyncStorage.getItem(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const kanjiMap = Object.fromEntries(kanjiData.map((k) => [k.kanji, k]));

  const results = kanjiIds.map((id) => kanjiMap[id]).filter(Boolean);

  await AsyncStorage.setItem(cacheKey, JSON.stringify(results));

  return results;
}
