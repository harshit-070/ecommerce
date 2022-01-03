import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import signupUserWithForm from "../service/signupUserWithForm";

function SignupForm() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    onSubmit: (values) => {
      dispatch(signupUserWithForm(values));
    },
  });
  return (
    <Form
      style={{ width: "18rem", margin: "auto", marginTop: "20px" }}
      onSubmit={formik.handleSubmit}
    >
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          autoComplete="name"
        />
      </Form.Group>

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
        Signup
      </Button>
    </Form>
  );
}

export default SignupForm;
