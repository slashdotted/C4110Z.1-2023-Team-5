import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import React, { useEffect, useMemo, useState } from "react";
import * as Location from "expo-location";
import findCountryByCoordinate from "../utils/findCountryByCoordinate";
import { Text } from "../components/Themed";
import USAFoodBanks from "../components/USAFoodBanks";
import CHEFoodBanks from "../components/CHEFoodBanks";

export default function FoodBanksScreen() {
  const [location, setLocation] = useState<Location.LocationObject | undefined>(
    undefined
  );
  const [country, setCountry] = useState<string | undefined>(undefined);

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
        setLocation(location);
      }
    };

    getUserLocation();
  }, []);

  const countryFoodBanks = useMemo(() => {
    switch (country) {
      case "USA":
        return <USAFoodBanks initialLocation={location} />;
      case "CHE":
        return <CHEFoodBanks />;
      default:
        return (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>
              Your country is currently not supported for this feature.
            </Text>
          </View>
        );
    }
  }, [country, location]);

  return <View style={styles.container}>{countryFoodBanks}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
