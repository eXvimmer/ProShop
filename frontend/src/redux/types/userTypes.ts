/*
 * TODO
 * Change the duplicate types. like login and register types
 */
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
  USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST",
  USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAIL = "USER_REGISTER_FAIL",
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

export interface IUserRegisterRequest {
  type: UserActionTypes.USER_REGISTER_REQUEST;
}
export interface IUserRegisterSuccess {
  type: UserActionTypes.USER_REGISTER_SUCCESS;
  payload: IUserInfo;
}
export interface IUserRegisterFail {
  type: UserActionTypes.USER_REGISTER_FAIL;
  payload: string;
}

export type UserActions =
  | IUserLoginRequest
  | IUserLoginSuccess
  | IUserLoginFail
  | IUserLogout
  | IUserRegisterRequest
  | IUserRegisterSuccess
  | IUserRegisterFail;

export interface IUserLoginState {
  loading: boolean;
  userInfo: IUserInfo | null;
  error: string;
}

export interface IUserRegisterState {
  loading: boolean;
  userInfo: IUserInfo | null;
  error: string;
}