import React from "react";
import CategoryNavItem from "../generic/CategoryNavItem";
import { Link } from "react-router-dom";

export default function CategoryNav2({ categories, handleSubcat, location }) {
  return (
    <div className="category-nav2 col-lg-8 col-md-10 col-sm-12 col-xs-10 offset-md-1 offset-lg-2 p-0">
      {categories &&
        categories.map((category, index) => (
          <div className="category-nav-item2 " key={index}>
            <div className="category-nav-item-header2">
              <div className="category-img2">
                <img src={category.image} />
              </div>
              <div className="title2">
                <Link
                  to={category.path}
                  style={{ textTransform: "capitalize" }}
                  className={
                    location &&
                    location.pathname.includes(category.path) &&
                    "active-cat"
                  }
                >
                  {category.name.replace("_", " ")}
                </Link>
              </div>
            </div>
            {category.subCategory && category.subCategory.length ? (
              <div className="category-nav-item-dropdown2 rounded-bottom">
                <ul className="list-unstyled">
                  {category.subCategory.map((sub_category, i) => (
                    <li key={i}>
                      <Link
                        to={`${category.path}/${sub_category._id}`}
                        // to={{ pathname: `/event-detail/${event._id}`, state: event }}
                        style={{ textTransform: "capitalize" }}
                        onClick={() => handleSubcat(sub_category._id,sub_category.name)}
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
        ))}
    </div>
  );
}
