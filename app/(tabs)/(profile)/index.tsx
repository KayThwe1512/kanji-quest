import { Bar } from "@/component/Bar";
import { StatCard } from "@/component/StatCard";
import { useLearning } from "@/context/ProgressContext";
import colors from "@/theme/colors";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const {
    learnedKanji,
    highestDailyCount,
    lastLearnedDate,
    longestStreak,
    dailyCounts,
    getPseudoDayIndex,
  } = useLearning();

  const totalLearned = learnedKanji.length;

  const getWeeklyData = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);

    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const data: { label: string; value: number; frontColor: string }[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      const dayIndex = getPseudoDayIndex(date);

      data.push({
        label: labels[i],
        value: dailyCounts[dayIndex] || 0,
        frontColor: colors.secondary,
      });
    }

    return data;
  };

  const today = new Date().toDateString();
  // console.log("dailyCounts:", dailyCounts);
  // console.log("weeklyData:", getWeeklyData());

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.progressTitle}>
            Your <Text style={{ color: "#F4D03F" }}>Progress!</Text>
          </Text>
          <Text style={styles.subtitle}>Track your learning day by day!</Text>
          <Text style={styles.date}>{today}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.cardGrid}>
            <StatCard
              number={totalLearned.toString()}
              label="Total Learned"
              title="Words"
            />
            <StatCard
              number={highestDailyCount.toString()}
              label="Highest Word Count"
              title="Words"
            />
            <StatCard
              number={longestStreak.toString()}
              label="Longest Streak"
              title="Days"
            />
            <StatCard
              number={
                lastLearnedDate
                  ? new Date(lastLearnedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "No data"
              }
              label="Last Word Learned"
              title=""
            />
          </View>

          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <View style={styles.chart}>
            <Bar data={getWeeklyData()} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 24,
  },

  progressTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
  },

  subtitle: {
    color: colors.secondary,
    marginTop: 6,
  },

  date: {
    color: colors.secondary,
    marginTop: 4,
    fontSize: 12,
  },

  content: {
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 16,
    margin: 10,
    borderWidth: 5,
    borderColor: colors.border,
  },

  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 12,
    color: colors.primary,
  },

  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 230,
  },
});
