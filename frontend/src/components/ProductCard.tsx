import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { IProduct } from "../features/products.slice";

const ProductCard: React.FC<{ product: IProduct }> = ({
  product: { image, _id, name, price, ratingSum, numberOfRatings = 0 },
}) => {
  return (
    <Card style={{ width: "18rem", textAlign: "left" }}>
      <Link to={`/product/${_id}`}>
        <Card.Img variant="top" src={image} />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/product/${_id}`}> {name}</Link>
        </Card.Title>
        <div style={{ fontSize: "18px" }}>
          <b>Rs.{price}</b>
        </div>
        <StarRatingComponent
          name="rating"
          value={ratingSum / numberOfRatings}
          editing={false}
        />{" "}
        {numberOfRatings} Ratings
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
