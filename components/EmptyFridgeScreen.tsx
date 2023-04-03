import { useNavigation } from "@react-navigation/native";
import { Image, VStack, Button } from "native-base";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Text } from "./Themed";

export default function EmptyFridgeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <VStack style={styles.container}>
      <Image
        source={require("../assets/images/empty-fridge.png")}
        alt="Empty Fridge Screen"
        size="2xl"
        style={styles.image}
      />
      <Text
        style={{
          fontSize: 20,
          marginBottom: 20,
        }}
      >
        {t("Looks like it's time to grocery!")}
      </Text>
      <Button
        variant={"outline"}
        colorScheme={"blue"}
        color={"red"}
        onPress={() => {
          navigation.navigate("ScannerNavigator");
        }}
      >
        {t("Add an item!")}
      </Button>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 20,
  },
});
