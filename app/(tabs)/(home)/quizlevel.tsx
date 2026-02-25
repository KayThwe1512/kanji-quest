import LevelCard from "@/component/LevelBox";
import { LEVELS } from "@/constants/level";
import { getQuizAttempts } from "@/services/quizStorage";
import colors from "@/theme/colors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function LevelScreen() {
  const [attempts, setAttempts] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadAttempts = async () => {
      const data = await getQuizAttempts();
      setAttempts(data);
    };

    loadAttempts();
  }, []);

  const handlePress = (level: string) => {
    router.push({
      pathname: "/quiz",
      params: { level },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={LEVELS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <LevelCard
            levelId={item.id}
            name={item.name}
            attempts={attempts[item.id] || 0}
            variant="quiz"
            onPress={() => handlePress(item.id)}
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
