import colors from "@/theme/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  sectionId: string;
  sectionName: string;
  sectionElements: string[];
  totalKanji: number;
  // completedCard: number;
  onPress: () => void;
};

export default function SectionCard({
  sectionId,
  sectionElements,
  sectionName,
  totalKanji,
  onPress,
}: Props) {
  const progress = Math.round((totalKanji / totalKanji) * 50);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.title}> {sectionName}</Text>
        <Text style={styles.kanjiText}>{sectionElements}</Text>
        <Text style={styles.countText}>{totalKanji} Kanji</Text>
      </View>
      <View style={styles.progressWrapper}>
        <View style={styles.circle}>
          <Text style={styles.percentText}>{progress}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.border,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },

  kanjiText: {
    fontSize: 14,
    color: colors.textSecondary,
    paddingTop: 7,
    flexWrap: "wrap",
  },
  countText: {
    fontSize: 12,
    color: colors.accent,
    marginTop: 4,
  },
  progressWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 6,
    borderColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  percentText: {
    fontWeight: "bold",
    color: colors.secondary,
  },
});
