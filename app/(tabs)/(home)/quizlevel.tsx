import LevelCard from "@/component/LevelBox";
import { EVENT_SETS } from "@/constants/eventSet";
import { LEVELS } from "@/constants/level";
import { getQuizAttempts } from "@/services/quizStorage";
import colors from "@/theme/colors";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function LevelScreen() {
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const { mode } = useLocalSearchParams();
  const listData = mode === "event" ? EVENT_SETS : LEVELS;

  useFocusEffect(
    useCallback(() => {
      const loadAttempts = async () => {
        const data = await getQuizAttempts();
        setAttempts(data);
      };

      loadAttempts();
    }, []),
  );

  const handlePress = (item: any) => {
    if (mode === "event") {
      router.push({
        pathname: "/quiz",
        params: {
          mode: "event",
          start: item.start,
          end: item.end,
        },
      });
    } else {
      router.push({
        pathname: "/quiz",
        params: {
          mode: "jlpt",
          level: item.id,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listData as any}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <LevelCard
            levelId={item.id}
            name={item.name}
            attempts={attempts[item.id] || 0}
            variant="quiz"
            mode={mode as string}
            onPress={() => handlePress(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
