import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import DeviceItem from "@components/DeviceItem";
import { DevicesContext } from "@context/DevicesContext";

const OnOffDevices = () => {
  const { devices, client } = useContext(DevicesContext);
  return (
    <>
      <View style={styles.deviceList}>
        {devices.map((device) => (
          <DeviceItem
            key={device.key}
            device_key={device.key}
            name={device.name}
            status={device.status}
            client={client}
            
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  deviceList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingTop: 10,
  },
});

export default OnOffDevices;
