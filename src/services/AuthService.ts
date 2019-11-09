import { AsyncStorage } from "react-native";
import IUser from "../models/IUser";

export default class AuthService {
  public static setToken(value: string) {
    AsyncStorage.setItem("token", value);
  }
  public static setUser(value: IUser) {
    AsyncStorage.setItem("user", JSON.stringify(value));
  }
  public static setInitPath(value: string) {
    AsyncStorage.setItem("initPath", value);
  }
  public static setCurrentPath(value: string) {
    AsyncStorage.setItem("currentPath", value);
  }
  static async getToken() {
    return await AsyncStorage.getItem("token");
  }
  static async getInitPath() {
    return await AsyncStorage.getItem("initPath");
  }
  static async getUser() {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
  }
  static async getCurrentPath() {
    return await AsyncStorage.getItem("currentPath");
  }
  static async clear() {
    AsyncStorage.clear();
  }
}
