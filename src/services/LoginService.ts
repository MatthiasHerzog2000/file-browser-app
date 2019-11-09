import axios from "axios";
import IUser from "../models/IUser";
const SERVER_URL = `http://10.0.0.27:8080/login`;
export class LoginService {
  /**
   * login
   */
  public static login(username: string, password: string) {
    return new Promise<{
      success: boolean;
      err?: string;
      token?: string;
      user?: IUser;
    }>((resolve, reject) => {
      const body = {
        username: username,
        password: password
      };
      axios
        .post(SERVER_URL, body, {
          headers: { "Content-type": "application/json" }
        })
        .then(data => {
          resolve(data.data);
        })
        .catch(err => resolve(err.response.data));
    });
  }
}
