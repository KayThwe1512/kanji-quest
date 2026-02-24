import colors from "@/theme/colors";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Japanese Kanji Quiz</Text>
      <Text style={styles.subtitle}>Practice and test your kanji skills</Text>

      <TouchableOpacity
        style={styles.practiceButton}
        onPress={() => router.push("/practicelevel")}
      >
        <Text style={styles.buttonText}>📖 Practice Flashcards</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push("/quizlevel")}
      >
        <Text style={styles.buttonText}>🧩 Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: "center",
  },
  practiceButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 15,
  },
  quizButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
