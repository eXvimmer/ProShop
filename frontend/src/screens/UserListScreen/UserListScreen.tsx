import React, { FC, Fragment, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import {
  deleteUser,
  listUsers,
} from "../../redux/actions/userActions";
import { IApplicationState } from "../../redux/store/store";
import {
  IUserDeleteState,
  IUserListState,
  IUserLoginState,
  UserActions,
} from "../../redux/types/userTypes";

const UserListScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch: ThunkDispatch<
    IApplicationState,
    any,
    UserActions
  > = useDispatch();

  const userList = useSelector<IApplicationState, IUserListState>(
    state => state.userList
  );
  const { loading, error, users } = userList;

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    state => state.userLogin
  );
  const { userInfo } = userLogin;

  const userDelete = useSelector<IApplicationState, IUserDeleteState>(
    state => state.userDelete
  );
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id: string): void => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Fragment>
      <h1>User</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className="fas fa-check"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default UserListScreen;
