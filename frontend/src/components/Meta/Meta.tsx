import React, { FC } from "react";
import { Helmet } from "react-helmet";

interface IProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta: FC<IProps> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>Welcome To ProShop | {title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "HOME",
  keywords:
    "shop, electronics, buy electronics, cheap electronics, high quality electronics",
  description:
    "Get the highest quality electronics with the lowest price possible",
};

export default Meta;
