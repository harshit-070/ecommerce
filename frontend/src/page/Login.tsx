import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { RootState } from "../features/store";

function Login() {
  const { isLogin } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/product");
    }
  }, [isLogin]);

  return (
    <Container>
      <Row>
        <Col style={{ marginTop: "10px", marginBottom: "15px" }}>
          <LoginWithGoogle />
        </Col>
      </Row>
      <Row>
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
