import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuizScreen() {
  const correctAnswer = "Sun";
  const [selected, setSelected] = useState<string | null>(null);

  const options = ["Sun", "Tree", "Water", "Mountain"];

  const getOptionStyle = (option: string) => {
    if (!selected) return styles.option;

    if (option === correctAnswer) {
      return [styles.option, styles.correct];
    }

    if (option === selected && option !== correctAnswer) {
      return [styles.option, styles.wrong];
    }

    return styles.option;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Question 1 / 10</Text>

      <Text style={styles.kanji}>日</Text>
      <Text style={styles.question}>What is the meaning?</Text>

      {options.map((item) => (
        <TouchableOpacity
          key={item}
          style={getOptionStyle(item)}
          onPress={() => !selected && setSelected(item)}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      ))}

      {selected && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push("/result")}
        >
          <Text style={styles.nextText}>Next Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  progress: { textAlign: "center", color: "gray", marginBottom: 10 },
  kanji: { fontSize: 80, textAlign: "center", marginVertical: 20 },
  question: { textAlign: "center", fontSize: 18, marginBottom: 20 },

  option: {
    backgroundColor: "#E0E0E0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: { textAlign: "center", fontSize: 16 },

  correct: { backgroundColor: "#4CAF50" },
  wrong: { backgroundColor: "#F44336" },

  nextButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
  },
  nextText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
