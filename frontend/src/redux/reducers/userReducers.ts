import { Reducer } from "redux";
import {
  IUserLoginState,
  IUserRegisterState,
  UserActions,
  UserActionTypes,
} from "../types/userTypes";

const initialUserLoginState: IUserLoginState = {
  loading: false,
  userInfo: null,
  error: "",
};

export const userLoginReducer: Reducer<
  IUserLoginState,
  UserActions
> = (state = initialUserLoginState, action) => {
  switch (action.type) {
    case UserActionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        userInfo: action.payload,
      };

    case UserActionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UserActionTypes.USER_LOGOUT:
      return {
        loading: false,
        error: "",
        userInfo: null,
      };

    default:
      return state;
  }
};

const initialUserRegisterState: IUserRegisterState = {
  loading: false,
  error: "",
  userInfo: null,
};

export const userRegisterReducer: Reducer<
  IUserRegisterState,
  UserActions
> = (state = initialUserRegisterState, action) => {
  switch (action.type) {
    case UserActionTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        userInfo: action.payload,
      };

    case UserActionTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
