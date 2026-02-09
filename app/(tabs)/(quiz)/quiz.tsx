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
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: "#87cfeb5b",
  },
  progress: {
    textAlign: "center",
    color: "gray",
    marginBottom: 10,
  },
  kanji: {
    fontSize: 80,
    textAlign: "center",
    marginVertical: 20,
  },
  question: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },

  option: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87CEEB",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  optionText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },

  correct: {
    backgroundColor: "#4CAF50",
  },
  wrong: {
    backgroundColor: "#F44336",
  },

  nextButton: {
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87CEEB",
    width: 150,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  nextText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
