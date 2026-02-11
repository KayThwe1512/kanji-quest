import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MultipleChoiceData = {
  kanji: string;
  options: string[];
  correctAnswer: string;
};

type Props = {
  data: MultipleChoiceData;
  onAnswer: (option: string) => void;
  selected: string | undefined;
};

export default function MultipleChoiceQuestion({
  data,
  onAnswer,
  selected,
}: Props) {
  return (
    <View>
      <Text style={styles.kanji}>{data.kanji}</Text>

      {data.options.map((opt: string) => {
        const isSelected = selected === opt;
        const isCorrect = opt === data.correctAnswer;

        return (
          <TouchableOpacity
            key={opt}
            style={[
              styles.button,
              isSelected && isCorrect && styles.correct,
              isSelected && !isCorrect && styles.wrong,
            ]}
            disabled={!!selected}
            onPress={() => onAnswer(opt)}
          >
            <Text>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  kanji: { fontSize: 32, textAlign: "center", margin: 10 },
  button: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  correct: { backgroundColor: "#9be7a1" },
  wrong: { backgroundColor: "#ff9b9b" },
});
