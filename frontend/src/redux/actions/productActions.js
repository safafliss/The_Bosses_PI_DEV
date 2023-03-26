import axios from "axios";
import { ERRORS, SET_PRODUCT } from "../types";

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
  //console.log(response.data);
};
