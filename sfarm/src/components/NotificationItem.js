import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native";

const NotificationItem = ({ id, title, body, status }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Button title="Đánh dấu đã xem"/>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    backgroundColor: "white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  body: {

  }
});

export default NotificationItem;
