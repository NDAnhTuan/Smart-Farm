import { createContext, useState } from "react";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [limit, setLimit] = useState({
    temp: 20,
    humid: 10,
    bright: 30,
  });

  return (
    <SettingsContext.Provider value={{ limit, setLimit }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
