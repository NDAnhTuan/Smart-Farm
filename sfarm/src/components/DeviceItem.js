import React, { useState } from "react";
import { Text, View, Image, Switch, StyleSheet } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { config, client } from "@/config";

const DeviceItem = ({ device_key, name, status, onStatusChange }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(status);

  const handleSwitchToggle = (e) => {
    let newStatus = isSwitchOn === "1" ? "0" : "1";
    client.publish(`${config.userName}/feeds/${device_key}`, newStatus);
    // onStatusChange(name, newStatus);
    setIsSwitchOn(newStatus);
    // fetch(`https://io.adafruit.com/api/v2/tdttvd/feeds/${device_key}/data`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "X-AIO-Key": config.password,
    //   },
    //   body: JSON.stringify({
    //     value: newStatus,
    //   }),
    // })
    //   .then(() => {
    //     onStatusChange(name, newStatus);
    //     setIsSwitchOn(newStatus);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <View style={styles.deviceItem}>
      <Image
        source={{
          uri: "https://media.istockphoto.com/id/1384267221/vi/vec-to/v%C3%B2i-phun-n%C6%B0%E1%BB%9Bc-t%C6%B0%E1%BB%9Bi-c%E1%BB%8F-h%C3%ACnh-minh-h%E1%BB%8Da-vector.jpg?s=170667a&w=0&k=20&c=9KdZR_6legqnr6glkSiN_9Z0jbwMxZ1knk-w5ov1-LA=",
        }}
        style={styles.imgItem}
      />
      <View style={styles.displayItemText}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={styles.deviceStatus}>{status}</Text>
        {/* <Text style={styles.deviceLocation}>{location}</Text> */}
        <View style={styles.swi_and_sli}>
          <View>
            <Switch
              trackColor={{ false: "#767577", true: "#04dd28" }}
              thumbColor={isSwitchOn ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              // onValueChange={toggleSwitch}
              // value={status === 'Bật' ? true : false}
              value={isSwitchOn !== "0"}
              onValueChange={handleSwitchToggle}
            />
          </View>
          <View style={styles.sli}>
            <Slider
              maximumTrackTintColor="#d3d3d3"
              minimumTrackTintColor="#1fb28a"
              thumbTintColor="#ffffff"
              value={100 / 100}
              onValueChange={(value) => {}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deviceItem: {
    width: 300,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#00aeff",
    marginBottom: 10,
    color: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  imgItem: {
    width: 100,
    height: 100,
  },
  displayItemText: {
    paddingLeft: 10,
    width: 150,
  },
  swi_and_sli: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sli: {
    width: 80,
    color: "white",
  },
  deviceName: {
    fontSize: 18,
  },
  deviceStatus: {
    fontSize: 16,
  },
  deviceLocation: {
    fontSize: 14,
  },
});

export default DeviceItem;
