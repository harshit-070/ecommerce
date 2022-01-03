import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StarRatingComponent from "react-star-rating-component";
import { handleFaliureMessage } from "../features/message.slice";
import { RootState } from "../features/store";
import axiosInstance from "../helper/axiosInstance";

function ReviewInput() {
  const [rating, setRating] = useState(0);
  const [statement, setStatement] = useState("");
  const [isReviewGiven, setIsReviewGiven] = useState(false);
  const { _id: productId } = useSelector(
    (state: RootState) => state.products.currentProduct
  );

  const { isLogin } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLogin) {
      dispatch(handleFaliureMessage("Please Login to give review"));
      return;
    }
    try {
      const response = await axiosInstance.post("/review", {
        rating,
        statement,
        product: productId,
      });
      setIsReviewGiven(true);
    } catch (error) {
      console.log(error);
      dispatch(
        handleFaliureMessage(
          "Review is already given or try again after some time"
        )
      );
    }
  };

  if (isReviewGiven) {
    return <h1>Thanks for your feedback</h1>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h4>Please Give us your feedback</h4>
      <div style={{ fontSize: "25px", textAlign: "left" }}>
        <StarRatingComponent
          name="rating"
          editing={true}
          value={rating}
          onStarHover={(nextValue) => {
            setRating(nextValue);
          }}
          onStarClick={(nextValue) => {
            setRating(nextValue);
          }}
        />
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          as="textarea"
          placeholder="Enter your Review"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ReviewInput;
