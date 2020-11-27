import React, { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Spinner } from "react-bootstrap";
import Product from "../../components/Product/Product";
import {
  IProduct,
  IProductState,
} from "../../redux/types/productTypes";
import { productsListRequest } from "../../redux/actions/productActions";
import { IApplicationState } from "../../redux/store/store";

const HomeScreen: FC = () => {
  /* NOTE
   * We use useDispatch and dispatch the desired action.
   * This is an alternative for connecting the function to
   * the store and using mapDispatchToProps
   */
  /* TODO: find the dispatch type */
  const dispatch = useDispatch();
  /* NOTE
   * We use useSelector here. It's kind of a combination of
   * reselect package and connect funciton. We don't have to
   * use mapStateToProps here. Because we used useSelector
   * instead.
   */
  const productList = useSelector<IApplicationState, IProductState>(
    state => state.productList
  );

  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(productsListRequest());
  }, [dispatch]);

  return (
    <Fragment>
      <h1>Latest Products</h1>
      {loading ? (
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
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product: IProduct) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </Fragment>
  );
};

export default HomeScreen;
