import { ActionSheet } from "native-base";
import {
  MORE_INFORMATION_OPTION,
  MOVE_OPTION,
  RENAME_OPTION,
  ACTIONSHEET_TITLE,
  DELETE_OPTION,
  DOWNLOAD_OPTION
} from "./staticStrings";
var BUTTONS = [
  { text: MORE_INFORMATION_OPTION, icon: "eye", iconColor: "#9E9E9E" },
  { text: MOVE_OPTION, icon: "move", iconColor: "#9E9E9E" },
  { text: RENAME_OPTION, icon: "create", iconColor: "#9E9E9E" },
  { text: DOWNLOAD_OPTION, icon: "download", iconColor: "#9E9E9E" },
  { text: DELETE_OPTION, icon: "trash", iconColor: "red" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export class FileOptions {
  public static show() {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: ACTIONSHEET_TITLE
      },
      buttonIndex => {
        console.log(buttonIndex);
      }
    );
  }
}
