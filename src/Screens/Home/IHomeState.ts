import { IFile } from "../../models/file";

export default interface IHomeState {
  directory: IFile;
  isLoading: boolean;
  searchString: string;
  fabsVisible: boolean;
}
