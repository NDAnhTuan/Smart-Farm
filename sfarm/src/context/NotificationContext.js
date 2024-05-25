import { config } from "@/config";
import axios from "axios";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    {
      id: 0,
      title: "Thông báo",
      body: "Nhiệt độ ở Nhiệt độ 1 vượt mức cho phép",
      status: "unread",
    },
    {
      id: 1,
      title: "Thông báo",
      body: "Nhiệt độ ở Nhiệt độ 2 vượt mức cho phép",
      status: "read",
    },
  ]);

  const getDate = () => {
    const date = new Date();
    let day = date.getDay();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();

    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let strTime = hours + ":" + minutes + ampm;

    return `${month}-${day}-${year} ${strTime}`;
  };

  const pushNotification = ({ title, body }) => {
    const message = {
      appId: config.appId,
      appToken: config.appToken,
      title: title,
      body: body,
      dateSent: getDate(),
    };

    // TODO: API call to add notification to database
    // axios
    //   .post("http://{IP_ADDRESS}/addNotification", message)
    //   .then(() => {})
    //   .catch((err) => console.log(err));

    axios
      .post("https://app.nativenotify.com/api/notification", message, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        let data = notifications;
        data.unshift({
          id: data.length,
          title: title,
          body: body,
        });
        console.log(data);
        setNotifications(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        pushNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationProvider };
