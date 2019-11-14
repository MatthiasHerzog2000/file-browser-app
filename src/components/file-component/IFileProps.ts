import { IFile } from "../../models/IFile";

export default interface IFileProps {
  file: IFile;
  markedFiles: IFile[];
  _onPressFolder(file: IFile);
  _onPressFile(file: IFile);
  _onSelectedFile(file: IFile);
  __markFileOrFolder(file: IFile);
}
