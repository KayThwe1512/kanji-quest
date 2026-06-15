import QuizOption from "@/component/QuizOption";
import Spinner from "@/component/Spinner";
import { getEventQuiz } from "@/services/getEventQuiz";
import { getQuiz } from "@/services/quizService";
import { saveQuizAttempt } from "@/services/quizStorage";
import colors from "@/theme/colors";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Option = {
  id: number;
  text: string;
};

type Question = {
  prompt: string;
  question: string;
  options: Option[];
  correctId: number;
  promptType: string;

  kanji?: string;
  reading?: string;
  meaning?: string;
};

export default function QuizScreen() {
  const navigation = useNavigation();
  const allowExitRef = useRef(false);
  const router = useRouter();
  const { mode, level, start, end } = useLocalSearchParams();
  const isEventMode = mode === "event";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (allowExitRef.current) {
        return;
      }
      e.preventDefault();

      Alert.alert("Leave Quiz?", "Your current quiz progress will be lost.", [
        {
          text: "Stay",
          style: "cancel",
          onPress: () => {},
        },
        {
          text: "Leave",
          style: "destructive",
          onPress: () => {
            navigation.dispatch(e.data.action);
          },
        },
      ]);
    });

    return unsubscribe;
  }, [navigation]);

  const scoreRef = useRef(0);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (mode === "event") {
      loadQuiz();
    } else if (level) {
      loadQuiz();
    }
  }, [mode, level]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      let quiz;

      if (mode === "event") {
        quiz = await getEventQuiz(Number(start), Number(end));
      } else {
        quiz = await getQuiz(level as string);
      }
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
      allowExitRef.current = true;
      router.replace({
        pathname: "/result",
        params: {
          score: scoreRef.current.toString(),
          total: questions.length.toString(),
          mode: mode as string,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner />
      ) : questions.length === 0 ? (
        <View style={styles.empty}>
          <Text>There is no quiz yet</Text>
        </View>
      ) : (
        <>
          <Text style={styles.progress}>
            {currentIndex + 1} / {questions.length}
          </Text>

          {/* Fixed Prompt */}
          <View style={[styles.promptContainer, isEventMode && { height: 70 }]}>
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit
              style={[
                currentQuestion.promptType === "meaning"
                  ? styles.meaningText
                  : currentQuestion.promptType === "reading"
                    ? styles.readingText
                    : styles.kanji,

                isEventMode &&
                  (currentQuestion.promptType === "meaning"
                    ? styles.eventMeaningText
                    : currentQuestion.promptType === "reading"
                      ? styles.eventReadingText
                      : styles.eventKanjiText),
              ]}
            >
              {currentQuestion.prompt
                ? currentQuestion.prompt.includes("/")
                  ? currentQuestion.prompt.split("/")[0].trim()
                  : currentQuestion.prompt
                : ""}
            </Text>
          </View>

          {/* Fixed Question Height */}
          <Text style={[styles.question, isEventMode && { fontSize: 15 }]}>
            {currentQuestion.question}
          </Text>

          {/* LOCKED OPTIONS AREA */}
          <View style={styles.optionsWrapper}>
            {currentQuestion.options.map((option) => (
              <QuizOption
                key={option.id}
                option={option}
                isSelected={selectedId === option.id}
                isCorrect={option.id === currentQuestion.correctId}
                showResult={showResult}
                promptType={currentQuestion.promptType}
                onPress={() => handleSelect(option.id)}
              />
            ))}
          </View>
          <View style={styles.bottomSection}>
            {showResult && (
              <View style={styles.answerCard}>
                <Text style={styles.answerTitle}>• CORRECT ANSWER</Text>

                <View style={styles.answerRow}>
                  <View style={styles.answerColumn}>
                    <Text style={styles.answerLabel}>Kanji</Text>
                    <Text style={styles.answerKanji}>
                      {currentQuestion.kanji}
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.answerColumn}>
                    <Text style={styles.answerLabel}>Reading</Text>
                    <Text style={styles.answerValue}>
                      {currentQuestion.reading}
                    </Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.answerColumn}>
                    <Text style={styles.answerLabel}>Meaning</Text>
                    <Text style={styles.answerValue}>
                      {currentQuestion.meaning
                        ? currentQuestion.meaning.split("/")[0].trim()
                        : ""}
                    </Text>
                  </View>
                </View>
              </View>
            )}

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
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  answerCard: {
    backgroundColor: colors.white,
    opacity: 0.95,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },

  answerTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
  },

  answerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  answerColumn: {
    flex: 1,
    alignItems: "center",
  },

  answerLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
  },

  answerKanji: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },

  answerValue: {
    fontSize: 14,
    color: colors.textPrimary,
  },

  divider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E5E5",
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  progress: {
    textAlign: "center",
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 10,
  },

  promptContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  kanji: {
    fontSize: 32,
    textAlign: "center",
    color: colors.primary,
  },

  meaningText: {
    fontSize: 24,
    textAlign: "center",
    color: colors.primary,
  },

  readingText: {
    fontSize: 28,
    textAlign: "center",
    color: colors.primary,
  },
  eventMeaningText: {
    fontSize: 22,
  },

  eventReadingText: {
    fontSize: 22,
  },

  eventKanjiText: {
    fontSize: 28,
  },

  // question: {
  //   textAlign: "center",
  //   fontSize: 18,
  //   color: colors.textSecondary,
  //   height: 50,
  //   marginBottom: 20,
  // },
  question: {
    textAlign: "center",
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  optionsWrapper: {
    marginTop: 10,
  },
  bottomSection: {
    marginTop: "auto",
    paddingBottom: 13,
  },

  continueBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    bottom: 0,
  },

  continueText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
