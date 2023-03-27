import axios from "axios";
import { ERRORS, FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_SUCCESS } from "../types";

export const AddProduct = (form, navigate) => (dispatch) => {  
  axios
    .post("http://localhost:3600/product/addProduct", form)
    .then((res) => {
      navigate("/addSuccPro");
      dispatch({
        type: ERRORS,
        payload: {},
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

export const UploadImage = async (image) => {
  const response = await axios.post(
    `http://localhost:3600/product/uploadImageProduct`,
    { image: image }
  );
};

export const fetchProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3600/product/getProducts" ,{
      params: {
        random: Math.random(),
      }});
    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};
