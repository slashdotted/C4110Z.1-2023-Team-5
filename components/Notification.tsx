import { Alert, Badge, HStack } from "native-base";
import { Swipeable } from "react-native-gesture-handler";
import SwipableDeleteButton from "./SwipeableDeleteButton";
import { Text } from "./Themed";
import { Notification as NotificationType } from "../constants/Types";
import { StyleSheet } from "react-native";

interface NotificationProps {
  onDelete: () => void;
  notification: NotificationType;
}

export default function Notification({
  onDelete,
  notification,
}: NotificationProps) {
  return (
    <Swipeable
      renderRightActions={() => <SwipableDeleteButton onDelete={onDelete} />}
    >
      <Alert style={styles.alert} status={notification.status}>
        <Alert.Icon style={styles.icon} />
        <HStack style={styles.container}>
          <Text darkColor="black" lightColor="black">
            {notification.title}
          </Text>
          <Badge colorScheme={notification.status}>
            {new Date(notification.date).toLocaleDateString()}
          </Badge>
        </HStack>
      </Alert>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  alert: {
    marginVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
});
