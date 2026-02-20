import AsyncStorage from "@react-native-async-storage/async-storage";

const storageKey = "favorite_kanji";

export async function getFavorite() {
  const data = await AsyncStorage.getItem(storageKey);
  return data ? JSON.parse(data) : [];
}

export async function saveFavorite(favorites: string[]) {
  await AsyncStorage.setItem(storageKey, JSON.stringify(favorites));
}
