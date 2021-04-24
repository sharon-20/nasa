import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase';
import { Container, Col, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import NavBarComponent from './NavBarComponent';
import './LoginPage.css'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

const RegisterPage = (props) => {
  const [errors, setErrors] = useState([])
  const handleSubmit = async (values) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      props.history.push('/')
    }
    catch (err) {
      setErrors(prev => ([...prev, err.message]))
    }

  }
  const firebase = useFirebase()
  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmit,
    initialValues: {
      firstName: '',
      email: '',
      password: ''
    }
  });



  return (
    <>
      <NavBarComponent></NavBarComponent>
      <Container>
        <Form onSubmit={formik.handleSubmit} className="text-center p-5">
          <Form.Row>
            <Form.Group as={Col} controlId="firstname">
              <Form.Label>First name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control className="form-control mb-4"
                  type="text"
                  placeholder="first name"
                  aria-describedby="inputGroupPrepend"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control className="form-control mb-4"
                  type="text"
                  placeholder="email"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control className="form-control mb-4"
                  type="text"
                  placeholder="password"
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <button type="submit" className="mb-4 sign-in">register</button>
            {errors.length > 0 ? errors.map(error => <p style={{ color: 'red' }}>{error}</p>) : null}
        </Form>
      </Container>
    </>
  );
};

export default withRouter(RegisterPage)

