import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { NotificationContext } from "@context/NotificationContext";
import NotificationItem from "@components/NotificationItem";

const Notifications = () => {
  const notificationData = useContext(NotificationContext);
  const { notifications } = notificationData;
  console.log(notifications);

  return (
    <View style={styles.container}>
      {notifications.map((noti) => (
        <NotificationItem
          key={noti.id}
          id={noti.id}
          title={noti.title}
          body={noti.body}
          status={noti.status}
        />
      ))}
    </View>
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
});

export default Notifications;
