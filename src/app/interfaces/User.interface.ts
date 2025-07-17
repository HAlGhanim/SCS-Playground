export interface User {
  username: string;
  isLoggedin: boolean;
  token: string;
  roles: object;
  authorities: object[];
  groups: string[];
}
