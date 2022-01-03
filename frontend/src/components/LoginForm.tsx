import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import loginUserWithForm from "../service/loginUserWithForm";

function LoginForm() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      dispatch(loginUserWithForm(values));
    },
  });
  return (
    <Form
      style={{ width: "18rem", margin: "auto", marginTop: "15px" }}
      onSubmit={formik.handleSubmit}
    >
      <hr></hr>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          autoComplete="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
