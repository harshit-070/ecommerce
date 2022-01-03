import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../css/navbar.module.css";
import { logoutUser } from "../features/auth.slice";
import { RootState } from "../features/store";
function NavBar() {
  const {
    isLogin,
    user: { email },
  } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/product" className={styles.navbarLink}>
              Products
            </Link>
            <Link to="/cart" className={styles.navbarLink}>
              Cart
            </Link>
          </Nav>
          {!isLogin ? (
            <Nav>
              <Link to="/login">
                <Button variant="primary" style={{ marginRight: "10px" }}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline-primary">Signup</Button>
              </Link>
            </Nav>
          ) : (
            <NavDropdown
              title={email}
              id="basic-nav-dropdown"
              style={{ color: "white", cursor: "pointer" }}
            >
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
