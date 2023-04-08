import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch } from "react-redux";
import "./cardStyle.css";
import {
  deleteProduct1,
  fetchSingleProduct,
} from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";

function AllProductDetails({ product, idUser }) {
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // var cards = document.querySelectorAll(".product-box");
  // [...cards].forEach((card) => {
  //   card.addEventListener("mouseover", function () {
  //     card.classList.add("is-hover");
  //   });
  //   card.addEventListener("mouseleave", function () {
  //     card.classList.remove("is-hover");
  //   });
  // });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    dispatch(deleteProduct1(product._id, navigate));
  };
  const handleClick1 = async () => {
    console.log("avant" + product);
    dispatch(fetchSingleProduct(product._id, navigate));
    console.log("après" + product);
  };

  return (
    <div className={`col-lg-3 col-md-4 mb-3 product-box ${isHover ? "is-hover" : ""}`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      {/* <p>{product.category}</p>
      <p>Type: {product.type}</p>
      <p>Brand: {product.brand}</p>
      <p>Price: {product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <p>
        Expiry Date:{" "}
        {formatDistanceToNow(new Date(product.expiry_date), {
          addSuffix: true,
        })}
      </p>
      <p>Description: {product.description}</p>
      <img src={product.image.url} alt={product.description} />
      {product.username == idUser ? (
        <button
          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          onClick={handleClick}
        >
          delete
        </button>
      ) : null}
      {product.username == idUser ? (
        <button
          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          onClick={handleClick1}
        >
          update
        </button>
      ) : null} */}

      <div className="product-box">
        <div className="product-inner-box position-relative">
          <div className="icons">
            <a
              href="#"
              className="text-decoration-none text-dark"
              style={{ backgroundColor: "#69b550" }}
            >
              <i class="fa-solid fa-heart"></i>
            </a>
            <a
              href="#"
              className="text-decoration-none text-dark"
              style={{ backgroundColor: "#69b550" }}
            >
              <i class="fa-solid fa-eye"></i>
            </a>
            {product.username == idUser ? (
              <a
                href="#"
                onClick={handleClick}
                className="text-decoration-none text-dark"
                style={{ backgroundColor: "#69b550" }}
              >
                <i class="fa-solid fa-trash"></i>
              </a>
            ) : null}
            {product.username == idUser ? (
              <a
                href="#"
                onClick={handleClick1}
                className="text-decoration-none text-dark"
                style={{ backgroundColor: "#69b550" }}
              >
                <i class="fa-solid fa-pen"></i>
              </a>
            ) : null}
          </div>
          <div className="onsale position-absolute top-0 start-0">
            <span className="badge rounded-0">
              <i class="fa-solid fa-arrow-down"></i>29%
            </span>
          </div>
          <img
            src={product.image.url}
            alt={product.description}
            className="img-fluid"
          />
          <div className="cart-btn">
            <button className="btn btn-dark shadow-sm rounded-pill">
              <i class="fa-sharp fa-solid fa-cart-shopping"></i>Add to Cart
            </button>
          </div>
        </div>
        <div className="product-info">
          <div className="product-category">
            <h3>{product.category}</h3>
          </div>
          <div className="product-type">
            <span>Type: {product.type}</span>
          </div>
          <div className="product-brand">
            <span>Brand: {product.brand}</span>
          </div>
          <div className="product-price">
            <span>Price: {product.price}DT</span>
          </div>
          <div className="product-quantity">
            <span>Quantity: {product.quantity}</span>
          </div>
          <div className="product-date">
            <span>
              Expiry Date:{" "}
              {formatDistanceToNow(new Date(product.expiry_date), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="product-desc">
            <span>Description: {product.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProductDetails;
