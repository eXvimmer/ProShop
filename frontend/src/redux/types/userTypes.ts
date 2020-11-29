export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export enum UserActionTypes {
  USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST",
  USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL = "USER_LOGIN_FAIL",
  USER_LOGOUT = "USER_LOGOUT",
}

export interface IUserLoginRequest {
  type: UserActionTypes.USER_LOGIN_REQUEST;
}

export interface IUserLoginSuccess {
  type: UserActionTypes.USER_LOGIN_SUCCESS;
  payload: IUserInfo;
}

export interface IUserLoginFail {
  type: UserActionTypes.USER_LOGIN_FAIL;
  payload: string;
}

export interface IUserLogout {
  type: UserActionTypes.USER_LOGOUT;
}

export type UserActions =
  | IUserLoginRequest
  | IUserLoginSuccess
  | IUserLoginFail
  | IUserLogout;

export interface IUserState {
  loading: boolean;
  userInfo: IUserInfo | null;
  error: string;
}
