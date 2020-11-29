import React, { FC, useState, useEffect, FormEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  IUserDetailsState,
  IUserLoginState,
  IUserUpdateProfileState,
  UserActions,
} from "../../redux/types/userTypes";
import { IApplicationState } from "../../redux/store/store";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { ThunkDispatch } from "redux-thunk";

const ProfileScreen: FC<RouteComponentProps> = ({
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

  const userDetails = useSelector<
    IApplicationState,
    IUserDetailsState
  >(state => state.userDetails);

  const { error, loading, user } = userDetails;

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    state => state.userLogin
  );

  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector<
    IApplicationState,
    IUserUpdateProfileState
  >(state => state.userUpdateProfile);

  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, user, userInfo]);

  const onUpdateProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setPassword("");
      setConfirmPassword("");
    } else {
      setMessage("");
      if (user) {
        dispatch(
          updateUserProfile({
            _id: user._id,
            name,
            password,
            email,
          })
        );
      }
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">
            User data updated successfully!
          </Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={onUpdateProfileSubmit}>
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
