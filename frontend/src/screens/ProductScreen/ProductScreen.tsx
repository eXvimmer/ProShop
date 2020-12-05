import React, {
  ChangeEvent,
  FC,
  FormEvent,
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
  IProductDetailsState,
  IProductReviewState,
  ProductActions,
  ProductActionTypes,
} from "../../redux/types/productTypes";
import {
  createProductReview,
  listProductDetails,
} from "../../redux/actions/productActions";
import Message from "../../components/Message/Message";
import { IUserLoginState } from "../../redux/types/userTypes";
import Meta from "../../components/Meta/Meta";

const ProductScreen: FC<RouteComponentProps<{ id: string }>> = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch: ThunkDispatch<
    IApplicationState,
    any,
    ProductActions
  > = useDispatch();

  const productDetails = useSelector<
    IApplicationState,
    IProductDetailsState
  >(state => state.productDetails);
  const { error, loading, product } = productDetails;

  const productCreateReview = useSelector<
    IApplicationState,
    IProductReviewState
  >(state => state.productCreateReview);
  const {
    error: reviewError,
    success: reviewSuccess,
  } = productCreateReview;

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    state => state.userLogin
  );
  const { userInfo } = userLogin;

  useEffect(() => {
    if (reviewSuccess) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_REVIEW_RESET,
      });
    }

    dispatch(listProductDetails(id));
  }, [dispatch, id, reviewSuccess]);

  const onQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseFloat(e.target.value));
  };

  const onAddToCartClick = () => {
    history.push(`/cart/${id}?qty=${quantity}`);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  const loadContent = () => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Message variant="danger">{error}</Message>;
    } else if (product) {
      return (
        <Fragment>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
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
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={onQuantityChange}
                        >
                          {[
                            ...Array(product.countInStock).keys(),
                          ].map((x: number) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={onAddToCartClick}
                      disabled={product.countInStock < 1}
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

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {!product.reviews?.length && (
                <Message>No Reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews &&
                  product.reviews?.length &&
                  product.reviews?.map(review => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating
                        value={review.rating}
                        text={product.numReviews.toString()}
                      />
                      <p>
                        {review.createdAt
                          ?.toString()
                          .substring(0, 10)}
                      </p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {reviewError && (
                    <Message variant="danger">{reviewError}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={e =>
                            setRating(Number(e.target.value))
                          }
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write
                      a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Fragment>
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
