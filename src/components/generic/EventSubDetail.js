import React from "react";

export default function EventSubDetail({ image, text }) {
  return (
    <div className="sub-detail">
      <img className="icon" src={image} />
      <div className="text">{text}</div>
    </div>
  );
}
