import React, { FC, useState, useEffect, FormEvent } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer/FormContainer";
import { IUserState, UserActions } from "../../redux/types/userTypes";
import { IApplicationState } from "../../redux/store/store";
import { login } from "../../redux/actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { ThunkDispatch } from "redux-thunk";

const LoginScreen: FC<RouteComponentProps> = ({
  location: { search },
  history,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: ThunkDispatch<
    IApplicationState,
    string,
    UserActions
  > = useDispatch();

  const userLogin = useSelector<IApplicationState, IUserState>(
    state => state.userLogin
  );

  const { error, loading, userInfo } = userLogin
    ? userLogin
    : { loading: false, error: "", userInfo: null };

  const redirect = search ? search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const onSignInSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={onSignInSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link
            to={
              redirect
                ? `/register?redirect=${redirect}`
                : `/register`
            }
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
