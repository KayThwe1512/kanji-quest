import ConfirmModal from "@/component/DeleteAlert";
import FavoriteCard from "@/component/FavoriteCard";
import Toast from "@/component/SuccessToast";
import { KanjiItem, useFavorite } from "@/context/FavoriteContext";
import colors from "@/theme/colors";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function FavoriteScreen() {
  const { favorites, toggleFavorite } = useFavorite();

  const [selectedItem, setSelectedItem] = useState<KanjiItem | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [deletedKanji, setDeletedKanji] = useState("");

  const handleRemove = (item: KanjiItem) => {
    setSelectedItem(item);
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    if (selectedItem) {
      toggleFavorite(selectedItem);
      setDeletedKanji(selectedItem.kanji);
      setShowSuccess(true);
    }

    setShowConfirm(false);
    setSelectedItem(null);
  };

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
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmRemove}
      />

      <View style={styles.container}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.kanji}
          renderItem={({ item }) => (
            <FavoriteCard item={item} onRemove={handleRemove} />
          )}
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
        <Toast
          visible={showSuccess}
          kanji={deletedKanji}
          onClose={() => setShowSuccess(false)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    fontWeight: "bold",
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
    color: colors.primary,
    marginTop: 20,
  },
});
