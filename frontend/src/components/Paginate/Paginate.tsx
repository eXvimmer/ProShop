import React, { FC } from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface IProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
}

const Paginate: FC<IProps> = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
}) => {
  if (pages > 1) {
    return (
      <Pagination>
        {[...Array(pages).keys()].map(x => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    );
  } else {
    return null;
  }
};

export default Paginate;
