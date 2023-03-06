import { View, Text } from "../components/Themed";
import { ListRenderItem, StyleSheet } from "react-native";
import { Center, FlatList } from "native-base";
import { Notification as NotificationType } from "../constants/Types";
import Notification from "../components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../storage/store";
import { deleteNotification } from "../storage/reducers/notificatonsReducer";

export default function NotificationScreen() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const renderNotification: ListRenderItem<NotificationType> = ({ item }) => {
    return (
      <Notification
        notification={item}
        onDelete={() => {
          dispatch(deleteNotification(item.id));
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
