import React, { FC } from "react";
import { Card } from "react-bootstrap";
import { IProduct } from "../../screens/HomeScreen/HomeScreen";

interface IPorductProps {
  product: IProduct;
}

const Product: FC<IPorductProps> = ({
  product: { _id, image, name, rating, numReviews, price },
}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${_id}`}>
        <Card.Img src={image} variant="top" />
      </a>
      <Card.Body>
        <a href={`/product/${_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="div">
          <div className="my-3">
            {rating} from {numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
