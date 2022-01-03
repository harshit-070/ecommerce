import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import ProductCard from "./ProductCard";

function ProductList() {
  const { currentPageProducts } = useSelector(
    (state: RootState) => state.products
  );
  return (
    <Row>
      {currentPageProducts.map((product) => (
        <Col key={product._id} style={{ margin: "10px" }}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;
