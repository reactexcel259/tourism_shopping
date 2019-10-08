import React from "react";
import artisan_img from "../../images/duty_free_img.png";

export default function Description({ name, desc, catImage,subCategoryName }) {
  return (
    <div className="col-12 p-0 description-block">
      <div className='cat'>
        <div>
          {name && (
            <h2 style={{ textTransform: "capitalize" }}>
              {name.replace("_", " ")} {subCategoryName && `/${subCategoryName}`}
            </h2>
          )}
        </div>
        <div>{desc && <p>{desc}</p>}</div>
      </div>
      {/* <div className="cat-img">
        <img src={catImage} />
      </div> */}
      <div
        className="cat-bg-img"
        style={{ backgroundImage: `url(${catImage})` }}
      />
    </div>
  );
}

// export default function Description({ name, desc }) {
//   return (
//     <div className=" col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1  description-div">
//       <div className="cat">
//         <div>{name}</div>
//         <div>{desc}</div>
//       </div>
//       {!(window.location.href == `${window.location.origin}/#/events`) && (
//         <div className="cat-img">
//           <img src={corn} />
//         </div>
//       )}
//       <div className="cat-bg-img" style={{ backgroundImage: `url(${corn})` }}>
//       </div>
//     </div>
//   );
// }
