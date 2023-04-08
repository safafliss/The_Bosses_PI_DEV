import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import {
  fetchAllProducts,
  fetchAllProducts1,
  fetchAllProducts2,
} from "../../redux/actions/productActions";
import AllProductDetails from "./AllProductDetails";
import Navbar from "../../components/ReusableComponents/components/Navbars/UserNavbar";
import "./AllProducts.css";

function AllProducts() {
  console.log(localStorage.getItem("jwt"));
  const token = localStorage.getItem("jwt");
  console.log(jwt_decode(token));
  const idUser = jwt_decode(token).id;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleMinPriceChange = (event) => {
    setMinPrice(parseInt(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseInt(event.target.value));
  };

  const handleFilter = () => {
    dispatch(fetchAllProducts1({ minPrice, maxPrice }));
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    dispatch(fetchAllProducts2(searchQuery));
  };

  return (
    <div style={{ backgroundColor: "#adc7ea" }}>
      <Navbar />
      <br />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          style={{
            flex: "0 1 auto",
            minWidth: "320px",
            maxWidth: "30%",
            marginTop: "8px",
            padding: "0 20px",
          }}
        >
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card1 p-4">
              <div className=" image d-flex flex-column justify-content-center align-items-center">
                {/* search */}
                <div className="icon">
                  <i class="fa fa-search"></i>
                  <input
                    type="text"
                    id="typeProduct"
                    placeholder="search By product name..."
                    className="border-0 py-2.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    onInput={handleSearch}
                  />
                </div>
                <br />

                {/* filter price */}
                <div class=" d-flex mt-2">
                  <div>
                    <label for="min">Minimum price:&nbsp;&nbsp;</label>
                    <input
                      type="number"
                      id="min"
                      name="min"
                      min="0"
                      max="100"
                      step="1"
                      style={{ width: "50%", maxWidth: "200px" }}
                      className="border-0 px-3 py-2.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={handleMinPriceChange}
                      value={minPrice}
                    />
                    <br />
                    <br />
                    <label for="max">Maximum price:&nbsp;&nbsp;</label>
                    <input
                      type="number"
                      id="max"
                      name="max"
                      min="0"
                      max="100"
                      step="1"
                      style={{ width: "50%", maxWidth: "200px" }}
                      className="border-0 px-3 py-2.5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      onChange={handleMaxPriceChange}
                      value={maxPrice}
                    />
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      class="btn btn-success"
                      style={{ backgroundColor: "#69b550" }}
                      onClick={handleFilter}
                    >
                      FILTER
                    </button>
                  </div>
                </div>

                <br />
                {/* filter category */}
                <div>
                <label><strong>Filter by Category</strong></label>
                <label className="custom-control overflow-checkbox">
                  <input type="checkbox" className="overflow-control-input" />
                  &nbsp;&nbsp;
                  <span className="overflow-control-description">
                  PRODUITS LAITIERS
                  </span>
                </label>
                <label className="custom-control overflow-checkbox">
                  <input type="checkbox" className="overflow-control-input" />
                  &nbsp;&nbsp;
                  <span className="overflow-control-description">
                  FRUITS ET LÉGUMES
                  </span>
                </label>
                <label className="custom-control overflow-checkbox">
                  <input type="checkbox" className="overflow-control-input" />
                  &nbsp;&nbsp;
                  <span className="overflow-control-description">
                  PRODUITS CÉRÉALIERS
                  </span>
                </label>
                <br/>
                <label className="custom-control overflow-checkbox">
                  <input type="checkbox" className="overflow-control-input" />
                  &nbsp;&nbsp;
                  <span className="overflow-control-description">
                  EAU
                  </span>
                </label>
                <br/>
                <label className="custom-control overflow-checkbox">
                  <input type="checkbox" className="overflow-control-input" />
                  &nbsp;&nbsp;
                  <span className="overflow-control-description">
                  PATES
                  </span>
                </label>
                <label className="custom-control overflow-checkbox">
                  <input type="checkbox" className="overflow-control-input" />
                  &nbsp;&nbsp;
                  <span className="overflow-control-description">
                  VIANDE, POISSON ET FRUITS DE MER
                  </span>
                </label>
                <label className="custom-control overflow-checkbox">
                  <input type="checkbox" className="overflow-control-input" />
                  &nbsp;&nbsp;
                  <span className="overflow-control-description">
                  OTHER
                  </span>
                </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flex: "1 1 auto",
            minWidth: "320px",
            maxWidth: "70%",
            padding: "0 20px",
          }}
        >
          <div>
            <div className="container">
              <br></br>
              <br />
              <div className="row">
                {products &&
                  products.map((product) => (
                    <AllProductDetails
                      product={product}
                      key={product._id}
                      idUser={idUser}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
