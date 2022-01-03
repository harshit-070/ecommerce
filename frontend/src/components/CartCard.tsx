import { useState } from "react";
import {
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeQuantity, removeProductForCart } from "../service/cart.service";

export interface ICartProduct {
  name: string;
  image: string;
  _id: string;
  quantity: number;
  price: number;
}

const CartCard: React.FC<{ product: ICartProduct }> = ({
  product: { name, image, _id, quantity, price },
}) => {
  const dispatch = useDispatch();

  const array = Array.from({ length: 10 }, (_, i) => i + 1);
  const [finalQuantity, setFinalQuantity] = useState(quantity);

  const handleQuantityChange = (e: any) => {
    dispatch(changeQuantity({ _id, quantity: e.target.text }));
    setFinalQuantity(e.target.text);
  };

  const handleDelete = () => {
    dispatch(removeProductForCart(_id));
  };

  return (
    <Container>
      <Card style={{ margin: "20px auto" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col xs="1">
                <Image src={image} style={{ width: "70px" }} />
              </Col>
              <Col xs="9" style={{ textAlign: "left" }}>
                <Card.Title>{name}</Card.Title>
                <Card.Text>Price : Rs.{price}</Card.Text>
              </Col>
              <Col>
                <span>Quantity </span>
                <DropdownButton
                  style={{ display: "inline-block" }}
                  variant="outline-secondary"
                  title={finalQuantity}
                  id="input-group-dropdown-2"
                  align="end"
                >
                  {array.map((index) => (
                    <Dropdown.Item key={index} onClick={handleQuantityChange}>
                      {index}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <p
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={handleDelete}
                >
                  Delete
                </p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CartCard;
