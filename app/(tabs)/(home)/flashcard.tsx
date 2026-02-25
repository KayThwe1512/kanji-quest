import ThemeFlashcard from "@/component/ThemeFlashcard";
import { SECTIONS } from "@/constants/section";
import { useFavorite } from "@/context/FavoriteContext";
import { useLearning } from "@/context/ProgressContext";
import { getFlashcardKanji } from "@/services/kanjiService";
import { getAllProgress, saveSectionProgress } from "@/services/userProgress";
import colors from "@/theme/colors";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FlashcardScreen() {
  const [kanjiList, setKanjiList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addLearnedKanji } = useLearning();

  const [currentIndex, setCurrentIndex] = useState(0);
  const { favorites, toggleFavorite } = useFavorite();
  const { level, sectionId } = useLocalSearchParams<{
    level: string;
    sectionId: string;
  }>();
  const section = SECTIONS[level as keyof typeof SECTIONS]?.find(
    (s) => s.id === sectionId,
  );

  const sectionName = section?.name ?? "";

  const loadKanji = async () => {
    try {
      setLoading(true);

      if (!section) return;
      const data = await getFlashcardKanji(sectionId, section.kanjiIds);
      setKanjiList(data);

      const allProgress = await getAllProgress();
      const savedProgress = allProgress[sectionId];

      if (savedProgress) {
        setCurrentIndex(savedProgress.lastIndex ?? 0);
      } else {
        setCurrentIndex(0);
      }
    } catch (error) {
      console.log("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sectionId) return;
    const timer = setTimeout(() => {
      loadKanji();
    }, 500);

    return () => clearTimeout(timer);
  }, [sectionId]);

  const currentCard = kanjiList[currentIndex];
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === kanjiList.length - 1;

  const saveProgress = async (index: number) => {
    await saveSectionProgress({
      sectionId,
      level,
      lastIndex: index,
      learnedKanji: kanjiList.slice(0, index + 1).map((k) => k.kanji),
    });
  };
  const handleNext = () => {
    if (!isLastCard) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      addLearnedKanji(currentCard.kanji);
      saveProgress(newIndex);
    }
  };

  const handlePrev = () => {
    if (!isFirstCard) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // const isFav = favorites.includes(currentCard?.kanji);
  const isFav = favorites.some((k) => k.kanji === currentCard?.kanji);
  const progressPercent = ((currentIndex + 1) / kanjiList.length) * 100;

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading flashcards...</Text>
      ) : !kanjiList.length ? (
        <Text>No flashcards found.</Text>
      ) : (
        <>
          <Text style={styles.sectionName}>{sectionName}</Text>
          <Text style={styles.progress}>
            {currentIndex + 1} / {kanjiList.length}
          </Text>

          <View style={styles.progressContainer}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%` }]}
            />
          </View>

          {currentCard && (
            <ThemeFlashcard
              card={currentCard}
              isFavorite={isFav}
              ontoggleFavorite={() =>
                toggleFavorite({
                  kanji: currentCard.kanji,
                  meanings: currentCard.meaning ?? [],
                  onyomi: currentCard.onyomi ?? [],
                  kunyomi: currentCard.kunyomi ?? [],
                })
              }
            />
          )}

          <View style={styles.navRow}>
            <TouchableOpacity
              style={[styles.navButton, isFirstCard && styles.disabledButton]}
              onPress={handlePrev}
              disabled={isFirstCard}
            >
              <Text style={styles.buttonText}>Prev</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, isLastCard && styles.disabledButton]}
              onPress={handleNext}
              disabled={isLastCard}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  sectionName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  progressContainer: {
    width: "90%",
    height: 5,
    backgroundColor: colors.border,
    borderRadius: 5,
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.secondary,
    borderRadius: 5,
  },
  navRow: {
    flexDirection: "row",
    gap: 15,
    marginVertical: 20,
  },
  navButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    width: 100,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    // iOS shadow
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,

    // // Android shadow
    // elevation: 5,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  progress: {
    marginVertical: 10,
    fontSize: 14,
    color: colors.textSecondary,
    justifyContent: "center",
    textAlign: "center",
  },

  disabledButton: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },

  disabledText: {
    color: colors.text,
  },
});
