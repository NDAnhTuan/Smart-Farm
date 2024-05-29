import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import {TempImg, HumidImg, BrightImg, SoilImg} from "@assets/img/index";

const tempImg = Image.resolveAssetSource(TempImg).uri;
const humidImg = Image.resolveAssetSource(HumidImg).uri;
const brightImg = Image.resolveAssetSource(BrightImg).uri;
const soilImg = Image.resolveAssetSource(SoilImg).uri;

const SensorItem = ({ device_key, name, status }) => {
  const typ = device_key.split('.')[1][0];
  switch (typ) {
    case 't':
      img = tempImg;
      break;
    case 'h':
      img = humidImg;
      break;
    case 'b':
      img = brightImg;
      break;
    default:
      img = soilImg;
      break;
  }
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
    width: "80%",
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
