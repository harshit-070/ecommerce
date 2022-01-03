import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import SignupWithGoogle from "../components/SignupWithGoogle";
import { RootState } from "../features/store";

function Signup() {
  const { isLogin } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate("/product");
    }
  }, [isLogin]);
  return (
    <Container style={{ textAlign: "center" }}>
      <Row>
        <Col style={{ marginTop: "10px" }}>
          <SignupWithGoogle />
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <SignupForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
