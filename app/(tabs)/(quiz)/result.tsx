import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuizResultScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Quiz Completed!</Text>

      <Text style={styles.score}>Score: 7 / 10</Text>
      <Text style={styles.accuracy}>Accuracy: 70%</Text>

      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => router.replace("/quiz")}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.replace("/home")}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
  },
  accuracy: {
    fontSize: 18,
    marginBottom: 30,
    color: "gray",
  },
  retryButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  homeButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
