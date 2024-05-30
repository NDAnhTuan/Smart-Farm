import { createContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [limit, setLimit] = useState([]);

  const overLimit = (value, sensor) => {
    return value >= sensor.upper || value <= sensor.lower;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/device/sensor")
      .then((res) =>
        setLimit(
          res.data.map((item) => ({
            key: item.key_sensor,
            lower: item.lowerAlert,
            upper: item.upperAlert,
          }))
        )
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <SettingsContext.Provider value={{ limit, setLimit, overLimit }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
