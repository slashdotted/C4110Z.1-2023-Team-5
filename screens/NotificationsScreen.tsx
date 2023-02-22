import { View, Text } from "../components/Themed";
import { ListRenderItem, StyleSheet } from "react-native";
import { Alert, Badge, Center, FlatList, HStack, Pressable } from "native-base";
import { useState } from "react";
import { Swipeable } from "react-native-gesture-handler";

type Notification = {
  id: number;
  title: string;
  status: "error" | "warning" | "info" | "success";
  date: Date;
};

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
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

  const renderNotification: ListRenderItem<Notification> = ({ item }) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => {
          return (
            <Pressable
              px={3}
              onPress={() => {
                setNotifications((prev) =>
                  prev.filter((n) => n.id !== item.id)
                );
              }}
              justifyContent={"center"}
              bg={"red.500"}
              borderRadius={4}
              my={1}
              ml={2}
            >
              <Text lightColor="white" darkColor="white">
                Delete
              </Text>
            </Pressable>
          );
        }}
      >
        <Alert
          my={1}
          status={item.status}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Alert.Icon mr={3} />
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            flex={1}
          >
            <Text>{item.title}</Text>
            <Badge colorScheme={item.status}>
              {item.date.toLocaleDateString()}
            </Badge>
          </HStack>
        </Alert>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
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
});
