// see SignupForm.js for comments
import { useMutation, useQuery, gql } from '@apollo/client';
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations.js';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // const {data, loading} = useQuery( gql`
  //   query Users {
  //     users {
  //       _id
  //       username
  //       email
  //       bookCount
  //       savedBooks {
  //         bookId
  //         authors
  //         title
  //         description
  //         image
  //         link
  //       }
  //     }
  //   }
  //   `
  // )

  // console.log('usequeryresult:', data)

  const [login] = useMutation(LOGIN_USER);

  const [testMutation] = useMutation(gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`);

  const testMute = async () => {
    let something = await testMutation({
      variables: {
        "username": "test",
        "email": "test@test.com",
        "password": "password"
      }
    });
    console.log(something);
  };

  // testMute()

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      console.log('submitting with', userFormData);
      const anything = login({ variables: userFormData });
      await anything;
      console.log(anything);
      let newdata = { ...anything };
      console.log(newdata);
      let { user, token } = anything;
      console.log(token, user);
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
