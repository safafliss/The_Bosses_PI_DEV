import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { fetchAllProducts } from "../../redux/actions/productActions";
import AllProductDetails from "./AllProductDetails";

function AllProducts() {
  console.log(localStorage.getItem("jwt"))
  const token = localStorage.getItem("jwt")
  console.log(jwt_decode(token))
  const idUser = jwt_decode(token).id

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>All Products</h1>
      {products &&
        products.map((product) => (
          <AllProductDetails product={product} key={product._id} idUser={idUser} />
        ))}
    </div>
  )
}

export default AllProducts