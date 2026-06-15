import LevelCard from "@/component/LevelBox";
import { LEVELS } from "@/constants/level";
import { SECTIONS } from "@/constants/section";
import { useLearning } from "@/context/ProgressContext";
import colors from "@/theme/colors";
import { router } from "expo-router";
import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function LevelScreen() {
  const { learnedKanji } = useLearning();

  const levelProgress = useMemo(() => {
    const progress: Record<string, number> = {};

    LEVELS.forEach((level) => {
      const sections = SECTIONS[level.id as keyof typeof SECTIONS] || [];
      const allKanjiInLevel = sections.flatMap((section) => section.kanjiIds);
      const learnedCount = learnedKanji.filter((kanji) =>
        allKanjiInLevel.includes(kanji),
      ).length;

      progress[level.id] = learnedCount;
    });

    return progress;
  }, [learnedKanji]);

  const handlePress = (level: string) => {
    router.push({
      pathname: "/section",
      params: { level },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={LEVELS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <LevelCard
            levelId={item.id}
            name={item.name}
            variant="practice"
            totalKanji={item.totalKanji}
            completedKanji={levelProgress[item.id] || 0}
            onPress={() => handlePress(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
