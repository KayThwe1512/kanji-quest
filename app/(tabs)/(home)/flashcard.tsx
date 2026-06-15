import Spinner from "@/component/Spinner";
import ThemeFlashcard from "@/component/ThemeFlashcard";
import { SECTIONS } from "@/constants/section";
import { useFavorite } from "@/context/FavoriteContext";
import { useLearning } from "@/context/ProgressContext";
import { getFlashcardKanji } from "@/services/kanjiService";
import {
  getSectionProgress,
  saveSectionProgress,
} from "@/services/userProgress";
import colors from "@/theme/colors";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FlashcardScreen() {
  const [kanjiList, setKanjiList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { addLearnedKanji, loaded } = useLearning();
  const { favorites, toggleFavorite } = useFavorite();

  const { level, sectionId, kanji, from } = useLocalSearchParams<{
    level: string;
    sectionId: string;
    kanji: string;
    from: string;
  }>();

  const isFavoriteMode = from === "favorite";

  const section = SECTIONS[level as keyof typeof SECTIONS]?.find(
    (s) => s.id === sectionId,
  );

  const sectionName = section?.name ?? "";

  useEffect(() => {
    if (!isFavoriteMode) return;
    if (!kanji) return;
    const list = [...favorites];
    if (!list.length) return;
    setKanjiList(list);
    const index = list.findIndex((k) => k.kanji === kanji);
    setCurrentIndex(index >= 0 ? index : 0);
    setLoading(false);
  }, [kanji, isFavoriteMode]);

  const loadKanji = async () => {
    try {
      setLoading(true);

      if (!section) return;

      const data = getFlashcardKanji(section.kanjiIds);
      setKanjiList(data);

      const saved = await getSectionProgress(sectionId);

      if (saved) {
        setCurrentIndex(saved.lastIndex ?? 0);
      } else {
        setCurrentIndex(0);
      }
    } catch (error) {
      console.log("Flashcard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!loaded) return;
  //   addLearnedKanji("一", new Date("2026-03-03"));
  //   addLearnedKanji("二", new Date("2026-03-03"));
  //   addLearnedKanji("三", new Date("2026-03-03"));
  //   addLearnedKanji("四", new Date("2026-03-03"));
  // }, [loaded]);

  useEffect(() => {
    if (isFavoriteMode) return;
    if (!sectionId) return;

    loadKanji();
  }, [sectionId]);

  const currentCard = kanjiList[currentIndex];
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === kanjiList.length - 1;

  const saveProgress = async (index: number) => {
    if (isFavoriteMode) return;

    await saveSectionProgress({
      sectionId,
      level,
      lastIndex: index,
    });
  };

  const handleNext = async () => {
    if (isLastCard) return;

    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);

    await saveProgress(newIndex);
  };

  const handlePrev = () => {
    if (isFirstCard) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const isFav = favorites.some((k) => k.kanji === currentCard?.kanji);

  const progressPercent =
    kanjiList.length === 0 ? 0 : ((currentIndex + 1) / kanjiList.length) * 100;

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner />
      ) : !kanjiList.length ? (
        <Text>No flashcards found.</Text>
      ) : (
        <>
          <Text style={styles.sectionName}>{sectionName}</Text>

          {!isFavoriteMode && (
            <>
              <Text style={styles.progress}>
                {currentIndex + 1} / {kanjiList.length}
              </Text>

              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressPercent}%` },
                  ]}
                />
              </View>
            </>
          )}

          {currentCard && (
            <ThemeFlashcard
              card={currentCard}
              isFavorite={isFav}
              ontoggleFavorite={() =>
                toggleFavorite({
                  kanji: currentCard.kanji,
                  meanings: currentCard.meanings ?? [],
                  onyomi: currentCard.onyomi ?? [],
                  kunyomi: currentCard.kunyomi ?? [],
                })
              }
              onFlip={() => {
                if (!isFavoriteMode) {
                  addLearnedKanji(currentCard.kanji);
                }
              }}
            />
          )}
          {!isFavoriteMode && (
            <>
              <View style={styles.navRow}>
                <TouchableOpacity
                  style={[
                    styles.navButton,
                    isFirstCard && styles.disabledButton,
                  ]}
                  onPress={handlePrev}
                  disabled={isFirstCard}
                >
                  <Text style={styles.buttonText}>Prev</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.navButton,
                    isLastCard && styles.disabledButton,
                  ]}
                  onPress={handleNext}
                  disabled={isLastCard}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
    backgroundColor: colors.primary,
    opacity: 0.25,
    // shadowOpacity: 0,
    // elevation: 0,
    boxShadow: "",
  },

  disabledText: {
    color: colors.border,
    opacity: 1,
  },
});
