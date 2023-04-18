import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/actions/productActions";
import ProductDetails from "./ProductDetails";
import jwt_decode from "jwt-decode";
import "./myProducts.css";
import Navbar from "../../components/ReusableComponents/components/Navbars/UserNavbar";
import ProfileAddProduct from "./ProfileAddProduct";
import { useNavigate } from "react-router-dom";

function ProductsCreated(props) {
  console.log(localStorage.getItem("jwt"));
  const token = localStorage.getItem("jwt");
  console.log(jwt_decode(token));
  const idUser = jwt_decode(token).id;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts(idUser));
  }, [dispatch]);
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate("/addProduct")
  };
  return (
    <>
      <Navbar user1={props.user1} />

      <div className="pages">
        <div className="home">
          <div className="products">
            <h1>My Products</h1>
            {products &&
              products.map((product) => (
                <ProductDetails product={product} key={product._id} />
              ))}
          </div>
          <div style={{ marginTop: "100px" }}>
            <ProfileAddProduct />
            <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-0 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" onClick={handleClick}>
              ADD PRODUCT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsCreated;
