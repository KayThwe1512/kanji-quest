import colors from "@/theme/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  levelId: string;
  name: string;
  totalKanji: number;
  completedKanji: number;
  onPress: () => void;
};

const LevelCard = ({
  levelId,
  name,
  totalKanji,
  completedKanji,
  onPress,
}: Props) => {
  const progress = Math.round((completedKanji / totalKanji) * 100);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.levelText}>{levelId}</Text>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.countText}>{totalKanji} Kanji</Text>
      </View>

      <View style={styles.progressWrapper}>
        <View style={styles.circle}>
          <Text style={styles.percentText}>{progress}%</Text>
        </View>
        {/* <ProgressCircle progress={progress} /> */}
      </View>
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
});
