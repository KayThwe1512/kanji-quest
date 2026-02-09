// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// type RootStackParamList = {
//   ReviewComplete: { totalCards: number; level: number };
//   Home: undefined;
//   Flashcard: { level: number };
// };

// type Props = NativeStackScreenProps<RootStackParamList, "ReviewComplete">;

// export default function ReviewCompleteScreen({ route, navigation }: Props) {
//   const { totalCards, level } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Review Complete 🎉</Text>

//       {/* 📚 Progress Info */}
//       <View style={styles.progressBox}>
//         <Text style={styles.levelText}>Level {level} Finished</Text>
//         <Text style={styles.cardCount}>{totalCards} Cards Reviewed</Text>
//       </View>

//       {/* 🔘 Buttons */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => navigation.navigate("Flashcard", { level })}
//       >
//         <Text style={styles.buttonText}>🔁 Repractice Level</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.button, styles.nextBtn]}
//         onPress={() => navigation.navigate("Flashcard", { level: level + 1 })}
//       >
//         <Text style={styles.buttonText}>⬆️ Next Level</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.button, styles.homeBtn]}
//         onPress={() => navigation.navigate("Home")}
//       >
//         <Text style={styles.buttonText}>🏠 Go Home</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f7fb",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   progressBox: {
//     backgroundColor: "white",
//     width: "100%",
//     padding: 25,
//     borderRadius: 15,
//     alignItems: "center",
//     marginBottom: 30,
//     elevation: 4,
//   },
//   levelText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   cardCount: {
//     fontSize: 18,
//     color: "gray",
//   },
//   button: {
//     width: "100%",
//     padding: 16,
//     borderRadius: 12,
//     backgroundColor: "#5c6bc0",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   nextBtn: {
//     backgroundColor: "#43a047",
//   },
//   homeBtn: {
//     backgroundColor: "#757575",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const complete = () => {
  return (
    <View>
      <Text>complete</Text>
    </View>
  );
};

export default complete;

const styles = StyleSheet.create({});
