import React, { useState, useEffect, Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import DeviceItem from "@components/DeviceItem";

import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {config} from "@/config";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const options = {
  host: "io.adafruit.com",
  port: 443,
  path: "",
  id: "id_" + parseInt(Math.random() * 100000),
};

// Setup client
const client = new Paho.MQTT.Client(
  options.host,
  options.port,
  options.path,
  options.id
);

const OnOffDevices = () => {
  const [devices, setDevices] = useState([]);

  const handleStatusChange = (deviceName, newStatus) => {
    let key;
    const updatedDeviceList = devices.map(device => {
      if (device.name === deviceName) {
        key = device.key;
        return {...device, status: newStatus};
      }
      return device;
    });
    setDevices(updatedDeviceList);
    fetch(`https://io.adafruit.com/api/v2/tdttvd/feeds/${key}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AIO-Key": "key",
      },
      body: JSON.stringify({
        value: newStatus,
      }),
    })
      .then(() => {
        console.log(key)
        console.log("updated status successful");
        
        
      })
      .catch((err) => console.log(err));
  };

  const subscribeList = (deviceList) => {
    // console.log("Subcribing...");
    deviceList.forEach((device) => {
      client.subscribe(device.topic, { qos: 0 });
      console.log("Subscribed to " + device.topic);
    });
    // console.log("Subcribed");
  };

  

  const connect = (devices) => {
    // Connect to Adafruit through MQTT protocol
    client.connect({
      onSuccess: () => {
        console.log("Connected");
        subscribeList(devices);
      },
      useSSL: true,
      timeout: 3,
      onFailure: (err) => {
        console.log("Connect failed!");
        console.log(err);
      },
      userName: config.userName,
      password: config.password,
    });
    // Some support callbacks
    client.onMessageArrived = (message) => {
      console.log("Message arrived");
      console.log("Topic: " + message.destinationName);
      console.log("Value: " + message.payloadString);

      const substrings = message.destinationName.split("/")[2];
      const updatedDeviceList = devices.map(device => {
        if (device.name === substrings) {
          return {...device, status: message.payloadString};
        }
        return device;
      });
      setDevices(updatedDeviceList);
      
      console.log("Substrings: " + substrings);
      setDevices(prev => prev.map(device => {
        if (device.topic === message.destinationName) {
          device.status = message.payloadString
        }
        return device;
      }))
    };

    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("Connection lost: " + responseObject.errorMessage);
      }
    };
  };

  useEffect(() => {
    // Fetch Adafruit API to get initial values
    fetch("https://io.adafruit.com/api/v2/tdttvd/feeds")
      .then((response) => response.json())
      .then((json) => {
        data = json.map((device) => {
          return {
            name: device.name,
            status: device.last_value,
            key: device.key,
            topic: `${config.userName}/feeds/${device.key}`,
          };
        });
        console.log(data);
        return data;
      })
      .then((data) => {
        connect(data);
        setDevices(data);
      })
      .catch((e) => console.log(e));
    return () => client.disconnect();
  }, []);

  return (
    <View style={styles.deviceList}>
      {devices.map((device) => (
        <DeviceItem
          key={device.key}
          device_key={device.key}
          name={device.name}
          status={device.status}
          onStatusChange={handleStatusChange}
         
/>
      ))}
    </View>
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