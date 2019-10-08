import React from "react";
import CategoryNavItem from "../generic/CategoryNavItem";
import { Link } from "react-router-dom";

export default function CategoryNav3({ categories, handleSubcat,handleClick }) {
  return (
    <div className="category-nav3 col-lg-8 col-md-10 col-sm-10 col-xs-10 offset-sm-1 offset-md-1 offset-lg-2 p-0">
      {categories &&
        categories.map((category, index) => (
          <div className="category-nav-item3 " key={index}>
            <div className="category-nav-item-header3">
              <div className="category-img3">
                <img src={category.image} />
              </div>
              <div className="title3" onClick={()=>handleClick()}>
                <Link
                  to={category.path}
                  style={{ textTransform: "capitalize" }}
                >
                  {category.name.replace("_", " ")}
                </Link>
                {/* {location.pathname==category.path && alert('true')} */}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
