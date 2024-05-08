import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { getNotifications, pushNotification } from "@utils/NotificationUtils";
import NotificationItem from "@components/NotificationItem";
import { Button } from "react-native";

const Notifications = () => {
  const [notifications, setNotifications] = useState(getNotifications());
  useEffect(() => {
    setNotifications(getNotifications());
  }, [])
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
