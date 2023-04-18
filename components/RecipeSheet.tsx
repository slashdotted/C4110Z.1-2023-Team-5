import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Box, Button, AlertDialog, HStack, VStack } from "native-base";
import { Text, useThemeColor } from "./Themed";
import { FridgeItem, Recipe } from "../constants/Types";
import FullScreenLoader from "./FullScreenLoader";
import generateRecipe from "../utils/generateRecipe";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../storage/store";

interface ItemSheetProps {
  onClose: () => void;
  products: FridgeItem[];
}

export default function RecipeSheet({ onClose, products }: ItemSheetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const cancelRef = React.useRef(null);

  const backgroundColor = useThemeColor(
    { light: "#fff", dark: "#000" },
    "background"
  );

  const { t } = useTranslation();
  const measurementSystem = useSelector(
    (state: RootState) => state.settings.measurementSystem
  );

  useEffect(() => {
    generateRecipe(products, measurementSystem).then((recipe) => {
      if (!recipe) return onClose();
      setRecipe(recipe);
    });
  }, []);

  if (!recipe) return <FullScreenLoader />;

  return (
    <>
      <BottomSheet
        backgroundStyle={{
          backgroundColor,
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
        {recipe && (
          <BottomSheetScrollView style={styles.itemsBox}>
            <Text style={styles.title}>{recipe.title}</Text>

            {recipe.ingredients.map((i, index) => (
              <HStack style={styles.item} key={index}>
                <Text style={styles.quantity}>
                  {i.quantity} {i.unit}
                </Text>
                <Text style={styles.name}>{i.name}</Text>
              </HStack>
            ))}
            {recipe.steps.map((i, index) => (
              <VStack style={styles.steps} key={index}>
                <Text style={styles.stepTitle}>{i.title}</Text>
                <Text style={styles.description}>
                  {i.description.replace(". ", ".\n")}
                </Text>
              </VStack>
            ))}
          </BottomSheetScrollView>
        )}

        <Box style={styles.disclaimerBox}>
          <Button
            colorScheme="danger"
            variant={"outline"}
            size="sm"
            onPress={() => setIsOpen(!isOpen)}
          >
            {t("Disclaimer")}
          </Button>

          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>{t("Disclaimer")}</AlertDialog.Header>
              <AlertDialog.Body>{t("Disclaimer text")}</AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  {t("Close")}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Box>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },
  disclaimerBox: {
    alignItems: "center",
    marginBottom: 30,
  },
  item: {
    marginHorizontal: 30,
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  quantity: {
    width: "40%",
  },
  name: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  itemsBox: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    marginBottom: 40,
  },
  description: {
    marginLeft: 15,
    marginVertical: 10,
  },
  steps: {
    marginTop: 20,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: "lightgray",
    padding: 15,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
