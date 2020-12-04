import React, {
  FC,
  useState,
  useEffect,
  FormEvent,
  Fragment,
} from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer/FormContainer";
import {
  IUserDetailsState,
  UserActions,
} from "../../redux/types/userTypes";
import { IApplicationState } from "../../redux/store/store";
import { getUserDetails } from "../../redux/actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { ThunkDispatch } from "redux-thunk";

const UserEditScreen: FC<RouteComponentProps<{ id: string }>> = ({
  match: {
    params: { id: userId },
  },
  history,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

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

  useEffect(() => {
    if (!user || !user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, userId, dispatch]);

  const onSignUpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={e => setIsAdmin(e.currentTarget.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default UserEditScreen;
