import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useContext, useState } from "react";
import { NotificationContext } from "@context/NotificationContext";
import NotificationItem from "@components/NotificationItem";

const Notifications = () => {
  const notificationData = useContext(NotificationContext);
  const { notifications } = notificationData;
  console.log(notifications);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {notifications.length !== 0 ? (
        notifications.map((noti) => (
          <NotificationItem
            key={noti.id}
            id={noti.id}
            title={noti.title}
            body={noti.body}
            status={noti.status}
          />
        ))
      ) : (
        <View style={styles.nah}>
          <Text>Hiện chưa có thông báo nào</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 8,
  },
  nah: {
    textAlign: "center",
  },
});

export default Notifications;
