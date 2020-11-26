import React, { FC, Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { IProduct } from "../HomeScreen/HomeScreen";
import Rating from "../../components/Rating/Rating";

const ProductScreen: FC<RouteComponentProps<{ id: string }>> = ({
  match: {
    params: { id },
  },
}) => {
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get<IProduct | null>(
        `/api/products/${id}`
      );
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    // TODO: change this if it's necessary. Move it to it's own component.
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }
  const {
    name,
    image,
    rating,
    numReviews,
    price,
    description,
    countInStock,
  } = product;
  return (
    <Fragment>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
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
              <Rating value={rating} text={`${numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${price}</ListGroup.Item>
            <ListGroup.Item>
              Description: ${description}
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
              <ListGroup.Item>
                <Button
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
    </Fragment>
  );
};

export default ProductScreen;
