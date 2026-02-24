import colors from "@/theme/colors";
import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconWrapper}>
            <Image
              source={require("../assets/bin.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 4,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 10,
  },
  iconWrapper: {
    backgroundColor: colors.white,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
    color: colors.primary,
  },
  message: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.wrong,
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 10,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});
