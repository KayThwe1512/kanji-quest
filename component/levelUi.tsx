import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type LevelUiProps = {
  title: string;
  onPressLevel: (level: string) => void;
};

const LevelUi = ({ title, onPressLevel }: LevelUiProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.box}>
        <TouchableOpacity
          style={styles.levelButton}
          onPress={() => onPressLevel("N5")}
        >
          <Text style={styles.levelText}>N5 - Beginner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.levelButton}
          onPress={() => onPressLevel("N4")}
        >
          <Text style={styles.levelText}>N4 - Elementary</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.levelButton}
          onPress={() => onPressLevel("N3")}
        >
          <Text style={styles.levelText}>N3 - Intermediate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.levelButton}
          onPress={() => onPressLevel("N2")}
        >
          <Text style={styles.levelText}>N2 - Advance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.levelButton}
          onPress={() => onPressLevel("N1")}
        >
          <Text style={styles.levelText}>N1 - Native</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LevelUi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87cfeb5b",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
  levelButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87CEEB",
    width: 280,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  levelText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    fontStyle: "italic",
  },
});
