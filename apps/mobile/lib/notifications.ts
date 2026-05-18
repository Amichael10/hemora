import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";

// Configure default notification handler behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldBadge: true,
  }),
});

function parseTimeString(timeStr: string) {
  const [time, modifier] = timeStr.split(" ");
  let [hoursStr, minutesStr] = time.split(":");
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (modifier === "PM" && hours < 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }
  return { hours, minutes };
}

export async function scheduleHydrationReminders(reminders: Record<string, boolean>) {
  try {
    // 1. Cancel all existing hydration alarms first to avoid duplicate notifications
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    for (const n of scheduled) {
      if (n.identifier.startsWith("hydration-alarm-")) {
        await Notifications.cancelScheduledNotificationAsync(n.identifier);
      }
    }

    // 2. Schedule active ones
    for (const [timeStr, enabled] of Object.entries(reminders)) {
      if (!enabled) continue;

      const { hours, minutes } = parseTimeString(timeStr);
      const identifier = `hydration-alarm-${timeStr.replace(/[^a-zA-Z0-9]/g, "")}`;

      await Notifications.scheduleNotificationAsync({
        identifier,
        content: {
          title: "💧 Time to Hydrate!",
          body: "Drinking water keeps red blood cells flexible and helps prevent sickle cell crises. Tap to log a glass now!",
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          data: {
            url: "/hydration",
            action: "drink_glass"
          }
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: hours,
          minute: minutes,
        },
      });
      console.log(`Successfully scheduled hydration alarm for ${timeStr} at ${hours}:${minutes}`);
    }
  } catch (e) {
    console.warn("Failed to schedule local hydration alarms:", e);
  }
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
    
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // @ts-ignore
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      console.log("No Project ID found for push notifications");
      return;
    }

    try {
      token = (await Notifications.getExpoPushTokenAsync({
        projectId,
      })).data;
      console.log("Expo Push Token:", token);
    } catch (e) {
      console.log("Error getting push token:", e);
    }
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  return token;
}

