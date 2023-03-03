import { StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Center, Image, HStack, Box, Button, View } from "native-base";
import { SvgUri } from "react-native-svg";
import { Text } from "./Themed";
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types/product";

interface ItemSheetProps {
  onClose: () => void;
  product: Product;
}

interface ProductInfo extends Product {
  nova_group: number;
  ecoscore_grade: string;
  nutriscore_grade: string;
}

export default function ItemSheet({ onClose, product }: ItemSheetProps) {
  let item = product as ProductInfo;

  return (
    <>
      <BottomSheet
        backgroundStyle={{
          backgroundColor: "rgb(240,240,240)",
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
          <Text style={styles.title}>{item.product_name}</Text>
        </Center>
        <Center
          backgroundColor={"white"}
          borderRadius={20}
          maxHeight={180}
          padding={5}
        >
          <Image
            src={item.image_url}
            alt={item.product_name}
            resizeMode={"contain"}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </Center>

        <HStack justifyContent={"space-between"} my={3}>
          <SvgUri
            width={100}
            height={60}
            viewBox="0 0 240 130"
            uri={`https://static.openfoodfacts.org/images/attributes/nutriscore-${
              item.nutriscore_grade || "unknown"
            }.svg`}
          />

          <SvgUri
            width={100}
            height={60}
            viewBox="0 0 240 130"
            uri={`https://static.openfoodfacts.org/images/attributes/ecoscore-${
              item.ecoscore_grade || "unknown"
            }.svg`}
          />

          <SvgUri
            width={100}
            height={60}
            viewBox="0 0 68 130"
            uri={`https://static.openfoodfacts.org/images/attributes/nova-group-${
              item.nova_group || "unknown"
            }.svg`}
          />
        </HStack>

        <Text style={styles.title}>Ingredients</Text>
        <Box
          my={2}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            marginBottom: 100,
          }}
          backgroundColor={"white"}
        >
          <BottomSheetFlatList
            data={item.ingredients}
            renderItem={({ item }) => (
              <Text style={styles.ingredient}>{item.text}</Text>
            )}
            keyExtractor={(item) => item.text || ""}
            ListFooterComponent={<View />}
          />
        </Box>
      </BottomSheet>
      <Center
        style={{
          position: "absolute",
          paddingBottom: 20,
          paddingTop: 6,
          bottom: 0,
          backgroundColor: "rgb(240,240,240)",
          width: "100%",
        }}
      >
        <Button>Add to fridge</Button>
      </Center>
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
