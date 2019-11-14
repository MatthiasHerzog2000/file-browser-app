import { IFile } from "../../models/IFile";

export default interface IFileDetailsProps {
  fileDetailsModalVisible: boolean;
  selectedFile: IFile;
  setModalVisible(type: string): void;
}
