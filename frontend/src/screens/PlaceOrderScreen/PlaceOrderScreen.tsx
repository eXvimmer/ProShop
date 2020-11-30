import React, { FC, Fragment, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import Message from "../../components/Message/Message";
import { IApplicationState } from "../../redux/store/store";
import { ICartState } from "../../redux/types/cartTypes";
import {
  IOrder,
  IOrderState,
  OrderActions,
} from "../../redux/types/orderTypes";
import { createOrder } from "./../../redux/actions/orderActions";

const PlaceOrderScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch: ThunkDispatch<
    IApplicationState,
    IOrder,
    OrderActions
  > = useDispatch();
  const cart = useSelector<IApplicationState, ICartState>(
    state => state.cart
  );

  // ANCHOR: Calculate Prices
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // NOTE: This is fictional price, do it right
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;

  cart.taxPrice = Number(0.15 * cart.itemsPrice);

  cart.totalPrice = Number(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  );

  const orderCreate = useSelector<IApplicationState, IOrderState>(
    state => state.orderCreate
  );

  const { order, success, error } = orderCreate;

  // REVIEW: if you chage the payload of the success type in
  // order action then you should change this line too.
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, order._id, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {!cart.cartItems.length ? (
                <Message>Your cart is emptry</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map(
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
                    {cart.itemsPrice.toLocaleString("en-US", {
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
                    {cart.shippingPrice.toLocaleString("en-US", {
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
                    {cart.taxPrice.toLocaleString("en-US", {
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
                    {cart.totalPrice.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={!cart.cartItems.length}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PlaceOrderScreen;
