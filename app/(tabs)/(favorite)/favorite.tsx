import colors from "@/theme/colors";
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
  level: string;
  meaning: string;
  isFavorite: boolean;
}

const initialFavorites: KanjiItem[] = [
  { id: "1", kanji: "日", level: "N5", meaning: "Sun / Day", isFavorite: true },
  { id: "2", kanji: "水", level: "N5", meaning: "Water", isFavorite: true },
  { id: "3", kanji: "山", level: "N5", meaning: "Mountain", isFavorite: true },
];

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState<KanjiItem[]>(initialFavorites);

  const removeFavorite = (item: KanjiItem) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));

    Alert.alert("Removed from Favorites", `${item.kanji}  was removed`);
  };

  const renderItem: ListRenderItem<KanjiItem> = ({ item }) => (
    <View style={styles.card}>
      <Text style={[styles.kanji, { paddingLeft: 20 }]}>{item.kanji}</Text>
      <View
        style={{
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Text style={styles.meaning}>{item.meaning}</Text>
        <Text style={styles.level}>Jlpt level: {item.level}</Text>
      </View>

      <TouchableOpacity onPress={() => removeFavorite(item)}>
        {/* <Ionicons
          name="heart"
          size={28}
          color={item.isFavorite ? "red" : "grey"}
        /> */}
        {item.isFavorite ? (
          <Ionicons name="heart" size={28} color={colors.border} />
        ) : (
          <Ionicons name="heart-outline" size={28} color={colors.border} />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          alignSelf: "center",
          fontWeight: "bold",
          // color: "#fff",
          fontSize: 20,
          marginVertical: 20,
        }}
      >
        Favorite Kanji List
      </Text>
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
    backgroundColor: colors.background,
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.primary,
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
    color: colors.border,
  },
  meaning: {
    fontSize: 16,
    color: colors.border,
  },
  level: {
    fontSize: 12,
    color: colors.border,
    fontStyle: "italic",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: colors.textSecondary,
  },
});
