import React from "react";
import StarRatingComponent from "react-star-rating-component";

const ReviewCard: React.FC<{
  statement: string;
  rating: number;
  name: string;
}> = ({ statement, rating, name }) => {
  return (
    <div>
      <StarRatingComponent value={rating} editing={false} name="rating" />
      <h6>{name}</h6>
      <p>{statement}</p>
    </div>
  );
};

export default ReviewCard;
