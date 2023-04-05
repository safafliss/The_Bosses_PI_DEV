import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/actions/productActions";
import ProductDetails from "./ProductDetails";
import jwt_decode from "jwt-decode";

function ProductsCreated() {
  console.log(localStorage.getItem("jwt"))
  const token = localStorage.getItem("jwt")
  console.log(jwt_decode(token))
  const idUser = jwt_decode(token).id


  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts(idUser));
  }, [dispatch]);

  return (
    <div>
      <h1>Products Created</h1>
      {products &&
        products.map((product) => (
          <ProductDetails product={product} key={product._id} />
        ))}
    </div>
  );
}

export default ProductsCreated;
