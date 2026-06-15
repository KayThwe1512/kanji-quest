import colors from "@/theme/colors";
import { useLocalSearchParams } from "expo-router";
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
  promptType?: string;
};
export default function QuizOption({
  option,
  isSelected,
  isCorrect,
  showResult,
  promptType,
  onPress,
}: Props) {
  const { mode } = useLocalSearchParams();
  const isEventMode = mode === "event";
  return (
    <TouchableOpacity
      style={[
        styles.option,
        isEventMode && styles.eventOption,
        showResult && isCorrect && styles.correct,
        showResult && isSelected && !isCorrect && styles.wrong,
      ]}
      onPress={onPress}
      disabled={showResult}
    >
      <Text
        style={[
          styles.optionText,
          isEventMode && (promptType === "reading" || promptType === "meaning")
            ? styles.eventKanjiOptionText
            : styles.eventNormalOptionText,
        ]}
      >
        {option.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eventOption: {
    backgroundColor: colors.border,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  eventOptionText: {
    fontSize: 15,
    fontWeight: "600",
  },
  eventKanjiOptionText: {
    fontSize: 16,
    fontWeight: "600",
  },

  eventNormalOptionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  option: {
    backgroundColor: colors.border,
    paddingVertical: 15,
    borderRadius: 16,
    marginBottom: 10,
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
    fontSize: 20,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
