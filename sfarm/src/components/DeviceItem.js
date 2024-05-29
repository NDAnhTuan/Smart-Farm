import React, { useState } from "react";
import { Text, View, Image, Switch, StyleSheet } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { config } from "@/config";

const DeviceItem = ({ device_key, name, status, onStatusChange, client }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(status);
  let urlimg = ""; 
  const checkDeviceKey = (device_key) => {
    if (device_key === "fan") {
      return (<Slider
        maximumTrackTintColor="#d3d3d3"
        minimumTrackTintColor="#1fb28a"
        thumbTintColor="#ffffff"
        value={parseInt(status)}
        minimumValue={0}
        maximumValue={3}
        step={1}

        onSlidingComplete={handleStatusChange}
      />);
    }
    else {
      return (<View></View>)
    }
  }
  if (device_key === "fan") {
    urlimg = "https://media.istockphoto.com/id/1389425030/vi/vec-to/b%C3%A0n-qu%E1%BA%A1t-%C4%91i%E1%BB%87n-vector-c%C3%A1ch-ly-minh-h%E1%BB%8Da.jpg?s=170667a&w=0&k=20&c=S-h_B0lwH8G7EV9L_4CfGVTbVbPtro3dUhZEeA8cvRY="
  }
  else if (device_key === "hose") {
    urlimg = "https://media.istockphoto.com/id/1384267221/vi/vec-to/v%C3%B2i-phun-n%C6%B0%E1%BB%9Bc-t%C6%B0%E1%BB%9Bi-c%E1%BB%8F-h%C3%ACnh-minh-h%E1%BB%8Da-vector.jpg?s=170667a&w=0&k=20&c=9KdZR_6legqnr6glkSiN_9Z0jbwMxZ1knk-w5ov1-LA="
  }
  else {
    urlimg =  "https://media.istockphoto.com/id/1216943362/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-vector-b%C3%B3ng-%C4%91%C3%A8n-b%C3%B3ng-%C4%91%C3%A8n-v%C3%A0ng-l%C3%A0-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-c%E1%BB%A7a-s%E1%BB%B1-s%C3%A1ng-t%E1%BA%A1o-v%C3%A0-%C4%91%E1%BB%95i-m%E1%BB%9Bi-c%C3%B4-l%E1%BA%ADp.jpg?s=612x612&w=0&k=20&c=AO3KMiuDrQ3sDZxEEpojwzw0kdCNsZIUpcDDAoK3Q_g="
  }
  const handleSwitchToggle = (e) => {
    let newStatus = status === "0" ? "1" : "0";
    if (device_key === "fan") {
      newStatus = status === "0" ? "1" : "0";
    }
    client.publish(`${config.userName}/feeds/${device_key}`, newStatus);
    setIsSwitchOn(newStatus);
  };
  const handleStatusChange = (value) => {
    client.publish(`${config.userName}/feeds/${device_key}`, `${value[0]}`);

    setIsSwitchOn(`${value[0]}`)
  };

  return (
    <View style={[styles.deviceItem, styles.shadowProp]}>
      <Image
        source={{
          uri: urlimg,
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
              thumbColor={status ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              // onValueChange={toggleSwitch}
              // value={status === 'Bật' ? true : false}
              value={status !== "0"}
              onValueChange={handleSwitchToggle}
            />
          </View>
          <View style={styles.sli}>
            {checkDeviceKey(device_key)}
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
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default DeviceItem;
