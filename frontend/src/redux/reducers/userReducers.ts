// TODO: Do something about repeated codes
import { Reducer } from "redux";
import {
  IUserDeleteState,
  IUserDetailsState,
  IUserListState,
  IUserLoginState,
  IUserRegisterState,
  IUserUpdateProfileState,
  IUserUpdateState,
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

const initialUserDetailsState: IUserDetailsState = {
  user: null,
  loading: false,
  error: "",
};

export const userDetailsReducer: Reducer<
  IUserDetailsState,
  UserActions
> = (state = initialUserDetailsState, action) => {
  switch (action.type) {
    case UserActionTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case UserActionTypes.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UserActionTypes.USER_DETAILS_RESET:
      return {
        ...state,
        loading: false,
        error: "",
        user: null,
      };

    default:
      return state;
  }
};

const initialUserUpdateProfileState: IUserUpdateProfileState = {
  userInfo: null,
  loading: false,
  error: "",
  success: false,
};

export const userUpdateProfileReducer: Reducer<
  IUserUpdateProfileState,
  UserActions
> = (state = initialUserUpdateProfileState, action) => {
  switch (action.type) {
    case UserActionTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: "",
      };

    case UserActionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        userInfo: action.payload,
        success: true,
      };

    case UserActionTypes.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

const initialUserListState: IUserListState = {
  users: [],
  loading: false,
  error: "",
};

export const userListReducer: Reducer<IUserListState, UserActions> = (
  state = initialUserListState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case UserActionTypes.USER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UserActionTypes.USER_LIST_RESET:
      return {
        loading: false,
        error: "",
        users: [],
      };

    default:
      return state;
  }
};

const initialUserDeleteState: IUserDeleteState = {
  loading: false,
  error: "",
  success: false,
};

export const userDeleteReducer: Reducer<
  IUserDeleteState,
  UserActions
> = (state = initialUserDeleteState, action) => {
  switch (action.type) {
    case UserActionTypes.USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case UserActionTypes.USER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialUserUPdateState: IUserUpdateState = {
  loading: false,
  error: "",
  user: null,
  success: false,
};

export const userUpdateReducer: Reducer<
  IUserUpdateState,
  UserActions
> = (state = initialUserUPdateState, action) => {
  switch (action.type) {
    case UserActionTypes.USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case UserActionTypes.USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UserActionTypes.USER_UPDATE_RESET:
      return {
        ...state,
        success: false,
        user: null,
      };

    default:
      return state;
  }
};
