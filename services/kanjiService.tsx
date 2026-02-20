import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFlashcardKanji(sectionId: string, kanjiIds: string[]) {
  const cacheKey = `kanji-${sectionId}`;
  const cachedData = await AsyncStorage.getItem(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const kanji = kanjiIds.map((kanji) =>
    fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(kanji)}`)
      .then((res) => res.json())
      .catch(() => null),
  );

  const results = await Promise.all(kanji);
  await AsyncStorage.setItem(cacheKey, JSON.stringify(results));
  return results;
}
