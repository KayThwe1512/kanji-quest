import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text>📘 Learned Kanji: 0</Text>
        <Text>📝 Quizzes Taken: 0</Text>
        <Text>📊 Accuracy: 0%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
});
