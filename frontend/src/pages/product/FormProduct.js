import React, { useState } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, UploadImage } from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
import Classnames from "classnames";
import jwt_decode from "jwt-decode";

function FormProduct() {
  console.log(localStorage.getItem("jwt"))
  const token = localStorage.getItem("jwt")
  console.log(jwt_decode(token))
  const idUser = jwt_decode(token).id
  
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState([]);
  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    //console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const errors = useSelector((state) => state.errors);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //pour ne rien afficher dans l'url
    dispatch(AddProduct(form, idUser, navigate), UploadImage(image));
  };

  return (
    <form className="create" method="POST" onSubmit={handleSubmit}>
      <h3>Add a New Product</h3>

      <label>category:</label>
      <Inputs
        name="category"
        type="text"
        placeholder="category"
        onChangeHandler={onChangeHandler}
        errors={errors.category}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Type:</label>
      <Inputs
        name="type"
        type="text"
        placeholder="type"
        onChangeHandler={onChangeHandler}
        errors={errors.type}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Brand:</label>
      <Inputs
        name="brand"
        type="text"
        placeholder="brand"
        onChangeHandler={onChangeHandler}
        errors={errors.brand}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Price:</label>
      <Inputs
        name="price"
        type="number"
        placeholder="price"
        onChangeHandler={onChangeHandler}
        errors={errors.price}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Quantity:</label>
      <Inputs
        name="quantity"
        type="number"
        placeholder="quantity"
        onChangeHandler={onChangeHandler}
        errors={errors.quantity}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Expiry date:</label>
      <Inputs
        name="expiry_date"
        type="date"
        placeholder="expiry_date"
        onChangeHandler={onChangeHandler}
        errors={errors.expiry_date}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Description:</label>
      <textarea
        name="description"
        type="text"
        placeholder="Description..."
        class={Classnames("form-control")}
        onChange={onChangeHandler}
      />
      <label className="form-label form-label-top form-label-auto">
        Upload Picture
      </label>
      <div className="form-outline mb-4">
        <input
          onChange={handleImage}
          type="file"
          id="formupload"
          name="image"
          className="form-control"
        />
      </div>
      <img className="img-fluid" src={image} alt="" />

      <button
        type="submit"
        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
      >
        Add Product
      </button>
    </form>
  );
}

export default FormProduct;
