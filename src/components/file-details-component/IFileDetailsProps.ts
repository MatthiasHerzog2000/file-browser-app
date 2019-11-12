import { IFile } from "../../models/file";

export default interface IFileDetailsProps {
  fileDetailsModalVisible: boolean;
  selectedFile: IFile;
  setModalVisible(type: string): void;
}
