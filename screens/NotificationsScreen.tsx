import { View, Text } from "../components/Themed";
import { ListRenderItem, StyleSheet } from "react-native";
import { Center, FlatList } from "native-base";
import { useState } from "react";
import { Notification as NotificationType } from "../constants/Types";
import Notification from "../components/Notification";

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: 1,
      title: "Nutella is expired!",
      status: "error",
      date: new Date(),
    },
    {
      id: 2,
      title: "Coca Cola is expiring in one week!",
      status: "warning",
      date: new Date(),
    },
    {
      id: 3,
      title: "Milk is expiring in two days!",
      status: "info",
      date: new Date(),
    },
    {
      id: 4,
      title: "Bread is expiring in three days!",
      status: "success",
      date: new Date(),
    },
  ]);

  const renderNotification: ListRenderItem<NotificationType> = ({ item }) => {
    return (
      <Notification
        notification={item}
        onDelete={() => {
          setNotifications(notifications.filter((n) => n.id !== item.id));
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Center>
            <Text>There are no notifications</Text>
          </Center>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  list: {
    width: "100%",
  },
});
