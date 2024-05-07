import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import TempImg from "@assets/img/temp.jpg";

const img = Image.resolveAssetSource(TempImg).uri;

const SensorItem = ({ name, status }) => {
  return (
    <View style={[styles.card, styles.shadowProp]}>
      <Image style={styles.img} source={{ uri: img }} />
      <View style={styles.text}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemValue}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "75%",
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
    borderRadius: 8,
    margin: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  text: {
    display: "flex",
    flexDirection: "column",
  },
  itemName: {
    fontSize: 24,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  itemValue: {
    fontSize: 24,
    fontWeight: "500",
  },
});

export default SensorItem;
