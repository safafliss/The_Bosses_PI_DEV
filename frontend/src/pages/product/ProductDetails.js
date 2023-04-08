import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchSingleProduct } from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
import Dialog from './Dialog';

function ProductDetails({ product }) {
  const [dialog, setDialog] = useState({
    message:'',
    isLoading: false
  })
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    handleDialog("Are you sure you want to delete this product?", true);
      //dispatch(deleteProduct(product._id, navigate));
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      dispatch(deleteProduct(product._id, navigate));
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  }

  const handleClick1 = async () => {
    console.log("avant" + product);
    dispatch(fetchSingleProduct(product._id, navigate));
    console.log("après" + product);
  };
  return (
    <div className="product-details" style={{ backgroundColor: "#adc7ea" ,"border": "solid 1px black"}}>
      <p><strong>{product.category}</strong></p> 
      <p><strong>Type:</strong> {product.type}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Price:</strong> {product.price} DT</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>
      <p>
        <strong>Expiry Date:{" "}</strong>
        {formatDistanceToNow(new Date(product.expiry_date), {
          addSuffix: true,
        })}
      </p>
      <p><strong>Description:</strong> {product.description}</p>
      <img src={product.image.url} alt={product.description} style={{"height":"400px", "width": "300px", "border": "solid 1px black"}}/>
      <br/>
      <button
        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
        onClick={handleClick}
      >
        delete
      </button>
      <button
        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
        onClick={handleClick1}
      >
        update
      </button>
      {dialog.isLoading && <Dialog onDialog={areUSureDelete} message= {dialog.message}/>}
    </div>
  );
}

export default ProductDetails;
