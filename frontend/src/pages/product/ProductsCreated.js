import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/actions/productActions";
import ProductDetails from "./ProductDetails";
function ProductsCreated() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
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
