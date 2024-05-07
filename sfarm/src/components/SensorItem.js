import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SensorItem = ({ name, status }) => {
  return (
    <View style={styles.sensorItem}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemValue}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sensorItem: {
    width: "75%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#00aeff",
    margin: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  itemValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  }
});

export default SensorItem;
