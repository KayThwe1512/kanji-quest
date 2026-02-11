import colors from "@/theme/colors";
import { router, useLocalSearchParams } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { kanjiN5 } from "../../../data/kanjiN5";
import { chunkArray } from "./chunkArray";

export default function PracticeSectionScreen() {
  const { level } = useLocalSearchParams();

  const sections = chunkArray(kanjiN5, 10);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{level} Sections</Text>

      <FlatList
        data={sections}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/flashcard",
                params: { data: JSON.stringify(item) },
              })
            }
          >
            <Text style={styles.cardText}>Section {index + 1}</Text>
            <Text style={styles.description}>{item.length} Cards</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textPrimary,
    textAlign: "center",
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: colors.primary,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  description: {
    fontSize: 12,
    color: colors.white,
  },
});
