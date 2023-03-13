import { StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Geojson } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import { FoodBank } from "../constants/Types";
import FoodBankSheet from "../components/FoodBankSheet";
import * as FoodBanks from "../assets/foodbanks.json";
import * as Location from "expo-location";

interface USAFoodBanksProps {
  initialLocation?: Location.LocationObject;
}

export default function USAFoodBanks({ initialLocation }: USAFoodBanksProps) {
  const ref = useRef<MapView>(null);

  const bottomSheet = useRef<BottomSheet>(null);
  const [selectedFoodBank, setSelectedFoodBank] = useState<
    FoodBank | undefined
  >(undefined);

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
    if (initialLocation) {
      goToCoordinates(
        initialLocation.coords.latitude,
        initialLocation.coords.longitude
      );
    }
  }, [initialLocation]);

  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
