import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, styles.shadowProp]}
        onPress={() => navigation.navigate("OnOffDevices")}
      >
        <Text style={styles.text}>Điều khiển thiết bị</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.shadowProp]}
        onPress={() => navigation.navigate("SensorDevices")}
      >
        <Text style={styles.text}>Thông tin cảm biến</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#EEE",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 32,
    marginVertical: "auto",
    height: "100%",
  },
  button: {
    height: "30%",
    width: "70%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "white",
  },
  text: {
    color: "black",
    fontWeight: "500",
    fontSize: 18,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default Home;
