import AsyncStorage from "@react-native-async-storage/async-storage";

// export async function saveProgress(sectionId: string, kanji: string) {
//   const cacheKey = `progress-${sectionId}`;
//   const data = JSON.parse((await AsyncStorage.getItem(cacheKey)) || "[]");
//   if (!data.includes(kanji)) data.push(kanji);
//   await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
//   console.log("Saved progress:", data);
// }

export async function getProgress(sectionId: string) {
  return JSON.parse(
    (await AsyncStorage.getItem(`progress-${sectionId}`)) || "[]",
  );
}
