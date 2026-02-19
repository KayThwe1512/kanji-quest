// export interface KanjiItem {
//   id: string;
//   kanji: string;
//   level: string;
//   meaning: string;
//   isFavorite: boolean;
// }

// const initialFavorites: KanjiItem[] = [
//   { id: "1", kanji: "日", level: "N5", meaning: "Sun / Day", isFavorite: true },
//   { id: "2", kanji: "水", level: "N5", meaning: "Water", isFavorite: true },
//   { id: "3", kanji: "山", level: "N5", meaning: "Mountain", isFavorite: true },
// ];

// export default function FavoriteScreen() {
//   const [favorites, setFavorites] = useState<KanjiItem[]>(initialFavorites);

//   const removeFavorite = (item: KanjiItem) => {
//     setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));

//     Alert.alert("Removed from Favorites", `${item.kanji}  was removed`);
//   };

//   const renderItem: ListRenderItem<KanjiItem> = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={[styles.kanji, { paddingLeft: 20 }]}>{item.kanji}</Text>
//       <View
//         style={{
//           flexDirection: "column",
//           gap: 5,
//         }}
//       >
//         <Text style={styles.meaning}>{item.meaning}</Text>
//         <Text style={styles.level}>Jlpt level: {item.level}</Text>
//       </View>

//       <TouchableOpacity onPress={() => removeFavorite(item)}>
//         {item.isFavorite ? (
//           <Ionicons name="heart" size={28} color={colors.border} />
//         ) : (
//           <Ionicons name="heart" size={28} color={colors.border} />
//         )}
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text
//         style={{
//           textAlign: "center",
//           alignSelf: "center",
//           fontWeight: "bold",
//           // color: "#fff",
//           fontSize: 20,
//           marginVertical: 20,
//         }}
//       >
//         Favorite Kanji List
//       </Text>
//       <FlatList<KanjiItem>
//         data={favorites}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         ListEmptyComponent={
//           <Text style={styles.empty}>No favorite kanji yet.</Text>
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//     justifyContent: "center",
//   },
//   card: {
//     backgroundColor: colors.primary,
//     padding: 18,
//     borderRadius: 12,
//     marginBottom: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     elevation: 3,
//   },
//   kanji: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: colors.border,
//   },
//   meaning: {
//     fontSize: 16,
//     color: colors.border,
//   },
//   level: {
//     fontSize: 12,
//     color: colors.border,
//     fontStyle: "italic",
//   },
//   empty: {
//     textAlign: "center",
//     marginTop: 50,
//     fontSize: 18,
//     color: colors.textSecondary,
//   },
// });

import { kanjiN5 as kanjiData } from "@/data/kanjiN5";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { default as React, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type KanjiItem = {
  id: string;
  kanji: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
};

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState<KanjiItem[]>(kanjiData);

  const removeFavorite = (item: KanjiItem) => {
    Alert.alert(
      "Remove from favorites",
      `Do you want to remove "${item.kanji}" from favorites?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
            Alert.alert(`${item.kanji} is removed from favorite list.`);
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: KanjiItem }) => (
    <View style={styles.row}>
      <View style={styles.kanjiCard}>
        <Text style={styles.kanjiText}>{item.kanji}</Text>
      </View>

      <View style={styles.detailCard}>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => removeFavorite(item)}
        >
          <Ionicons name="heart" size={18} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.meaning}>{item.meaning}</Text>

        <View
          style={{ flexDirection: "row", flexWrap: "nowrap", columnGap: 20 }}
        >
          <Text style={styles.reading}>
            <Text style={styles.label}>くん:</Text> {item.kunyomi}
          </Text>
          <Text style={styles.reading}>
            <Text style={styles.label}>おん:</Text> {item.onyomi}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Kanji lists</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No favorite kanji yet</Text>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingVertical: 20,
  },
  title: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    marginBottom: 14,
    gap: 12,
  },

  kanjiCard: {
    width: 90,
    height: 90,
    backgroundColor: colors.white,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.border,
  },

  kanjiText: {
    fontSize: 44,
    fontWeight: "600",
    color: colors.primary,
  },

  detailCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 14,
    borderWidth: 3,
    borderRadius: 16,
    borderColor: colors.border,
  },

  meaning: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: colors.primary,
  },

  reading: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },

  label: {
    fontWeight: "600",
    color: colors.textSecondary,
  },

  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  empty: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    color: colors.textSecondary,
  },
});
