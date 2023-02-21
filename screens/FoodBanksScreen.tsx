import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import React from "react";

export default function FoodBanksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Banks</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
