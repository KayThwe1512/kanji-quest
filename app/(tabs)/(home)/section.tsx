import SectionCard from "@/component/ThemeSection";
import { SECTIONS } from "@/constants/section";
import colors from "@/theme/colors";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function PracticeSectionScreen() {
  const { level } = useLocalSearchParams();

  const sections = SECTIONS[level as keyof typeof SECTIONS] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{level} Sections</Text>

      <FlatList
        data={sections}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item, index }) => (
          <SectionCard
            sectionId={item.id}
            sectionName={item.name}
            sectionElements={item.kanjiIds}
            totalKanji={item.total}
            onPress={() =>
              router.push({
                pathname: "/flashcard",
                params: { level, sectionId: item.id },
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
    backgroundColor: "#EBF4F6",
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
});
