import React, { FC, Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { IApplicationState } from "../../redux/store/store";
import {
  IOrder,
  IOrderDeliverState,
  IOrderDetailsState,
  IOrderPayState,
  IPaymentResult,
  OrderActionTypes,
} from "../../redux/types/orderTypes";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "./../../redux/actions/orderActions";
import { IUserLoginState } from "../../redux/types/userTypes";

const OrderScreen: FC<RouteComponentProps<{ id: string }>> = ({
  match: {
    params: { id: orderId },
  },
  history,
}) => {
  const [sdkReady, setSdkReady] = useState(false);
  const [clientId, setClientId] = useState("");

  const fakePaymentResult: IPaymentResult = {
    id: Math.random() + orderId,
    intent: "CAPTURE",
    status: "COMPLETED",
    update_time: new Date(),
    payer: {
      email_address: "payPalFakeClient@gmail.com",
    },
    create_time: new Date(),
  };

  const dispatch = useDispatch();

  const orderDetails = useSelector<
    IApplicationState,
    IOrderDetailsState
  >(state => state.orderDetails);

  const { error, loading, order } = orderDetails;

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    state => state.userLogin
  );

  const { userInfo } = userLogin;

  const orderPay = useSelector<IApplicationState, IOrderPayState>(
    state => state.orderPay
  );

  const { success: successPay, loading: loadingPay } = orderPay;

  const orderDeliver = useSelector<
    IApplicationState,
    IOrderDeliverState
  >(state => state.orderDeliver);

  const {
    success: successDeliver,
    loading: loadingDeliver,
  } = orderDeliver;

  if (!loading && order) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const getClientId = async () => {
      const { data: clientId } = await axios.get<string>(
        `/api/config/paypal`
      );
      setClientId(clientId);
    };
    getClientId();
  }, [clientId, history, userInfo]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: OrderActionTypes.ORDER_PAY_RESET });
      dispatch({ type: OrderActionTypes.ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!(window as any).paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    orderId,
    successPay,
    order,
    clientId,
    successDeliver,
  ]);

  const successPaymentHandler = (
    paymentResult: IPaymentResult = fakePaymentResult
  ) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    if (order) {
      dispatch(deliverOrder(order));
    }
  };

  const loadUserDetails = (order: IOrder) => {
    if (order.user) {
      return (
        <div>
          <p>
            <strong>Name: </strong> {order.user.name}
          </p>
          <p>
            <strong>Email: </strong>{" "}
            <a href={`mailto:${order.user.email}`}>
              {order.user.email}
            </a>
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : order ? (
    <Fragment>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              {loadUserDetails(order)}
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt}
                </Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {!order.orderItems.length ? (
                <Message>Order is emptry</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map(
                    ({ image, name, qty, product, price }, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={image}
                              alt={name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${product}`}>
                              {name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {qty} x ${price} = ${qty * price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    $
                    {order.itemsPrice &&
                      order.itemsPrice.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    $
                    {order.shippingPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    $
                    {order.taxPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    $
                    {order.totalPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      onError={() =>
                        successPaymentHandler(fakePaymentResult)
                      }
                      catchError={() =>
                        successPaymentHandler(fakePaymentResult)
                      }
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  ) : null;
};

export default OrderScreen;
