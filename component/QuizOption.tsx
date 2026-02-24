import colors from "@/theme/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type Option = {
  id: number;
  text: string;
};

type Props = {
  option: Option;
  isSelected: boolean;
  isCorrect: boolean;
  showResult: boolean;
  onPress: () => void;
};

export default function QuizOption({
  option,
  isSelected,
  isCorrect,
  showResult,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.option,
        showResult && isCorrect && styles.correct,
        showResult && isSelected && !isCorrect && styles.wrong,
      ]}
      onPress={onPress}
      disabled={showResult}
    >
      <Text style={styles.optionText}>{option.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    backgroundColor: colors.border,
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  correct: {
    borderColor: colors.optionCorrect,
    backgroundColor: "#EAF6EA",
  },
  wrong: {
    borderColor: colors.optionWrong,
    backgroundColor: "#FDECEC",
  },
  optionText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
