import { IFile } from "../models/file";
import { Icon } from "native-base";
import React from "react";

export default class IconFinder {
  public static _renderIconType(file: IFile) {
    let jsx: any;
    if (file.extension) {
      switch (file.extension) {
        case ".jpeg":
        case ".jpg":
        case ".svg":
          jsx = (
            <Icon
              style={{ color: "#add8e6" }}
              color="darkGrey"
              type="FontAwesome5"
              name="file-image"
            />
          );
          break;
        case ".pdf":
          jsx = (
            <Icon
              style={{ color: "red" }}
              type="FontAwesome5"
              name="file-pdf"
            />
          );
          break;
        case ".docx":
        case ".doc":
          jsx = (
            <Icon
              style={{ color: "darkBlue" }}
              type="FontAwesome5"
              name="file-word"
            />
          );
          break;
        case ".xlsx":
        case ".xls":
          jsx = (
            <Icon
              style={{ color: "darkGreen" }}
              type="FontAwesome5"
              name="file-excel"
            />
          );
          break;
        case ".js":
          jsx = (
            <Icon color="darkGrey" type="Ionicons" name="logo-javascript" />
          );
          break;
        case ".html":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="html5" />;
          break;
        case ".java":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="java" />;
          break;
        case ".cs":
        case ".c":
        case ".h":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="file-code" />;
          break;
        case ".csv":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="file-csv" />;
          break;
        case ".pptx":
        case ".ppt":
          jsx = (
            <Icon
              style={{ color: "orange" }}
              type="FontAwesome5"
              name="file-powerpoint"
            />
          );
          break;
        case ".zip":
        case ".targz":
        case ".rar":
          jsx = (
            <Icon color="darkGrey" type="FontAwesome5" name="file-archive" />
          );
          break;
        case ".mp3":
        case ".wav":
        case ".wma":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="file-audio" />;
          break;
        case ".avi":
        case ".mp4":
        case ".wmv":
        case ".mpg":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="file-video" />;
          break;
        default:
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="file" />;
          break;
      }
    } else {
      return (
        <Icon
          type="FontAwesome5"
          name="folder"
          style={{ fontSize: 30, width: 30, color: "#9E9E9E" }}
        />
      );
    }
    return jsx;
  }
}
