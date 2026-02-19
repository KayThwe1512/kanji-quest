// import colors from "@/theme/colors";
// import React from "react";
// import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

// type ThemeSectionProps<T> = {
//   sections: T[][];
//   onPressSection: (sectionIndex: number) => void;
// };

// export function ThemeSection<T>({
//   sections,
//   onPressSection,
// }: ThemeSectionProps<T>) {
//   return (
//     <FlatList
//       data={sections}
//       keyExtractor={(_, i) => `section-${i}`}
//       renderItem={({ item, index }) => (
//         <TouchableOpacity
//           style={styles.card}
//           onPress={() => onPressSection(index)}
//         >
//           <Text style={styles.title}>Section {index + 1}</Text>
//           <Text>{item.length} cards</Text>
//         </TouchableOpacity>
//       )}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 8,
//   },
//   card: {
//     backgroundColor: colors.primary,
//     marginHorizontal: 16,
//     marginVertical: 8,
//     padding: 16,
//     borderRadius: 12,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: colors.primary,
//   },
//   count: {
//     marginTop: 6,
//     color: "#666",
//   },
// });
import colors from "@/theme/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  sectionNo: string;
  sectionElements: string[];
  totalCards: number;
  completedCard: number;
  onPress: () => void;
};

export default function SectionCard({
  sectionNo,
  sectionElements,
  completedCard,
  totalCards,
  onPress,
}: Props) {
  const progress = Math.round((completedCard / totalCards) * 100);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.title}>Section {sectionNo}</Text>
        <Text style={styles.kanjiText}>{sectionElements}</Text>
        <Text style={styles.countText}>{totalCards} Kanji</Text>
      </View>
      <View style={styles.progressWrapper}>
        <View style={styles.circle}>
          <Text style={styles.percentText}>{progress}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.border,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },

  kanjiText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  countText: {
    fontSize: 12,
    color: colors.accent,
    marginTop: 4,
  },
  progressWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 6,
    borderColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  percentText: {
    fontWeight: "bold",
    color: colors.secondary,
  },
});
