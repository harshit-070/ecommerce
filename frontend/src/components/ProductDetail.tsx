import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../service/fetchproductDetail";
import { RootState } from "../features/store";
import { useEffect, useState } from "react";
import Review from "./Review";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Row,
} from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import axiosInstance from "../helper/axiosInstance";
import {
  handleFaliureMessage,
  handleSuccessMessage,
} from "../features/message.slice";

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const { isLogin } = useSelector((state: RootState) => state.auth);

  const {
    currentProduct: {
      _id,
      name,
      image,
      price,
      description,
      ratingSum,
      numberOfRatings,
    },
  } = useSelector((state: RootState) => state.products);

  const { _id: cart } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  const { productId } = useParams();

  const array = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleQuantityChange = (e: any) => {
    setQuantity(e.target.text);
  };

  const handleAddToCart = async () => {
    if (!isLogin) {
      dispatch(handleFaliureMessage("Please Login to add the product in cart"));
      return;
    }
    try {
      const response = await axiosInstance.patch("/cart/add", {
        product: _id,
        quantity,
        cart,
      });
      dispatch(handleSuccessMessage("Product Added successfully"));
      console.log(response);
    } catch (error) {
      dispatch(
        handleFaliureMessage(
          "Product is already in the cart or we are unable the product to the cart"
        )
      );
    }
  };

  useEffect(() => {
    dispatch(fetchProductDetails(productId as string));
  }, [dispatch, productId]);

  return (
    <Container style={{ marginTop: "40px" }}>
      <Row>
        <Col>
          <Image src={image} />
        </Col>
        <Col>
          <h3>{name}</h3>
          <span style={{ fontSize: "25px" }}>
            <StarRatingComponent
              name="rating"
              value={ratingSum / numberOfRatings}
              editing={false}
            />{" "}
          </span>
          <span>{numberOfRatings} Ratings</span>
          <p style={{ textAlign: "left" }}>{description}</p>
          <Row>
            <Col>
              <p style={{ textAlign: "left" }}>
                Price : Rs.<b>{price}</b>
              </p>
            </Col>
            <Col>
              <span>Quantity </span>
              <DropdownButton
                style={{ display: "inline-block" }}
                variant="outline-secondary"
                title={quantity}
                id="input-group-dropdown-2"
                align="end"
              >
                {array.map((index) => (
                  <Dropdown.Item key={index} onClick={handleQuantityChange}>
                    {index}
                  </Dropdown.Item>
                ))}
              </DropdownButton>{" "}
              <Button onClick={handleAddToCart}>Add To Cart</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <Review />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
