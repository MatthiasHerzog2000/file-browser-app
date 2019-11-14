export interface IFile {
  path: string;
  name: string;
  type: string;
  atime: Date;
  mtime: Date;
  size?: number;
  key: string;
  extension?: string;
  children?: Array<IFile>;
  active: boolean;
}
