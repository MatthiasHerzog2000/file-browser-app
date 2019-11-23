import { IFile } from "../../models/IFile";
import { IDownloadNotification } from "../../models/IDownloadNotification";

export default interface IHomeState {
  directory: IFile;
  isLoading: boolean;
  searchString: string;
  fabsVisible: boolean;
  fileDetailsModalVisible: boolean;
  selectedFile: IFile;
  markedFiles: IFile[];
  downloads: IDownloadNotification[];
}
