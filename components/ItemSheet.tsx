import { StyleSheet, useColorScheme } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import {
  Center,
  Image,
  HStack,
  Box,
  Button,
  View,
  useColorModeValue,
} from "native-base";
import { Text, useThemeColor } from "./Themed";
import { Product } from "../constants/Types";
import {
  getEcoScoreImage,
  getNovaGroupImage,
  getNutriscoreImage,
} from "../utils/scoreImages";
import { useTranslation } from "react-i18next";

interface ItemSheetProps {
  onClose: () => void;
  product: Product;
  onAddItem?: (product: Product) => void;
  onContinue?: () => void;
  onDeleteItem?: (item: Product) => void;
}

export default function ItemSheet({
  onClose,
  product,
  onAddItem,
  onContinue,
  onDeleteItem,
}: ItemSheetProps) {
  const backgroundColor = useThemeColor(
    { light: "#fff", dark: "#333" },
    "background"
  );

  const { t } = useTranslation();

  const ingredients = [
    ...new Set(product.ingredients_text.split(",").map((i) => i.trim())),
  ];

  return (
    <>
      <BottomSheet
        backgroundStyle={{
          backgroundColor,
          opacity: 0.8,
        }}
        backdropComponent={(props) => {
          return (
            <BottomSheetBackdrop
              disappearsOnIndex={-1}
              {...props}
              pressBehavior={"close"}
            />
          );
        }}
        enablePanDownToClose={true}
        snapPoints={["65%", "99%"]}
        index={0}
        onClose={onClose}
        style={{
          padding: 20,
        }}
      >
        <Center mb={2}>
          <Text style={styles.title}>{product.product_name}</Text>
        </Center>
        <Center
          backgroundColor={backgroundColor}
          borderRadius={20}
          maxHeight={180}
          padding={5}
        >
          <Image
            src={product.image_url}
            alt={product.product_name}
            resizeMode={"contain"}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </Center>

        <HStack justifyContent={"space-between"} my={3}>
          <Box width={100} height={100}>
            {getNutriscoreImage(product.nutriscore_grade)}
          </Box>
          <Box width={100} height={100}>
            {getEcoScoreImage(product.ecoscore_grade)}
          </Box>
          <Box width={100} height={100}>
            {getNovaGroupImage(product.nova_group)}
          </Box>
        </HStack>

        <Text style={styles.title}>{t("Ingredients")}</Text>
        <Box
          my={2}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            marginBottom: 100,
          }}
          backgroundColor={backgroundColor}
        >
          <BottomSheetFlatList
            data={ingredients}
            renderItem={({ item }) => (
              <Text style={styles.ingredient}>{item}</Text>
            )}
            keyExtractor={(item) => item}
            ListFooterComponent={<View />}
          />
        </Box>

        {onDeleteItem && (
          <HStack
            style={{
              position: "absolute",
              justifyContent: "space-around",
              paddingBottom: 40,
              paddingTop: 6,
              bottom: 0,
              backgroundColor: "rgb(240,240,240)",
              width: "100%",
            }}
          >
            <Button
              variant={"outline"}
              colorScheme={"red"}
              color={"red"}
              onPress={() => {
                if (onDeleteItem) {
                  onDeleteItem(product);
                }
              }}
            >
              {t("Delete from fridge")}
            </Button>
          </HStack>
        )}
      </BottomSheet>
      {onAddItem && onContinue && (
        <HStack
          style={{
            position: "absolute",
            justifyContent: "space-around",
            paddingBottom: 6,
            paddingTop: 6,
            bottom: 0,
            backgroundColor,
            width: "100%",
          }}
        >
          <Button variant={"outline"} colorScheme={"blue"} onPress={onContinue}>
            {t("Continue")}
          </Button>
        </HStack>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  ingredient: {
    fontSize: 18,
    marginVertical: 2,
  },
});
