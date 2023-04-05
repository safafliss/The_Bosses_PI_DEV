import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch } from "react-redux";
import "./foodhut.css";

import {
  deleteProduct,
  fetchSingleProduct,
} from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
function AllProductDetails({ product, idUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    dispatch(deleteProduct(product._id, navigate));
  };
  const handleClick1 = async () => {
    console.log("avant" + product);
    dispatch(fetchSingleProduct(product._id, navigate));
    console.log("après" + product);
  };

  return (
    <div>
      <p>{product.category}</p>
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
      ) : null}




      <div className="row">
        <div className="col-md-4">
          <div className="card bg-transparent border my-3 my-md-0">
            <img src={product.image.url} alt={product.description} className="rounded-0 card-img-top mg-responsive"/>
            <div className="card-body">
              <h1 className="text-center mb-4">
                <a href="#" className="badge badge-primary">
                  $5
                </a>
              </h1>
              <h4 className="pt20 pb20">Reiciendis Laborum </h4>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
                provident illum officiis fugit laudantium voluptatem sit iste
                delectus qui ex.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProductDetails;
