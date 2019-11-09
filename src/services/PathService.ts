import Axios from "axios";
import { IFile } from "../models/file";
import AuthService from "./AuthService";

const SERVER_URL = `http://10.0.0.27:8080/`;

export default class PathService {
  public static getFiles(path: String) {
    return new Promise<IFile>(async (resolve, rejects) => {
      Axios.post(
        SERVER_URL + "getDirectory",
        { path: path, initPath: await AuthService.getInitPath() },
        { headers: { "Content-type": "application/json" } }
      )
        .then(data => {
          resolve(data.data.directoryTree);
        })
        .catch(err => resolve(err.response.data));
    });
  }
  public static getInitialPath() {
    return new Promise<{ success: boolean; initPath: string }>(
      (resolve, reject) => {
        Axios.get(SERVER_URL + "getInitialPath")
          .then(data => {
            resolve(data.data);
          })
          .catch(err => resolve(err.response.data));
      }
    );
  }
}
