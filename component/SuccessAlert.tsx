import colors from "@/theme/colors";
import React, { useEffect } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";

type SuccessModalProps = {
  visible: boolean;
  kanji: string;
  onClose: () => void;
};

export default function SuccessAlert({
  visible,
  kanji,
  onClose,
}: SuccessModalProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visible]);
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.dragIndicator} />

          <View style={styles.iconWrapper}>
            <Image
              source={require("../assets/check-mark (1).png")}
              style={{
                width: 100,
                height: 100,
                backgroundColor: colors.background,
                borderRadius: 50,
              }}
            />
          </View>

          <Text style={styles.title}>Success!</Text>

          <Text style={styles.message}>
            "{kanji}" was removed from favorites
          </Text>

          {/* <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close!</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.white,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: colors.border,
    borderRadius: 10,
    marginBottom: 25,
  },
  iconWrapper: {
    width: 90,
    height: 90,
    backgroundColor: colors.correct,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 25,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
});
