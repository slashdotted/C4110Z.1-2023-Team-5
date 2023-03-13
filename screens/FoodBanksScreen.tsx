import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Geojson } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { FoodBank } from "../constants/Types";
import FoodBankSheet from "../components/FoodBankSheet";
import * as FoodBanks from "../assets/foodbanks.json";
import * as Location from "expo-location";
import findCountryByCoordinate from "../utils/findCountryByCoordinate";

export default function FoodBanksScreen() {
  const ref = useRef<MapView>(null);
  const bottomSheet = useRef<BottomSheet>(null);
  const [selectedFoodBank, setSelectedFoodBank] = useState<
    FoodBank | undefined
  >(undefined);
  const [country, setCountry] = useState<string | undefined>(undefined);

  const goToCoordinates = (latitude: number, longitude: number) => {
    if (ref.current) {
      ref.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  useEffect(() => {
    const getUserLocation = async () => {
      let result = await Location.requestForegroundPermissionsAsync();
      if (result.granted) {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const country = findCountryByCoordinate(
          location.coords.latitude,
          location.coords.longitude
        ).code;
        setCountry(country);

        goToCoordinates(location.coords.latitude, location.coords.longitude);
      }
    };

    getUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={ref}
        style={styles.map}
        showsUserLocation={true}
        showsCompass={true}
        showsScale={true}
        showsMyLocationButton={true}
      >
        <Geojson
          geojson={FoodBanks as GeoJSON.FeatureCollection<GeoJSON.Point>}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
          onPress={(e) => {
            const coordinates = e.coordinates as {
              latitude: number;
              longitude: number;
            };
            goToCoordinates(coordinates.latitude, coordinates.longitude);

            bottomSheet.current?.expand();
            setSelectedFoodBank(e as FoodBank);
          }}
        />
      </MapView>
      <FoodBankSheet
        ref={bottomSheet}
        foodBank={selectedFoodBank}
        onClose={() => setSelectedFoodBank(undefined)}
      />
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
