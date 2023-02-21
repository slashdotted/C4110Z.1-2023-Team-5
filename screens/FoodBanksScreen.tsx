import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import React from "react";
import MapView, { Geojson } from "react-native-maps";
import * as FoodBanks from "../assets/foodbanks.json";

export default function FoodBanksScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Geojson
          geojson={FoodBanks as GeoJSON.FeatureCollection<GeoJSON.Point>}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
        />
      </MapView>
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
