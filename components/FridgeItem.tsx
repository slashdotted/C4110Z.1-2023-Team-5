import { FontAwesome } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Text } from "../components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { Item } from "../constants/Types";
import SwipableDeleteButton from "./SwipeableDeleteButton";

type FridgeItemProps = {
  item: Item;
  onPress: () => void;
  onDelete: (item: Item) => void;
};

export default function FridgeItem({
  item,
  onPress,
  onDelete,
}: FridgeItemProps) {
  let style = {
    borderColor: "#B91C1C",
    backgroundColor: "rgba(185, 28, 28, 0.2)",
  };
  let icon = { name: "exclamation", color: "red" };

  if (item.level == 2) {
    style.borderColor = "#FF9900";
    style.backgroundColor = "rgba(255, 153, 0, 0.2)";
    icon.name = "warning";
    icon.color = "#FF9900";
  } else if (item.level == 3) {
    style.borderColor = "#15803D";
    style.backgroundColor = "rgba(21, 128, 61, 0.2)";
    icon.name = "check-square-o";
    icon.color = "#15803D";
  }

  return (
    <Swipeable containerStyle={{marginVertical: 5}}
      renderRightActions={() => (
        <SwipableDeleteButton
          onDelete={() => {
            onDelete(item);
          }}
        />
      )}
    >
      <Pressable onPress={onPress} style={[styles.item, style]}>
        <FontAwesome
          name={icon.name as any}
          size={25}
          color={icon.color}
          style={{ marginRight: 15 }}
        />
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{item.title}</Text>
        <Text style={styles.expDate}>
          {item.expirationDate.toLocaleDateString()}
        </Text>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    width: "70%",
  },
  item: {
    borderWidth: 1,
    padding: 30,
    marginHorizontal: 2,
    flex: 1,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expDate: {
    alignContent: "flex-end",
  },
});
