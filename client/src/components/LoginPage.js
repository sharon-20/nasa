import React,{useState} from 'react';
import { useFirebase} from 'react-redux-firebase';
import { Container, Col, Form, Button, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {connect} from 'react-redux'
import NavBarComponent from './NavBarComponent';
import { Link, withRouter } from 'react-router-dom'
import './LoginPage.css'


const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const LoginPage = (props) => {
  const [errors, setErrors] = useState([])

  console.log(props, 'vdvcv')
  const handleSubmit = async (values) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      props.history.push('/home')
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
      email: '',
      password: ''
    }
  });
  return (
    <>
    <NavBarComponent></NavBarComponent>
    <Container>
      <Form onSubmit={formik.handleSubmit} className="text-center p-5">
        <p className="h4 mb-4">Login</p>

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
                type="password"
                placeholder="password"
                aria-describedby="inputGroupPrepend"
                name="password"
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
        <button type="submit" className="mb-4 sign-in">login</button>
        <p>Do not have an account with us?
      <Link className="link" to="/register">register</Link>
          {/* <a class="link" routerLink="/registeration">register</a> */}
        </p>
          {errors.length > 0 ? errors.map(error => <p key={error} style={{ color: 'red' }}>{error}</p>) : null}
      </Form>
    </Container>
  </>
);}




// const enhance = connect(
//   // Map redux state to component props
//   ({ firebase: { auth, profile } }) => ({
//     auth,
//     profile
//   })
// )(LoginPage)


// export default enhance
export default withRouter(LoginPage)
