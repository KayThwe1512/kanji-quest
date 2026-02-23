import LevelCard from "@/component/LevelBox";
import { LEVELS } from "@/constants/level";
import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

export default function LevelScreen() {
  const handlePress = (level: string) => {
    router.push({
      pathname: "/section",
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
            totalKanji={item.totalKanji}
            completedKanji={item.completedKanji}
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
    backgroundColor: "#EBF4F6",
  },
});
