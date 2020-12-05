import React, { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../../components/Product/Product";
import {
  IProduct,
  IProductListState,
  ProductActions,
} from "../../redux/types/productTypes";
import { listProducts } from "../../redux/actions/productActions";
import { IApplicationState } from "../../redux/store/store";
import { ThunkDispatch } from "redux-thunk";
import Loader from "./../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { Link, RouteComponentProps } from "react-router-dom";
import Paginate from "../../components/Paginate/Paginate";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import Meta from "../../components/Meta/Meta";

const HomeScreen: FC<
  RouteComponentProps<{ keyword: string; pageNumber: string }>
> = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || "1";

  /* NOTE
   * We use useDispatch and dispatch the desired action.
   * This is an alternative for connecting the function to
   * the store and using mapDispatchToProps
   */
  const dispatch: ThunkDispatch<
    IApplicationState,
    any,
    ProductActions
  > = useDispatch();
  /* NOTE
   * We use useSelector here. It's kind of a combination of
   * reselect package and connect funciton. We don't have to
   * use mapStateToProps here. Because we used useSelector
   * instead.
   */
  const productList = useSelector<
    IApplicationState,
    IProductListState
  >(state => state.productList);

  const { error, loading, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <Meta title="HOME" />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {products.map((product: IProduct) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
