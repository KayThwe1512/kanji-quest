import { Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen name="level" options={{ headerShown: false }} />
      <Stack.Screen
        name="quiz"
        options={{
          title: "Quizs",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          title: "Result",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
