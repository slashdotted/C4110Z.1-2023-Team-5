import { FontAwesome } from "@expo/vector-icons";
import { Text, useThemeColor } from "./Themed";
import { Pressable, StyleSheet } from "react-native";
import { FridgeItem } from "../constants/Types";
import expirationLevel from "../utils/expirationLevel";
import { VStack, Image } from "native-base";

type FridgeItemProps = {
  item: FridgeItem;
  onPress: (item: FridgeItem) => void;
  onLongPress: (item: FridgeItem) => void;
  onDelete: (item: FridgeItem) => void;
  selected: boolean;
};

export default function FridgeListItem({
  item,
  onPress,
  onLongPress,
  onDelete,
  selected,
}: FridgeItemProps) {
  const backgroundColor = useThemeColor(
    { light: "#fff", dark: "#111" },
    "background"
  );

  let style = {
    borderColor: "rgba(185,28,28,0.4)",
  };
  let icon = { name: "exclamation", color: "red" };

  var level = expirationLevel(item);

  if (level == 2) {
    style.borderColor = "rgba(255,153,0,0.4)";
    icon.name = "warning";
    icon.color = "#FF9900";
  } else if (level == 3) {
    style.borderColor = "rgba(21,128,61,0.4)";
    icon.name = "check-square-o";
    icon.color = "#15803D";
  }

  return (
    <Pressable
      onPress={() => {
        onPress(item);
      }}
      onLongPress={() => {
        onLongPress(item);
      }}
      style={[
        styles.item,
        style,
        selected && { opacity: 0.5 },
        { backgroundColor },
      ]}
    >
      <VStack space={1.5} alignItems="center">
        <Image
          source={{
            uri: item.product.image_url,
          }}
          alt={`${item.product.product_name}'s image`}
          size={"xl"}
          resizeMode="contain"
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
          {item.product.product_name}
        </Text>

        <Text style={styles.expDate}>
          <FontAwesome name={icon.name as any} color={icon.color} />

          {"  " + new Date(item.expirationDate).toLocaleDateString()}
        </Text>
      </VStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  item: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    justifyContent: "space-between",
    flex: 1,
    margin: 5,
  },
  expDate: {
    alignContent: "flex-end",
    marginBottom: 10,
  },
});
