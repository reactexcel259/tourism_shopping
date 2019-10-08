import React from "react";
import StarRatings from "react-star-ratings";

export default function Review({ review }) {
  return (
    <div className="review">
      <div className="top">
        <div className="name">{review.user_id && review.user_id.name.first + " " + review.user_id.name.last }</div>
        <StarRatings
          rating={JSON.parse(review.stars)}
          // rating={this.state.rating}
          starRatedColor="#fbc000"
          // changeRating={this.changeRating}
          starDimension="1em"
          starSpacing="0px"
          numberOfStars={5}
          name="rating"
        />
      </div>
      <div className="text">{review.comment}</div>
    </div>
  );
}
