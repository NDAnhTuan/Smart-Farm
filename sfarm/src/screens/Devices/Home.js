import { View, Text, StyleSheet, Pressable, Switch } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, styles.onoff]}
        onPress={() => navigation.navigate("OnOffDevices")}
      >
        <Text style={styles.text}>Thiết bị bật tắt</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.sensor]}
        onPress={() => navigation.navigate("SensorDevices")}
      >
        <Text style={styles.text}>Thiết bị cảm biến</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  button: {
    height: "30%",
    width: "70%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    color: "red",
  },
  text: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },
  onoff: {
    backgroundColor: "red",
  },
  sensor: {
    backgroundColor: "blue",
  },
});

export default Home;
