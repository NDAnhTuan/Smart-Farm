import { config } from "@/config";

let settingItem = [
  {
    id: 0,

    name: "Nhiệt độ",
    value: 2,
  },
  {
    id: 1,
    name: "Độ ẩm",
    value: 3,
  },
];
let id = 2;

export function pushSettingItem({ name, value }) {
  const message = {
    name: name,
    value: value,
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
    if (item.name === name) {
      item.value = value;
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
