import AsyncStorage from "@react-native-community/async-storage";

export class Cache {

  static saveBoolean(value: boolean, key: "SETTING_1") {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static saveString(value: string, key: "SETTING_2") {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static async getBoolean(key: "SETTING_1"): Promise<boolean> {
    return JSON.parse((await AsyncStorage.getItem(key)) || "false");
  }

  static async getString(key: "SETTING_2"): Promise<any> {
    return await AsyncStorage.getItem(key);
  }
}
