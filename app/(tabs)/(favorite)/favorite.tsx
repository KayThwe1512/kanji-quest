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

        <Text style={styles.meaning}>{item.meanings}</Text>

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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 50,
              }}
            >
              <Image
                source={require("../../../assets/open-box.png")}
                style={{ width: 150, height: 150 }}
              />
              <Text style={styles.empty}>No favorite kanji yet</Text>
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
