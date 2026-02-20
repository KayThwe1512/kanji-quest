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
          headerTitleAlign: "center",
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
          headerTitleAlign: "center",
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
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="quizlevel"
        options={{
          title: "Quiz Level",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="quiz"
        options={{
          title: "Quizs",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          title: "Result",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: "center",
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
