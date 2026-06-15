import SectionCard from "@/component/ThemeSection";
import { SECTIONS } from "@/constants/section";
import { useLearning } from "@/context/ProgressContext";
import colors from "@/theme/colors";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function PracticeSectionScreen() {
  const { level } = useLocalSearchParams();
  const { learnedKanji } = useLearning();

  const sections = SECTIONS[level as keyof typeof SECTIONS] || [];

  const learnedSet = useMemo(() => new Set(learnedKanji), [learnedKanji]);

  const getCompletedSection = (kanjiIds: string[]) => {
    let count = 0;

    for (const id of kanjiIds) {
      if (learnedSet.has(id)) {
        count++;
      }
    }

    return count;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <SectionCard
            sectionId={item.id}
            sectionName={item.name}
            sectionElements={item.kanjiIds}
            totalKanji={item.total}
            completedKanji={getCompletedSection(item.kanjiIds)}
            onPress={() =>
              router.push({
                pathname: "/flashcard",
                params: {
                  level,
                  sectionId: item.id,
                },
              })
            }
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
