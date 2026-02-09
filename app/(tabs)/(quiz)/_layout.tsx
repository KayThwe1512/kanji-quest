import { Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          title: "Level",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: "#87cfeb5b",
          },
        }}
      />
      <Stack.Screen
        name="quiz"
        options={{
          title: "Quizs",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: "#87cfeb5b",
          },
        }}
      />
      <Stack.Screen
        name="result"
        options={{
          title: "Result",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: "#87cfeb5b",
          },
        }}
      />
    </Stack>
  );
}
