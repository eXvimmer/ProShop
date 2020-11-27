import React, { FC } from "react";
import { Alert } from "react-bootstrap";

interface IMessageProps {
  variant?: string;
}

const Message: FC<IMessageProps> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
