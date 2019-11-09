export interface ILoginState {
  activeUsername: boolean;
  activePassword: boolean;
  password: string;
  username: string;
  usernameError: boolean;
  passwordError: boolean;
  ErrorMsg: string;
  isLoading: boolean;
}
