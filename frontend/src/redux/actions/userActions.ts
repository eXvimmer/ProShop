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

// TODO: add an action creator for logout. Remove the user from localStorage
