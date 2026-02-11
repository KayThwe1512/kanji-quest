import MatchingQuestion from "@/component/MatchingComponent";
import MultipleChoiceQuestion from "@/component/MultipleChoiceQuestion";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getMatchingQuestion, getMultipleChoiceQuestion } from "./quizHelper";

const quizTypes = [
  "multipleChoiceMeaning",
  "matchKanjiMeaning",
  "matchKanjiKunyomi",
] as const;

export default function QuizScreen() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedMC, setSelectedMC] = useState<any>({});

  useEffect(() => {
    const q = [];
    for (let i = 0; i < 10; i++) {
      const type = quizTypes[Math.floor(Math.random() * 3)];
      if (type === "multipleChoiceMeaning")
        q.push({ type, data: getMultipleChoiceQuestion() });
      else {
        const sub = type === "matchKanjiMeaning" ? "meaning" : "kunyomi";
        q.push({ type, data: getMatchingQuestion(sub) });
      }
    }
    setQuestions(q);
  }, []);

  if (!questions.length) return <Text>Loading...</Text>;

  const current = questions[index];

  const renderQuestion = () => {
    if (current.type === "multipleChoiceMeaning") {
      return (
        <MultipleChoiceQuestion
          data={current.data}
          selected={selectedMC[index]}
          onAnswer={(opt: string) => {
            if (selectedMC[index]) return;
            if (opt === current.data.correctAnswer) setScore((s) => s + 1);
            setSelectedMC({ ...selectedMC, [index]: opt });
          }}
        />
      );
    }

    return (
      <MatchingQuestion
        data={current.data}
        onMatch={() => setScore((s) => s + 1)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Question {index + 1}/10</Text>

      {renderQuestion()}

      <View style={styles.nav}>
        <TouchableOpacity
          disabled={index === 0}
          onPress={() => setIndex((i) => i - 1)}
        >
          <Text>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={index === 9}
          onPress={() => setIndex((i) => i + 1)}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  progress: { textAlign: "center", fontSize: 18 },
  nav: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  score: { textAlign: "center", marginTop: 10, fontSize: 18 },
});
