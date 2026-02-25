import colors from "@/theme/colors";
import React, { useEffect } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.text}>"{kanji}" was removed from favorites</Text>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 70,
  },
  container: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  text: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
  close: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
});
