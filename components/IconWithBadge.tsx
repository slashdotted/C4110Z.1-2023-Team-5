import { FontAwesome } from "@expo/vector-icons";
import { VStack, Badge } from "native-base";
import { Pressable, StyleSheet } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

interface IconWithBadgeProps {
  onPress: () => void;
  count: number;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
}

export default function IconWithBadge({
  onPress,
  count,
  icon,
}: IconWithBadgeProps) {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <VStack>
        {count > 0 && (
          <Badge
            colorScheme={"info"}
            rounded={"full"}
            variant="solid"
            style={styles.badge}
          >
            {count}
          </Badge>
        )}
        <FontAwesome
          name={icon}
          size={24}
          color={Colors[colorScheme].text}
          style={{ marginRight: 15 }}
        />
      </VStack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-end",
    marginRight: 5,
    marginBottom: -10,
    zIndex: 1,
    fontSize: 11,
  },
});
