import React from "react";
import CategoryNavItem from "../generic/CategoryNavItem";
import MenuImage from "../../images/menuImage.svg";

export default function CategoryNav({ categories, handleSubcat }) {
  return (
    <div className="row categoryDiv">
      {/* <div > */}
       {window.location.pathname ==="/" && 
       <img  className='homePageImage' src={MenuImage} />}
      {((window.location.pathname.search("duty_free")>-1)        
        ||(window.location.pathname.search("artisan")>-1)
        ||(window.location.pathname.search("crafts")>-1)
        ||(window.location.pathname.search("retails")>-1)
        ||(window.location.pathname.search("business-details")>-1)
        ) 
        ?(<div></div>)
        :
        (<div className="container container-mobile ">
          <div className="category-nav row">
            {categories &&
              categories.map((category, index) => (
                <CategoryNavItem
                  key={index}
                  category={category}
                  handleSubcat={handleSubcat}
                />
            ))}
          </div>
        </div>)
      }
    </div>
  );
}
