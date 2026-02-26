import { KanjiItem } from "@/context/FavoriteContext";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: KanjiItem;
  onRemove: (item: KanjiItem) => void;
};

export default function FavoriteCard({ item, onRemove }: Props) {
  const router = useRouter();

  const handleOpenFlashcard = () => {
    router.navigate({
      pathname: "/flashcard",
      params: {
        from: "favorite",
        kanji: item.kanji,
      },
    });
  };
  return (
    <TouchableOpacity onPress={handleOpenFlashcard} activeOpacity={0.8}>
      <View style={styles.cardContainer}>
        <View style={styles.kanjiBox}>
          <Text style={styles.kanjiText}>{item.kanji}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.headerRow}>
            <Text style={styles.readingText} numberOfLines={1}>
              <Text style={styles.label}>音: </Text>
              {item.onyomi?.join(", ") || " - "}
            </Text>

            <TouchableOpacity onPress={() => onRemove(item)}>
              <Ionicons name="heart" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.readingText} numberOfLines={1}>
            <Text style={styles.label}>訓: </Text>
            {item.kunyomi?.join(", ") || " - "}
          </Text>

          <Text style={styles.meaningText} numberOfLines={1}>
            Meaning: {item.meanings?.join(", ") || " - "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
