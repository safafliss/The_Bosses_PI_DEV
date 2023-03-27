import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/actions/productActions";

function App() {
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
          <div key={product._id}>
            <p>{product.category}</p>
            <p>Type: {product.type}</p>
            <p>Brand: {product.brand}</p>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Expiry Date: {product.expiry_date}</p>
            <p>Description: {product.description}</p>
            <img src={product.image.url} alt={product.description} />
          </div>
        ))}
    </div>
  );
}

export default App;
