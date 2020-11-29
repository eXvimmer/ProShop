import { Reducer } from "redux";
import {
  IUserState,
  UserActions,
  UserActionTypes,
} from "../types/userTypes";

const initialUserState: IUserState = {
  loading: false,
  userInfo: null,
  error: "",
};

export const userLoginReducer: Reducer<
  IUserState | {},
  UserActions
> = (state = initialUserState, action) => {
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
        userInfo: action.payload,
      };

    case UserActionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UserActionTypes.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};
