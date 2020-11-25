import React, { FC, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../../components/Product/Product";
import products from "../../products";

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

const HomeScreen: FC = () => {
  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product: IProduct) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
