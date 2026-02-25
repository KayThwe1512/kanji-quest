import StatItem from "@/component/ResultStatusItem";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ResultScreen() {
  const { score, total } = useLocalSearchParams();

  const scoreNum = Number(score) || 0;
  const totalNum = Number(total) || 0;
  const wrongNum = totalNum - scoreNum;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Ionicons name="trophy" size={56} color="#FFC83D" />
        </View>

        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.labelText}>You've scored +{scoreNum} points</Text>

        <View style={styles.statsRow}>
          <StatItem
            icon="help-circle"
            color={colors.primary}
            label="Total"
            value={totalNum}
          />
          <StatItem
            icon="checkmark-circle"
            color={colors.correct}
            label="Correct"
            value={scoreNum}
          />
          <StatItem
            icon="close-circle"
            color={colors.wrong}
            label="Wrong"
            value={wrongNum}
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              { borderWidth: 1.5, borderColor: colors.primary },
            ]}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.outlineText}>Go Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => router.push("/quizlevel")}
          >
            <Text style={styles.primaryText}>Next Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: colors.background,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#FFF5D6",
    padding: 16,
    borderRadius: 50,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    color: colors.textPrimary,
  },
  labelText: {
    color: colors.textSecondary,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 20,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  button: {
    flex: 1,
    width: 130,
    height: 50,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  outlineText: {
    color: colors.primary,
    fontWeight: "600",
  },
  primaryText: {
    color: colors.white,
    fontWeight: "600",
  },
});
