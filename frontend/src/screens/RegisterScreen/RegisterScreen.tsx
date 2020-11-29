import React, { FC, useState, useEffect, FormEvent } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer/FormContainer";
import {
  IUserRegisterState,
  UserActions,
} from "../../redux/types/userTypes";
import { IApplicationState } from "../../redux/store/store";
import { register } from "../../redux/actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { ThunkDispatch } from "redux-thunk";

const RegisterScreen: FC<RouteComponentProps> = ({
  location: { search },
  history,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch: ThunkDispatch<
    IApplicationState,
    string,
    UserActions
  > = useDispatch();

  const userRegister = useSelector<
    IApplicationState,
    IUserRegisterState
  >(state => state.userRegister);

  const { error, loading, userInfo } = userRegister;

  const redirect = search ? search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const onSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setPassword("");
      setConfirmPassword("");
    } else {
      dispatch(register(name, email, password));
      setMessage("");
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={onSignUpSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : `/login`}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
