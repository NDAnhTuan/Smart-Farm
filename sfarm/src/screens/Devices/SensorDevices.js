import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { NotificationContext } from "@context/NotificationContext";
import SensorItem from "@components/SensorItem";
import { SensorsContext } from "@context/SensorsContext";

const SensorDevices = () => {
  const { devices } = useContext(SensorsContext);
  return (
    <>
      <View style={styles.deviceList}>
        {devices.map((device) => (
          <SensorItem
            key={device.key}
            device_key={device.key}
            name={device.name}
            status={device.status}
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

export default SensorDevices;
