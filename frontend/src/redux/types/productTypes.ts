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
  reviews?: IReview[];
}

export interface IServerProduct {
  products: IProduct[];
  page: number;
  pages: number;
}

export interface IReview {
  _id?: string;
  name?: string;
  createdAt?: Date;
  rating: number;
  comment: string;
}

export enum ProductActionTypes {
  PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST",
  PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS",
  PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL",
  PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST",
  PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS",
  PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL",
  PRODUCT_DETAILS_RESET = "PRODUCT_DETAILS_RESET",
  PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST",
  PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS",
  PRODUCT_DELETE_FAIL = "PRODUCT_DELETE_FAIL",
  PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST",
  PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS",
  PRODUCT_CREATE_FAIL = "PRODUCT_CREATE_FAIL",
  PRODUCT_CREATE_RESET = "PRODUCT_CREATE_RESET",
  PRODUCT_UPDATE_REQUEST = "PRODUCT_UPDATE_REQUEST",
  PRODUCT_UPDATE_SUCCESS = "PRODUCT_UPDATE_SUCCESS",
  PRODUCT_UPDATE_FAIL = "PRODUCT_UPDATE_FAIL",
  PRODUCT_UPDATE_RESET = "PRODUCT_UPDATE_RESET",
  PRODUCT_CREATE_REVIEW_REQUEST = "PRODUCT_CREATE_REVIEW_REQUEST",
  PRODUCT_CREATE_REVIEW_SUCCESS = "PRODUCT_CREATE_REVIEW_SUCCESS",
  PRODUCT_CREATE_REVIEW_FAIL = "PRODUCT_CREATE_REVIEW_FAIL",
  PRODUCT_CREATE_REVIEW_RESET = "PRODUCT_CREATE_REVIEW_RESET",
}

export interface IProductsListRequest {
  type: ProductActionTypes.PRODUCT_LIST_REQUEST;
}

export interface IProductsListSuccess {
  type: ProductActionTypes.PRODUCT_LIST_SUCCESS;
  payload: IServerProduct;
}

export interface IProductsListFail {
  type: ProductActionTypes.PRODUCT_LIST_FAIL;
  payload: string;
}

export interface IProductDetailsRequest {
  type: ProductActionTypes.PRODUCT_DETAILS_REQUEST;
}

export interface IProductDetailsSuccess {
  type: ProductActionTypes.PRODUCT_DETAILS_SUCCESS;
  payload: IProduct | null;
}

export interface IProductDetailsFail {
  type: ProductActionTypes.PRODUCT_DETAILS_FAIL;
  payload: string;
}

export interface IProductDetailsReset {
  type: ProductActionTypes.PRODUCT_DETAILS_RESET;
}

export interface IProductDeleteRequest {
  type: ProductActionTypes.PRODUCT_DELETE_REQUEST;
}

export interface IProductDeleteSuccess {
  type: ProductActionTypes.PRODUCT_DELETE_SUCCESS;
}

export interface IProductDeleteFail {
  type: ProductActionTypes.PRODUCT_DELETE_FAIL;
  payload: string;
}

export interface IProductCreateRequest {
  type: ProductActionTypes.PRODUCT_CREATE_REQUEST;
}

export interface IProductCreateSuccess {
  type: ProductActionTypes.PRODUCT_CREATE_SUCCESS;
  payload: IProduct;
}

export interface IProductCreateFail {
  type: ProductActionTypes.PRODUCT_CREATE_FAIL;
  payload: string;
}

export interface IProductCreateReset {
  type: ProductActionTypes.PRODUCT_CREATE_RESET;
}

export interface IProductUpdateRequest {
  type: ProductActionTypes.PRODUCT_UPDATE_REQUEST;
}

export interface IProductUpdateSuccess {
  type: ProductActionTypes.PRODUCT_UPDATE_SUCCESS;
  payload: IProduct;
}

export interface IProductUpdateFail {
  type: ProductActionTypes.PRODUCT_UPDATE_FAIL;
  payload: string;
}

export interface IProductUpdateReset {
  type: ProductActionTypes.PRODUCT_UPDATE_RESET;
}

export interface IProductCreateReviewRequest {
  type: ProductActionTypes.PRODUCT_CREATE_REVIEW_REQUEST;
}

export interface IProductCreateReviewSuccess {
  type: ProductActionTypes.PRODUCT_CREATE_REVIEW_SUCCESS;
}

export interface IProductCreateReviewFail {
  type: ProductActionTypes.PRODUCT_CREATE_REVIEW_FAIL;
  payload: string;
}

export interface IProductCreateReviewReset {
  type: ProductActionTypes.PRODUCT_CREATE_REVIEW_RESET;
}

export type ProductActions =
  | IProductsListRequest
  | IProductsListSuccess
  | IProductsListFail
  | IProductDetailsRequest
  | IProductDetailsSuccess
  | IProductDetailsFail
  | IProductDetailsReset
  | IProductDeleteRequest
  | IProductDeleteSuccess
  | IProductDeleteFail
  | IProductCreateRequest
  | IProductCreateSuccess
  | IProductCreateFail
  | IProductCreateReset
  | IProductUpdateRequest
  | IProductUpdateSuccess
  | IProductUpdateFail
  | IProductUpdateReset
  | IProductCreateReviewRequest
  | IProductCreateReviewSuccess
  | IProductCreateReviewFail
  | IProductCreateReviewReset;

export interface IProductListState {
  readonly products: IProduct[];
  readonly loading: boolean;
  error: string;
  page: number;
  pages: number;
}

export interface IProductDetailsState {
  readonly product: IProduct | null;
  readonly loading: boolean;
  error: string;
}

export interface IProductDeleteState {
  loading: boolean;
  success: boolean;
  error: string;
}

export interface IProductCreateState {
  loading: boolean;
  success: boolean;
  error: string;
  product: IProduct | null;
}

export interface IProductUpdateState {
  loading: boolean;
  success: boolean;
  error: string;
  product: IProduct | null;
}

export interface IProductReviewState {
  loading: boolean;
  success: boolean;
  error: string;
}
