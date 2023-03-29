import React, { useState, useCallback, useEffect } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Classnames from "classnames";
import { UpdateImage, updateProduct } from "../../redux/actions/productActions";
import axios from "axios";

function FormUpdateProduct() {
  const [data, setData] = useState({});
  const [image, setImage] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const errors = useSelector((state) => state.errors);

  var curr = new Date();
  const [date, setDate] = useState(curr.toISOString().substring(0, 10));
 
  const getProduct = useCallback(async () => {
    const { data } = await axios.get(`http://localhost:3600/product/getSingleProduct/${id}`);
    setData(data);
    setImage(data.image.url);
    
    curr = new Date(data.expiry_date);
    curr.setDate(curr.getDate());
    setDate(curr.toISOString().substring(0, 10));
  }, [id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

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

  const onChangeHandler = (e) =>
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault(); //pour ne rien afficher dans l'url
    dispatch(updateProduct(id, data, navigate), UpdateImage(id, image));  
  };


  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Product</h3>

      <label>category:</label>
      <Inputs
        name="category"
        type="text"
        placeholder="category"
        onChangeHandler={onChangeHandler}
        errors={errors.category}
        value={data.category || ""} 
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Type:</label>
      <Inputs
        name="type"
        type="text"
        placeholder="type"
        onChangeHandler={onChangeHandler}
        errors={errors.type}
        value={data.type || ""} 
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Brand:</label>
      <Inputs
        name="brand"
        type="text"
        placeholder="brand"
        onChangeHandler={onChangeHandler}
        errors={errors.brand}
        value={data.brand || ""} 
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Price:</label>
      <Inputs
        name="price"
        type="number"
        placeholder="price"
        onChangeHandler={onChangeHandler}
        errors={errors.price}
        value={data.price || ""} 
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Quantity:</label>
      <Inputs
        name="quantity"
        type="number"
        placeholder="quantity"
        onChangeHandler={onChangeHandler}
        errors={errors.quantity}
        value={data.quantity || ""} 
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Expiry date:</label>
      <Inputs
        name="expiry_date"
        type="date"
        placeholder="expiry_date"
        onChangeHandler={onChangeHandler}
        errors={errors.expiry_date}
        value={date}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      <label>Description:</label>
      <textarea
        name="description"
        type="text"
        placeholder="Description..."
        value={data.description || ""}
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
        Update Product
      </button>
    </form>
  );
}

export default FormUpdateProduct;
