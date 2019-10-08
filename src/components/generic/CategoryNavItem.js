import React from "react";
import { Link } from "react-router-dom";

export default function CategoryNavItem({ category, handleSubcat }) {
  return (
    <div className="category-nav-item ">
      <div className="category-nav-item-header">
        <div className="category-img">
          <img src={category.image} />
        </div>
        <div className="title">
          <Link to={category.path} style={{ textTransform: "capitalize" }}>
            {category.name.replace("_", " ")}
          </Link>
        </div>
      </div>
      {category.subCategory && category.subCategory.length ? (
        <div className="category-nav-item-dropdown rounded-bottom">
          <ul className="list-unstyled">
            {category.subCategory.map((sub_category, i) => (
              <li key={i}>
                <Link
                  to={`${category.path}/${sub_category._id}`}
                  // to={{ pathname: `/event-detail/${event._id}`, state: event }}
                  style={{ textTransform: "capitalize" }}
                  onClick={() => handleSubcat(sub_category._id)}
                >
                  {sub_category.name.replace("_", " ")}
                </Link>
                <span style={{ marginLeft: "15px", color: "#aaaaaa" }}>
                  {sub_category.itemCount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
