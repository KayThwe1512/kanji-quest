import LevelCard from "@/component/LevelBox";
import { LEVELS } from "@/constants/level";
import { SECTIONS } from "@/constants/section";
import { useLearning } from "@/context/ProgressContext";
import colors from "@/theme/colors";
import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

export default function LevelScreen() {
  const { learnedKanji } = useLearning();
  const getCompletedForLevel = (levelId: string) => {
    const sections = SECTIONS[levelId as keyof typeof SECTIONS] || [];
    const allKanjiInLevel = sections.flatMap((section) => section.kanjiIds);
    const learnedInLevel = learnedKanji.filter((kanji) =>
      allKanjiInLevel.includes(kanji),
    );

    return learnedInLevel.length;
  };
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
            totalKanji={item.totalKanji}
            completedKanji={getCompletedForLevel(item.id)}
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
