import ConfirmModal from "@/component/DeleteAlert";
import SuccessBottomSheet from "@/component/SuccessAlert";
import { useFavorite } from "@/context/FavoriteContext";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { default as React, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type KanjiItem = {
  kanji: string;
  meanings: string[];
  onyomi: string[];
  kunyomi: string[];
};

export default function FavoriteScreen() {
  const { favorites, toggleFavorite } = useFavorite();
  const [selectedItem, setSelectedItem] = useState<KanjiItem | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deletedKanji, setDeletedKanji] = useState("");

  const removeFavorite = (item: KanjiItem) => {
    setSelectedItem(item);
    setShowConfirm(true);
  };

  const renderItem = ({ item }: { item: KanjiItem }) => (
    <View style={styles.cardContainer}>
      <View style={styles.kanjiBox}>
        <Text style={styles.kanjiText}>{item.kanji}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.headerRow}>
          <Text style={styles.readingText} numberOfLines={1}>
            <Text style={styles.label}>音: </Text>{" "}
            {item.onyomi?.join(", ") || " - "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              setShowConfirm(true);
            }}
          >
            <Ionicons name="heart" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.readingText} numberOfLines={1}>
          <Text style={styles.label}>訓: </Text>{" "}
          {item.kunyomi?.join(", ") || " - "}
        </Text>

        <Text style={styles.meaningText} numberOfLines={1}>
          Meaning: {item.meanings?.join(", ") || " - "}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <ConfirmModal
        visible={showConfirm}
        title="Remove from favorites"
        message={
          selectedItem
            ? `Do you want to remove "${selectedItem.kanji}" from favorites?`
            : ""
        }
        confirmText="Remove"
        onCancel={() => {
          setShowConfirm(false);
          setSelectedItem(null);
        }}
        onConfirm={() => {
          if (selectedItem) {
            toggleFavorite(selectedItem);
            setDeletedKanji(selectedItem.kanji);
            setShowSuccess(true);
          }

          setShowConfirm(false);
          setSelectedItem(null);
        }}
      />
      <SuccessBottomSheet
        visible={showSuccess}
        kanji={deletedKanji}
        onClose={() => setShowSuccess(false)}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Favorite Kanji lists</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.kanji}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Image
                source={require("../../../assets/open-box.png")}
                style={styles.emptyImg}
              />
              <Text style={styles.emptyText}>No favorite kanji yet</Text>
            </View>
          }
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    fontWeight: "bold",
  },

  cardContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    borderRadius: 15,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  kanjiBox: {
    backgroundColor: colors.primary,
    width: 75,
    height: 75,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  kanjiText: {
    fontSize: 38,
    color: colors.white,
  },
  infoSection: {
    flex: 1,
    marginLeft: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontWeight: "700",
    color: colors.primary,
  },
  readingText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  meaningText: {
    fontSize: 15,
    color: colors.textPrimary,
    marginTop: 4,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  emptyImg: {
    width: 100,
    height: 100,
    opacity: 0.5,
  },
  emptyText: {
    color: "#888",
    marginTop: 20,
  },
});
