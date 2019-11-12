import { IFile } from "../../models/file";

export default interface IFileProps {
  file: IFile;
  _onPressFolder(path: string);
  _onSelectedFile(file: IFile);
}
