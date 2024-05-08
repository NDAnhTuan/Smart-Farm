import { config } from "@/config";

let notifications = [
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
];
let id = 2;

export function pushNotification({ title, body }) {
  const message = {
    appId: config.appId,
    appToken: config.appToken,
    title: title,
    body: body,
    dateSent: "5-8-2024 5:49PM",
  };
  fetch("https://app.nativenotify.com/api/notification", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).catch((err) => {
    console.log(err);
  });
  notifications.push({ id: id, title: title, body: body });
  ++id;
}

export function removeNotification(id) {
  notifications = notifications.filter((noti) => noti.id !== id);
}

export function getNotifications() {
  return notifications;
}
