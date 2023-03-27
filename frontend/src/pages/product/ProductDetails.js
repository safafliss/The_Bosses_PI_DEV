import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch } from "react-redux";
import {deleteProduct} from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    dispatch(deleteProduct(product._id, navigate));
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
      <button
        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
        onClick={handleClick}
      >
        delete
      </button>
    </div>
  );
}

export default ProductDetails;
