import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type Props = {
  levelId: string;
  name: string;
  totalKanji?: number;
  completedKanji?: number;
  attempts?: number;
  variant: "practice" | "quiz";
  onPress: () => void;
};

const LevelCard = ({
  levelId,
  name,
  totalKanji = 0,
  completedKanji = 0,
  attempts = 0,
  variant,
  onPress,
}: Props) => {
  const progress = Math.round((completedKanji / totalKanji) * 100);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.levelText}>{levelId}</Text>
        <Text style={styles.nameText}>{name}</Text>
        {variant === "practice" && (
          <Text style={styles.countText}>{totalKanji} Kanji</Text>
        )}
      </View>

      {variant === "practice" ? (
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
      ) : (
        <View style={styles.attemptWrapper}>
          <Ionicons name="pencil" size={18} color={colors.primary} />
          <Text style={styles.attemptText}>Attempts: {attempts}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LevelCard;

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
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  nameText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
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
  attemptWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  attemptText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
});
