import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { View, Pressable, Link } from "native-base";
import { Text, useThemeColor } from "./Themed";
import { Linking, StyleSheet, useColorScheme } from "react-native";
import { FoodBank } from "../constants/Types";
import openMap from "react-native-open-maps";
import React from "react";
import { useTranslation } from "react-i18next";

interface FoodBankSheetProps {
  foodBank?: FoodBank;
  onClose: () => void;
}
export default React.forwardRef<BottomSheet, FoodBankSheetProps>(
  (props, ref) => {
    const { t } = useTranslation();
    const colorScheme = useColorScheme();

    return (
      <BottomSheet
        backgroundStyle={{
          backgroundColor: colorScheme == "dark" ? "#000000" : "#ffffff",
          opacity: 0.8,
        }}
        enablePanDownToClose={true}
        ref={ref}
        snapPoints={["25%"]}
        index={-1}
        onClose={props.onClose}
        backdropComponent={(props) => {
          return (
            <BottomSheetBackdrop
              disappearsOnIndex={-1}
              {...props}
              pressBehavior={"close"}
            />
          );
        }}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.title}>
            {props.foodBank?.feature.properties.FullName}
          </Text>
          <Pressable
            onPress={() => {
              openMap({
                latitude: props.foodBank?.coordinates.latitude,
                longitude: props.foodBank?.coordinates.longitude,
                query:
                  props.foodBank?.feature.properties.FullName +
                  " " +
                  props.foodBank?.feature.properties.address1,
              });
            }}
          >
            <Text>{props.foodBank?.feature.properties.address1}</Text>
            <Text>{props.foodBank?.feature.properties.city}</Text>
          </Pressable>
          <Text
            onPress={() => {
              Linking.openURL(
                "tel:+" + props.foodBank?.feature.properties.phone
              ).catch((err) => console.error(t("An error occurred"), err));
            }}
          >
            {props.foodBank?.feature.properties.phone}
          </Text>
          <Link href={"https://" + props.foodBank?.feature.properties.url}>
            <Text>{props.foodBank?.feature.properties.url}</Text>
          </Link>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheet: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
