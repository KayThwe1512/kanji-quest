import colors from "@/theme/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type Props = {
  sectionId: string;
  sectionName: string;
  sectionElements: string[];
  totalKanji: number;
  completedKanji: number;
  onPress: () => void;
};

export default function SectionCard({
  sectionId,
  sectionName,
  totalKanji,
  completedKanji,
  onPress,
}: Props) {
  const progress = totalKanji
    ? Math.round((completedKanji / totalKanji) * 100)
    : 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.title}> {sectionName}</Text>
        <Text style={styles.countText}>
          {completedKanji} / {totalKanji} Kanji
        </Text>
      </View>
      <View style={styles.progressWrapper}>
        <AnimatedCircularProgress
          size={60}
          width={6}
          fill={progress}
          tintColor={colors.secondary}
          backgroundColor={colors.border}
          rotation={0}
        >
          {() => <Text style={styles.percentText}>{progress}%</Text>}
        </AnimatedCircularProgress>
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
