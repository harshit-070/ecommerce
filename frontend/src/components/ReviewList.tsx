import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import ReviewCard from "./ReviewCard";

function ReviewList() {
  const { reviews } = useSelector((state: RootState) => state.review);
  return (
    <div>
      {reviews.map(({ _id, statement, rating, user: { name } }) => (
        <ReviewCard
          key={_id}
          statement={statement}
          rating={rating}
          name={name}
        />
      ))}
    </div>
  );
}

export default ReviewList;
