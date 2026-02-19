import SectionCard from "@/component/ThemeSection";
import { SECTIONS } from "@/constants/section";
import colors from "@/theme/colors";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function PracticeSectionScreen() {
  const { level } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{level} Sections</Text>

      <FlatList
        data={SECTIONS}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item, index }) => (
          <SectionCard
            sectionNo={item.id}
            sectionElements={item.kanjiElements}
            completedCard={item.completedCard}
            totalCards={item.totalCards}
            onPress={() =>
              router.push({
                pathname: "/flashcard",
                params: { sectionIndex: index.toString() },
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
