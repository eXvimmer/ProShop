import React, { FC, useEffect } from "react";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import Message from "../../components/Message/Message";
import {
  addToCart,
  removeFromCart,
} from "../../redux/actions/cartActions";
import { IApplicationState } from "../../redux/store/store";
import {
  CartActions,
  ICartItem,
  ICartState,
} from "../../redux/types/cartTypes";

const CartScreen: FC<RouteComponentProps<{ id: string }>> = ({
  location: { search },
  match: {
    params: { id: productId },
  },
  history,
}) => {
  const qty = search ? parseInt(search.split("=")[1]) : 1;
  const dispatch: ThunkDispatch<
    IApplicationState,
    string & number,
    CartActions
  > = useDispatch();

  const { cartItems } = useSelector<IApplicationState, ICartState>(
    state => state.cart
  );

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map(
              ({
                product,
                image,
                name,
                price,
                countInStock,
                qty,
              }: ICartItem) => (
                <ListGroup.Item key={product}>
                  <Row>
                    <Col md={2}>
                      <Image src={image} alt={name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${product}`}>{name}</Link>
                    </Col>
                    <Col md={2}>${price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        // this is the item.qty
                        value={qty}
                        onChange={e =>
                          dispatch(
                            addToCart(
                              product,
                              parseInt(e.target.value)
                            )
                          )
                        }
                      >
                        {[...Array(countInStock).keys()].map(
                          (x: number) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            )}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal: (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={!cartItems.length}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
