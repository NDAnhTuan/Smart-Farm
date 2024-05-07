import init from "react_native_mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const config = {
    userName: "tdttvd",
    password: "aio_shmi853gtJe24SOO5mLVKYhKVwoL"
}
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
export const client = new Paho.MQTT.Client(
    options.host,
    options.port,
    options.path,
    options.id
  );
  