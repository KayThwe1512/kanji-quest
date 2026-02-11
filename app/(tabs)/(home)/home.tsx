// import React from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";

// const index = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Japanese Kanji Quiz</Text>

//       <Pressable style={styles.button}>
//         <Text style={styles.buttonText}>Practice with Flashcards</Text>
//       </Pressable>

//       <Pressable style={styles.button}>
//         <Text style={styles.buttonText}>Start Quiz</Text>
//       </Pressable>

//       <View style={styles.card}>
//         <Text>🔥 Day Streak: 0</Text>
//         <Text>📘 Learned Kanji: 0</Text>
//       </View>
//     </View>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: colors.background,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 18,
//     marginVertical: 10,
//   },
//   button: {
//     width: 200,
//     height: 50,
//     alignItems: "center",
//     backgroundColor: "#87cfeb",
//     padding: 10,
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//     marginVertical: 10,
//   },
//   buttonText: {
//     fontWeight: "500",
//     padding: 10,
//   },
//   card: {
//     width: "65%",
//     height: 300,
//     padding: "auto",
//     marginVertical: 10,
//     backgroundColor: "#87cfeb",
//     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//     borderRadius: 10,
//   },
// });
import colors from "@/theme/colors";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Japanese Kanji Quiz</Text>
      <Text style={styles.subtitle}>Practice and test your kanji skills</Text>

      {/* Flashcard Practice Button */}
      <TouchableOpacity
        style={styles.practiceButton}
        onPress={() => router.push("/practicelevel")}
      >
        <Text style={styles.buttonText}>📖 Practice Flashcards</Text>
      </TouchableOpacity>

      {/* Quiz Button */}
      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push("/level")}
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
    color: colors.textPrimary,
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
