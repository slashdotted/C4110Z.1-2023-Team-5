import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import React from "react";
import MapView from "react-native-maps";

export default function FoodBanksScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
