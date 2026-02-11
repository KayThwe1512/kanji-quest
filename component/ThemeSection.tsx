// type Word = {
//   id: string;
//   kanji: string;
//   meaning: string;
// };

// type ThemeSectionProps = {
//   sections: Word[][];
//   onPressBtn: (sectionIndex: number) => void;
// };

// import React from "react";
// import {
//     FlatList,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";

// const ThemeSection = ({ sections, onPressBtn }: ThemeSectionProps) => {
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={sections}
//         keyExtractor={(_, index) => `section-${index}`}
//         renderItem={({ item, index }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() => onPressBtn(index)}
//           >
//             <Text style={styles.title}>Section {index + 1}</Text>

//             <Text style={styles.count}>{item.length} words</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// // export default ThemeSection;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   card: {
//     backgroundColor: "#fff",
//     marginHorizontal: 16,
//     marginVertical: 8,
//     padding: 16,
//     borderRadius: 12,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   count: {
//     marginTop: 6,
//     color: "#666",
//   },
// });
import colors from "@/theme/colors";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

type ThemeSectionProps<T> = {
  sections: T[][];
  onPressSection: (sectionIndex: number) => void;
};

export function ThemeSection<T>({
  sections,
  onPressSection,
}: ThemeSectionProps<T>) {
  return (
    <FlatList
      data={sections}
      keyExtractor={(_, i) => `section-${i}`}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => onPressSection(index)}
        >
          <Text style={styles.title}>Section {index + 1}</Text>
          <Text>{item.length} cards</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  card: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  count: {
    marginTop: 6,
    color: "#666",
  },
});
