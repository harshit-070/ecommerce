import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetReviews } from "../features/review.slice";
import { RootState } from "../features/store";
import { fetchReviewsList } from "../service/fetchReviewsList";
import ReviewInput from "./ReviewInput";
import ReviewList from "./ReviewList";

export default function Review() {
  const dispatch = useDispatch();
  const { numberOfRatings } = useSelector(
    (state: RootState) => state.products.currentProduct
  );
  const { productId } = useParams();
  const _id = productId as string;
  const { moreAvailable } = useSelector((state: RootState) => state.review);
  useEffect(() => {
    dispatch(resetReviews());
    handleFetchMore();
  }, [_id]);

  const handleFetchMore = () => {
    dispatch(fetchReviewsList(_id));
  };

  return (
    <div>
      <h4 style={{ textAlign: "left" }}>Reviews({numberOfRatings})</h4>
      <div style={{ textAlign: "left" }}>
        <ReviewList />
      </div>
      {moreAvailable ? (
        <Button onClick={handleFetchMore}> More Reviews</Button>
      ) : (
        <></>
      )}
      <ReviewInput />
    </div>
  );
}
