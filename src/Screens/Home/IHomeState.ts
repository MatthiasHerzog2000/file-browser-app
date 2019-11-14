import { IFile } from "../../models/IFile";

export default interface IHomeState {
  directory: IFile;
  isLoading: boolean;
  searchString: string;
  fabsVisible: boolean;
  fileDetailsModalVisible: boolean;
  selectedFile: IFile;
  markedFiles: IFile[];
}
