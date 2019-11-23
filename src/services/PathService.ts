import Axios from "axios";
import { IFile } from "../models/IFile";
import AuthService from "./AuthService";
import { IError } from "../models/IError";
import * as FileSystem from "expo-file-system";
import { CameraRoll } from "react-native";
import { IPreviewOptions } from "../models/IPreviewOptions";
import { decode as atob, encode as btoa } from "base-64";
const SERVER_URL = `http://10.0.0.27:8080/`;
const MICROSERVICE_DOWNLOAD_FILE_URL = `http://10.0.0.27:8082/`;
const MICROSERVICE_GENERATE_PREVIEWS_URL = `http://10.0.0.27:8081/`;

export default class PathService {
  public static getFiles(path: String) {
    return new Promise<IFile | IError>(async (resolve, rejects) => {
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
          .catch(err => resolve(err.response));
      }
    );
  }
  public static downloadFile(
    path: String,
    name: string,
    type: string,
    DownloadProgress: (value: FileSystem.DownloadProgressData) => void
  ) {
    return new Promise((resolve, reject) => {
      Axios.post(
        MICROSERVICE_DOWNLOAD_FILE_URL + "downloadFile",
        { path: path, name: name, type: type, endType: "mobile" },
        {
          headers: { "Content-type": "application/json" }
        }
      )
        .then(async response => {
          const downloadResumable = FileSystem.createDownloadResumable(
            MICROSERVICE_DOWNLOAD_FILE_URL + response.data.outpath,
            FileSystem.documentDirectory + name,
            {
              headers: {
                Authorization: `Bearer ${await AuthService.getToken()}`
              }
            },
            DownloadProgress
          );
          downloadResumable.downloadAsync().then(res => {
            CameraRoll.saveToCameraRoll(res.uri, "photo");
          });
          resolve(true);
        })
        .catch(err => reject(err));
    });
  }
  public static getPreview(outpath: string) {
    return new Promise((resolve, reject) => {
      Axios.get(MICROSERVICE_GENERATE_PREVIEWS_URL + outpath, {
        responseType: "arraybuffer"
      }).then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        resolve(base64);
      });
    });
  }
  public static generatePreview(path: string, options: IPreviewOptions) {
    return new Promise((resolve, reject) => {
      Axios.post(
        MICROSERVICE_GENERATE_PREVIEWS_URL + "generatePreview",
        { path, options },
        { headers: { "Content-type": "application/json" } }
      )
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          if (err.response == undefined) {
            resolve({ success: false, err: err });
          } else {
            resolve(err.response.data);
          }
        });
    });
  }
}
