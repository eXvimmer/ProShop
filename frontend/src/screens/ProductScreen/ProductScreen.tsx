import React, {
  ChangeEvent,
  FC,
  Fragment,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Rating from "../../components/Rating/Rating";
import Loader from "../../components/Loader/Loader";
import { ThunkDispatch } from "redux-thunk";
import { IApplicationState } from "../../redux/store/store";
import {
  ProductDetailsActions,
  IProductDetailsState,
} from "../../redux/types/productTypes";
import { listProductDetails } from "../../redux/actions/productActions";
import Message from "../../components/Message/Message";

const ProductScreen: FC<RouteComponentProps<{ id: string }>> = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch: ThunkDispatch<
    IApplicationState,
    string,
    ProductDetailsActions
  > = useDispatch();

  const productDetails = useSelector<
    IApplicationState,
    IProductDetailsState
  >(state => state.productDetails);

  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const onQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseFloat(e.target.value));
  };

  const onAddToCartClick = () => {
    history.push(`/cart/${id}?qty=${quantity}`);
  };

  const loadContent = () => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Message variant="danger">{error}</Message>;
    } else if (product) {
      const {
        image,
        name,
        rating,
        numReviews,
        price,
        description,
        countInStock,
      } = product;

      return (
        <Row>
          <Col md={6}>
            <Image src={image} alt={name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={rating}
                  text={`${numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Form.Control
                        as="select"
                        value={quantity}
                        onChange={onQuantityChange}
                      >
                        {[...Array(countInStock).keys()].map(
                          (x: number) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={onAddToCartClick}
                    disabled={countInStock < 1}
                    className="btn-block"
                    type="button"
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      );
    } else {
      // NOTE: this will never happen, because of the state
      return (
        <Message variant="danger">Something went wrong!</Message>
      );
    }
  };

  return (
    <Fragment>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loadContent()}
    </Fragment>
  );
};

export default ProductScreen;
