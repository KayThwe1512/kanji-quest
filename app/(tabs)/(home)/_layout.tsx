import colors from "@/theme/colors";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="practicelevel"
        options={{
          title: "Kanji level",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />

      <Stack.Screen
        name="section"
        options={{
          title: "Section",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <Stack.Screen
        name="flashcard"
        options={{
          title: "Flashcards",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      {/* <Stack.Screen
        name="complete"
        options={{
          title: "Complete Practice",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      /> */}
    </Stack>
  );
}
