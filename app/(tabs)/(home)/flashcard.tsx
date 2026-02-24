import ThemeFlashcard from "@/component/ThemeFlashcard";
import { SECTIONS } from "@/constants/section";
import { useFavorite } from "@/context/FavoriteContext";
import { useLearning } from "@/context/ProgressContext";
import { getFlashcardKanji } from "@/services/kanjiService";
import { saveSectionProgress } from "@/services/userProgress";
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

  const loadKanji = async () => {
    try {
      setLoading(true);

      const section = SECTIONS[level as keyof typeof SECTIONS]?.find(
        (s) => s.id === sectionId,
      );

      if (!section) return;
      const data = await getFlashcardKanji(sectionId, section.kanjiIds);
      setKanjiList(data);

      setCurrentIndex(0);
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
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading flashcards...</Text>
      </View>
    );
  }
  if (!kanjiList.length) {
    return (
      <View style={styles.container}>
        <Text>No flashcards found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashcard Practice</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <ThemeFlashcard
        card={currentCard}
        isFavorite={isFav}
        ontoggleFavorite={() =>
          toggleFavorite({
            kanji: currentCard.kanji,
            meanings: currentCard.meanings ?? [],
            onyomi: currentCard.on_readings ?? [],
            kunyomi: currentCard.kun_readings ?? [],
          })
        }
        // ontoggleFavorite={() => toggleFavorite(currentCard?.kanji)}
      />

      {/* Navigation Buttons */}
      <View style={styles.navRow}>
        {!isFirstCard && (
          <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
            <Text style={styles.buttonText}>Prev</Text>
          </TouchableOpacity>
        )}

        {!isLastCard && (
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 15,
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
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
