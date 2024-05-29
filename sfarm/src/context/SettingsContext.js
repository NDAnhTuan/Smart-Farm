import { createContext, useEffect, useState } from "react";
import Constants from "expo-constants";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [limit, setLimit] = useState([]);

  const overLimit = (value, sensor) => {
    return value >= sensor.upper || value <= sensor.lower;
  };

  return (
    <SettingsContext.Provider value={{ limit, setLimit, overLimit }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
