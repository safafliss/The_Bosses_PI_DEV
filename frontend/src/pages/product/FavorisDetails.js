import React, { useEffect, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./cardStyle.css";
function FavorisDetails({product}) {
  return (
    <div className={`col-lg-3 col-md-4 mb-3 product-box`}>
      <div className="product-box">
        <div className="product-inner-box position-relative">
          <img
            src={product.image.url}
            alt={product.description}
            //className="img-fluid"
            className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
          />
          <div className="cart-btn">
            <button className="btn btn-dark shadow-sm rounded-pill">
              <i class="fa-sharp fa-solid fa-cart-shopping"></i>Add to Cart
            </button>
          </div>
        </div>
        <div className="product-info mt-4 flex justify-between">
          {/* <div className="product-category">
            <h3>{product.category}</h3>
          </div>
          <div className="product-type">
            <span>
              <strong>Type:</strong> {product.type}
            </span>
          </div> */}
          <div className="product-price">
            <span>
              {product.price}DT
            </span>
          </div>
          <div className="product-date">
            <span>
              <strong>Expiry Date: </strong>
              {formatDistanceToNow(new Date(product.expiry_date), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavorisDetails