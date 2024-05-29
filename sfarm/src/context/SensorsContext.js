import { createContext, useContext, useEffect, useRef, useState } from "react";

import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from "@/config";
import { NotificationContext } from "@context/NotificationContext";
import { SettingsContext } from "@context/SettingsContext";

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

const SensorsContext = createContext();

const SensorsProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const notificationData = useContext(NotificationContext);
  const { pushNotification } = notificationData;
  const { limit, setLimit, overLimit } = useContext(SettingsContext);
  console.log("limit in sensot context 1", limit);

  const limitRef = useRef(limit);
  limitRef.current = limit;

  useEffect(() => {
    // Fetch Adafruit API to get initial values
    fetch(`https://io.adafruit.com/api/v2/tdttvd/groups/sensors/feeds`)
      .then((response) => response.json())
      .then((json) => {
        let res = [];
        data = json.map((device) => {
          res.push({
            key: device.key,
            name: device.name,
            lower: 0,
            upper: 100,
          });
          return {
            name: device.name,
            status: device.last_value,
            key: device.key,
            topic: `${config.userName}/feeds/${device.key}`,
          };
        });
        setLimit(res);
        console.log(data);
        return data;
      })
      .then((data) => {
        setDevices(data);
        connect(data);
      })
      .catch((e) => console.log(e));
    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
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

    console.log(limit);

    setDevices((prev) =>
      prev.map((device) => {
        if (device.topic === topic) {
          device.status = value;
          console.log(limitRef.current);
          const sensor = limitRef.current.find(
            (s) => s.key === topic.split("/").at(-1)
          );
          console.log(sensor);
          if (topic.includes("temp") && overLimit(value, sensor)) {
            pushNotification({
              title: "Cảnh báo!",
              body: `Nhiệt độ vượt ngưỡng ở thiết bị ${device.name}. Giá trị: ${value}`,
            });
          } else if (topic.includes("humid") && overLimit(value, sensor)) {
            pushNotification({
              title: "Cảnh báo!",
              body: `Độ ẩm vượt ngưỡng ở thiết bị ${device.name}. Giá trị: ${value}`,
            });
          } else if (topic.includes("bright") && overLimit(value, sensor)) {
            pushNotification({
              title: "Cảnh báo!",
              body: `Ánh sáng vượt ngưỡng ở thiết bị ${device.name}. Giá trị: ${value}`,
            });
          } else if (topic.includes("soil") && overLimit(value, sensor)) {
            pushNotification({
              title: "Cảnh báo!",
              body: `Độ ẩm đất vượt ngưỡng ở thiết bị ${device.name}. Giá trị: ${value}`,
            });
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
    <SensorsContext.Provider value={{ devices }}>
      {children}
    </SensorsContext.Provider>
  );
};

export { SensorsContext, SensorsProvider };
