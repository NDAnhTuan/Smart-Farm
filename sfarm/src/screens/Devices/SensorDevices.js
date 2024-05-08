import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SensorItem from "@components/SensorItem";
import { config } from "@/config";
import { pushNotification } from "@utils/NotificationUtils";

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

const SensorDevices = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Fetch Adafruit API to get initial values
    fetch(`https://io.adafruit.com/api/v2/tdttvd/groups/sensors/feeds`)
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
        setDevices(data);
        connect(data);
      })
      .catch((e) => console.log(e));
    return () => client.disconnect();
  }, []);


  const subscribeList = (deviceList) => {
    // console.log("Subcribing...");
    deviceList.forEach((device) => {
      client.subscribe(device.topic, { qos: 0 });
      console.log("Subscribed to " + device.topic);
    });
    // console.log("Subcribed");
  };

  const onMessageArrived = (message) => {
    const topic = message.destinationName;
    const value = message.payloadString;
    console.log("Message arrived");
    console.log("Topic: " + topic);
    console.log("Value: " + value);

    setDevices((prev) =>
      prev.map((device) => {
        if (device.topic === topic) {
          device.status = value;
          if (topic.includes('temp') && value > 20) {
            pushNotification({title: "Cảnh báo!", body: `Nhiệt độ vượt ngưỡng ở thiết bị ${device.name}. Giá trị: ${value}`})
          } else if (topic.includes('humid') && value > 20) {
            pushNotification({title: "Cảnh báo!", body: `Độ ẩm vượt ngưỡng ở thiết bị ${device.name}. Giá trị: ${value}`})
          } else if (topic.includes('bright') && value > 20) {
            pushNotification({title: "Cảnh báo!", body: `Ánh sáng vượt ngưỡng ở thiết bị ${device.name}. Giá trị: ${value}`})
          }
        }
        return device;
      })
    );
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
    client.onMessageArrived = onMessageArrived;

    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("Connection lost: " + responseObject.errorMessage);
      }
    };
  };

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
