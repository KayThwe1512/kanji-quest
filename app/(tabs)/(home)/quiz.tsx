import QuizOption from "@/component/QuizOption";
import { getQuiz } from "@/services/quizService";
import { saveQuizAttempt } from "@/services/quizStorage";
import colors from "@/theme/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Option = {
  id: number;
  text: string;
};

type Question = {
  kanji: string;
  question: string;
  options: Option[];
  correctId: number;
};

export default function QuizScreen() {
  const router = useRouter();
  const { level } = useLocalSearchParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const scoreRef = useRef(0);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!level) return;
    loadQuiz();
  }, [level]);

  const loadQuiz = async () => {
    try {
      setLoading(true);

      const quiz = await getQuiz(level as string);
      console.log("Quiz received:", quiz);

      setQuestions(quiz);
    } catch (err) {
      console.log("Load quiz error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: number) => {
    if (showResult) return;

    setSelectedId(id);
    setShowResult(true);

    if (id === currentQuestion.correctId) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
  };

  const handleNext = async () => {
    const isLast = currentIndex + 1 === questions.length;

    if (!isLast) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedId(null);
      setShowResult(false);
    } else {
      await saveQuizAttempt(level as string);
      router.push({
        pathname: "/result",
        params: {
          score: scoreRef.current.toString(),
          total: questions.length.toString(),
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading quiz...</Text>
        </View>
      ) : questions.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>There is no quiz yet</Text>
        </View>
      ) : (
        <>
          <Text style={styles.progress}>
            {currentIndex + 1} / {questions.length}
          </Text>

          <Text style={styles.kanji}>{currentQuestion.kanji}</Text>
          <Text style={styles.question}>{currentQuestion.question}</Text>

          {currentQuestion.options.map((option) => (
            <QuizOption
              key={option.id}
              option={option}
              isSelected={selectedId === option.id}
              isCorrect={option.id === currentQuestion.correctId}
              showResult={showResult}
              onPress={() => handleSelect(option.id)}
            />
          ))}

          <TouchableOpacity
            style={[styles.continueBtn, !showResult && { opacity: 0.5 }]}
            disabled={!showResult}
            onPress={handleNext}
          >
            <Text style={styles.continueText}>
              {currentIndex + 1 === questions.length
                ? "See Result →"
                : "Next →"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 10,
    color: colors.primary,
  },
  progress: {
    marginTop: 10,
    fontSize: 14,
    color: colors.textSecondary,
    justifyContent: "center",
    textAlign: "center",
  },

  kanji: {
    fontSize: 64,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    color: colors.primary,
  },

  question: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
    color: colors.textSecondary,
  },

  optionsContainer: {
    flex: 1,
  },

  option: {
    backgroundColor: colors.border,
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: colors.accent,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
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

  correctIcon: {
    fontSize: 18,
    color: colors.optionCorrect,
    fontWeight: "bold",
  },

  wrongIcon: {
    fontSize: 18,
    color: colors.optionWrong,
    fontWeight: "bold",
  },

  continueBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },

  continueText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
