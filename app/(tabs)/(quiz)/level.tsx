// import { Pressable, StyleSheet, Text, View } from "react-native";

// export default function QuizScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select Quiz Level</Text>

//       <Pressable style={styles.level}>
//         <Text>N5 - Beginner</Text>
//       </Pressable>

//       <Pressable style={styles.level}>
//         <Text>N4 - Intermediate</Text>
//       </Pressable>

//       <Pressable style={styles.level}>
//         <Text>N3 - Advanced</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   level: {
//     padding: 16,
//     borderRadius: 10,
//     backgroundColor: "#e5e7eb",
//     marginBottom: 12,
//   },
// });
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuizLevelScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Quiz Level</Text>

      {/* N5 Button */}
      <TouchableOpacity
        style={styles.levelButton}
        onPress={() => router.push("/quiz")}
      >
        <Text style={styles.levelText}>N5 - Beginner</Text>
      </TouchableOpacity>

      {/* N4 Button */}
      <TouchableOpacity
        style={[styles.levelButton, { backgroundColor: "#FF9800" }]}
        onPress={() => router.push("/quiz")}
      >
        <Text style={styles.levelText}>N4 - Elementary</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.levelButton, { backgroundColor: "#00ddff" }]}
        onPress={() => router.push("/quiz")}
      >
        <Text style={styles.levelText}>N3 - Intermediate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.levelButton, { backgroundColor: "#ff3300" }]}
        onPress={() => router.push("/quiz")}
      >
        <Text style={styles.levelText}>N2 - Advance</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.levelButton, { backgroundColor: "#09ff00" }]}
        onPress={() => router.push("/quiz")}
      >
        <Text style={styles.levelText}>N1 - Native</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  levelButton: {
    backgroundColor: "#673AB7",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  levelText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
