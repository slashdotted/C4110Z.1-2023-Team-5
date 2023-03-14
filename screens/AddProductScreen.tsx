import { View, Text, Button, Center, Box, Input } from "native-base";
import { ScannerStackScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import React, { useState } from "react";

export default function AddProductScreen({
    navigation,
}: ScannerStackScreenProps<"AddProduct">) {
  const [value, setValue] = useState<number>(3); 

    return (
        <View style={styles.view}>
            <Center>
                <Text>Add Product Screen</Text>
                <Box alignItems="center" style={styles.form}>
                    <Input placeholder="Product Name" variant="filled" />
                    <Text marginTop={5}>TODO: Add Image</Text>

                    <Slider
                        value={value}
                        onValueChange={() => setValue}
                        step={5}
                    />
                </Box>
                <Button onPress={navigation.goBack}>Go back</Button>
            </Center>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginVertical: 30,
        marginHorizontal: 40,
    },
    view: {
        backgroundColor: "white",
        flex: 1,
    },
});
