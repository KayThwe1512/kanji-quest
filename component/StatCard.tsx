import colors from "@/theme/colors";
import { StyleSheet, Text, View } from "react-native";

type StatCardProp = {
  number: string;
  label: string;
  title: string;
};

export const StatCard = ({ number, label, title }: StatCardProp) => (
  <View style={styles.card}>
    <Text style={styles.cardNumber}>
      {number} {title}
    </Text>
    <Text style={styles.cardLabel}>{label}</Text>
  </View>
);
const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: colors.border,
  },

  cardNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  cardLabel: {
    color: colors.primary,
    marginTop: 4,
    fontSize: 12,
  },
});
