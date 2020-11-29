import {
  IUserInfo,
  UserActions,
  UserActionTypes,
} from "../types/userTypes";
import axios from "axios";
import { ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { IApplicationState } from "../store/store";

export const login: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, string, UserActions>
> = (email: string, password: string) => async dispatch => {
  try {
    dispatch({
      type: UserActionTypes.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post<IUserInfo>(
      "/api/users/login",
      {
        email,
        password,
      },
      config
    );

    dispatch({
      type: UserActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UserActionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout: ActionCreator<
  ThunkAction<void, IApplicationState, null, UserActions>
> = () => dispatch => {
  localStorage.removeItem("userInfo");
  // REVIEW : should I remove cartItems too?
  dispatch({
    type: UserActionTypes.USER_LOGOUT,
  });
};

export const register: ActionCreator<
  ThunkAction<Promise<void>, IApplicationState, string, UserActions>
> = (
  name: string,
  email: string,
  password: string
) => async dispatch => {
  try {
    dispatch({
      type: UserActionTypes.USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post<IUserInfo>(
      "/api/users",
      {
        name,
        email,
        password,
      },
      config
    );

    dispatch({
      type: UserActionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: UserActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UserActionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
