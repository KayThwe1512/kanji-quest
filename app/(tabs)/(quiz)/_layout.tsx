import colors from "@/theme/colors";
import { Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="level"
        options={{
          title: "Level",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <Stack.Screen
        name="quizScreen"
        options={{
          title: "Quizs",
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: colors.background,
          },
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
        }}
      />
    </Stack>
  );
}
