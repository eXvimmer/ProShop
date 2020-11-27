import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IProduct } from "../../redux/types/productTypes";
import Rating from "../Rating/Rating";

interface IPorductProps {
  product: IProduct;
}

const Product: FC<IPorductProps> = ({
  product: { _id, image, name, rating, numReviews, price },
}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
