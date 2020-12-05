import React, { FC, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { IApplicationState } from "../../redux/store/store";
import { CartActions } from "../../redux/types/cartTypes";
import { IProductTopState } from "../../redux/types/productTypes";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { listTopProducts } from "../../redux/actions/productActions";

const ProductCarousel: FC = () => {
  const dispatch: ThunkDispatch<
    IApplicationState,
    null,
    CartActions
  > = useDispatch();

  const productTopRated = useSelector<
    IApplicationState,
    IProductTopState
  >(state => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
