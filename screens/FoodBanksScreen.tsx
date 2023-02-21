import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import React, { useEffect } from "react";
import MapView, { Geojson, Region } from "react-native-maps";
import * as FoodBanks from "../assets/foodbanks.json";
import * as Location from "expo-location";

export default function FoodBanksScreen() {
  const ref = React.useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let result = await Location.requestForegroundPermissionsAsync();
      if (result.granted) {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        ref.current?.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={ref}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
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
