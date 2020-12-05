import React, { FC, Fragment, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { listOrders } from "../../redux/actions/orderActions";
import { IApplicationState } from "../../redux/store/store";
import { IOrderListState } from "../../redux/types/orderTypes";
import {
  IUserLoginState,
  UserActions,
} from "../../redux/types/userTypes";

const OrderListScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch: ThunkDispatch<
    IApplicationState,
    any,
    UserActions
  > = useDispatch();

  const orderList = useSelector<IApplicationState, IOrderListState>(
    state => state.orderList
  );
  const { loading, error, orders } = orderList;

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    state => state.userLogin
  );
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  return (
    <Fragment>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>
                  {order.createdAt?.toString().substring(0, 10)}
                </td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt?.toString().substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt?.toString().substring(0, 10)
                  ) : (
                    <i
                      className="fas fa-times"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default OrderListScreen;
