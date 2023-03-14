import { View, Text, Button, Center, Box, Input, Container } from "native-base";
import { ScannerStackScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import React, { useState } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

export default function AddProductScreen({
  navigation,
}: ScannerStackScreenProps<"AddProduct">) {
  const [value, setValue] = useState<number>(3);

  return (
    <View style={styles.view}>
      <Container size={"lg"} marginX={"auto"} style={styles.container}>
        <AutocompleteDropdown containerStyle={styles.productName} />

        <Slider
          containerStyle={styles.slider}
          value={value}
          onValueChange={() => setValue}
          step={5}
        />
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  productName: {
    width: "100%",
  },
  slider: {
    width: "100%",
  },
  view: {
    backgroundColor: "white",
    flex: 1,
  },
});
