import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="flashcard"
        options={{
          title: "Flashcards",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
