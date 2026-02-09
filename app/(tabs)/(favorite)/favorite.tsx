import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface KanjiItem {
  id: string;
  kanji: string;
  meaning: string;
  isFavorite: boolean;
}

const initialFavorites: KanjiItem[] = [
  { id: "1", kanji: "日", meaning: "Sun / Day", isFavorite: true },
  { id: "2", kanji: "水", meaning: "Water", isFavorite: true },
  { id: "3", kanji: "山", meaning: "Mountain", isFavorite: true },
];

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState<KanjiItem[]>(initialFavorites);

  const removeFavorite = (item: KanjiItem) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));

    Alert.alert(
      "Removed from Favorites",
      `${item.kanji} (${item.meaning}) was removed`,
    );
  };

  const renderItem: ListRenderItem<KanjiItem> = ({ item }) => (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Text style={styles.kanji}>{item.kanji}</Text>
        <Text style={styles.meaning}>{item.meaning}</Text>
      </View>

      <TouchableOpacity onPress={() => removeFavorite(item)}>
        <Ionicons
          name="heart"
          size={28}
          color={item.isFavorite ? "red" : "grey"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList<KanjiItem>
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No favorite kanji yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87cfeb5b",
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  kanji: {
    fontSize: 32,
    fontWeight: "bold",
  },
  meaning: {
    fontSize: 16,
    color: "gray",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "gray",
  },
});
