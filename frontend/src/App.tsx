import "./App.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import axiosInstance from "./helper/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./features/store";
import { updateAccessToken } from "./features/auth.slice";
import Signup from "./page/Signup";
import Message from "./components/Message";
import Product from "./page/Product";
import ProductDetail from "./components/ProductDetail";
import Cart from "./page/Cart";
import RequireAuth from "./components/RequireAuth";
import Home from "./page/Home";

function App() {
  const { isLogin, headers } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  axiosInstance.interceptors.request.use((config) => {
    if (isLogin && config && config.headers) {
      config.headers.authorization = headers.authorization;
      config.headers["x-refresh"] = headers["x-refresh"];
    }

    return config;
  });

  axiosInstance.interceptors.response.use((config) => {
    if (config.headers["x-access-token"]) {
      dispatch(updateAccessToken(config.headers["x-access-token"]));
    }
    return config;
  });

  return (
    <div className="App">
      <NavBar />
      <Container>
        <Message />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route element={<RequireAuth />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
