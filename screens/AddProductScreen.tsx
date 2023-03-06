import { View, Text, Button, Center } from "native-base";
import { ScannerStackScreenProps } from "../types";

export default function AddProductScreen({
  navigation,
}: ScannerStackScreenProps<"AddProduct">) {
  return (
    <View>
      <Center>
        <Text>Add Product Screen</Text>
        <Button onPress={navigation.goBack}>Go back</Button>
      </Center>
    </View>
  );
}
