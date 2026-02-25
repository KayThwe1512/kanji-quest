import SectionCard from "@/component/ThemeSection";
import { SECTIONS } from "@/constants/section";
import { getAllProgress } from "@/services/userProgress";
import colors from "@/theme/colors";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function PracticeSectionScreen() {
  const { level } = useLocalSearchParams();

  const sections = SECTIONS[level as keyof typeof SECTIONS] || [];
  const [sectionProgress, setSectionProgress] = useState<any>({});
  useFocusEffect(
    useCallback(() => {
      const loadProgress = async () => {
        const progress = await getAllProgress();
        setSectionProgress(progress);
      };

      loadProgress();
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const attempts = sectionProgress[item.id]?.learnedKanji?.length || 0;

          return (
            <SectionCard
              sectionId={item.id}
              sectionName={item.name}
              sectionElements={item.kanjiIds}
              totalKanji={item.total}
              completedKanji={attempts}
              onPress={() =>
                router.push({
                  pathname: "/flashcard",
                  params: { level, sectionId: item.id },
                })
              }
            />
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
});
