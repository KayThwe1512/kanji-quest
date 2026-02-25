import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ToastProps = {
  visible: boolean;
  kanji: string;
  onClose: () => void;
};

export default function Toast({ visible, kanji, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.leftContent}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={colors.correct}
            style={styles.icon}
          />

          <Text style={styles.text}>"{kanji}" was removed from favorites</Text>
        </View>

        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
    zIndex: 999,
    elevation: 20,
  },
  container: {
    width: "92%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingVertical: 22,
    paddingHorizontal: 16,
    borderRadius: 14,

    borderLeftWidth: 6,
    borderLeftColor: colors.correct,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 10,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 15,
    color: colors.textPrimary,
    flexShrink: 1,
  },
});
