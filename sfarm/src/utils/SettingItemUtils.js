import { config } from "@/config";

let settingItem = [
  {
    id: 0,
    Type: "Thông báo",
    Name: "Nhiệt độ",
    Value: 2,
  },
  {
    id: 1,
    title: "Thông báo",
    Name: "Độ ẩm",
    Value: 3,
  },
];
let id = 2;

export function pushsettingItem({ name, value }) {
  const message = {
    appId: config.appId,
    appToken: config.appToken,
    Name: name,
    Value: value,
  };
//   fetch("https://app.nativenotify.com/api/notification", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   }).catch((err) => {
//     console.log(err);
//   });
settingItem.forEach((item) => {
    if (item.Name === name) {
      item.Value = value;
    }
  }
)
}

export function removeSettingItem(id) {
    settingItem = settingItem.filter((noti) => noti.id !== id);
}

export function getSettingItem() {
  return settingItem;
}
