import axios from "axios";

import {
  ERRORS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  DELETE_PRODUCT,
  GET_SINGLE_PRODUCT,
} from "../types";

// export const AddProduct = (form, navigate) => async (dispatch) => {
//   await axios
//     .post("http://localhost:3600/product/addProduct", form)
//     .then((res) => {
//       navigate("/productsCreated");
//       dispatch({
//         type: ERRORS,
//         payload: {},
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: ERRORS,
//         payload: err.response.data,
//       });
//     });
// };

export const AddProduct = (form, idUser, navigate) => async (dispatch) => {
  const product = {
    ...form,
    username: idUser,
  };
  await axios
    .post("http://localhost:3600/product/addProduct", product)
    .then((res) => {
      setTimeout(() => {
        console.log('Waited for 3 seconds');
        navigate("/productsCreated");
        dispatch({
          type: ERRORS,
          payload: {},
        });
      }, 3000); // 3000ms = 3 seconds 
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

export const fetchProducts = (idUser) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3600/product/getProducts/" + idUser, {
      params: {
        random: Math.random(),
      },
    });
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

export const fetchAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3600/product/getAllProducts" , {
      params: {
        random: Math.random(),
      },
    });
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

export const deleteProduct = (id, navigate) => async (dispatch) => {
  try {
    const response = await axios.delete(
      "http://localhost:3600/product/deleteProduct/" + id
    );

    if (response.status === 200) {
      navigate("/productsCreated");
      const json = response.data; // or response.json()

      dispatch({ type: DELETE_PRODUCT, payload: json });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleProduct = (id, navigate) => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:3600/product/getSingleProduct/" + id
    );
    if (res.status === 200) {
      navigate("/updateProduct/" + id);
      dispatch({
        type: GET_SINGLE_PRODUCT,
        payload: res.data,
      });
      console.log(res.data);
    }
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

// export const updateProduct = (id, data, navigate) => async (dispatch) => {
//   try {
//     const res = await axios.put(
//       `http://localhost:3600/product/updateProduct/${id}`,
//       data
//     );
//     if (res.status === 200) {
//       navigate("/productsCreated");
//     }
//   } catch (error) {
//     dispatch({
//       type: FETCH_PRODUCTS_ERROR,
//       payload: error.message,
//     });
//   }
// };

export const updateProduct = (id, data, navigate) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:3600/product/updateProduct/${id}`,
      data
    );
    if (res.status === 200) {
      setTimeout(() => {
        console.log('Waited for 3 seconds');
        navigate("/productsCreated");
      }, 3000); // 3000ms = 3 seconds 
    }
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

export const UpdateImage = async (id, image) => {
  const response = await axios.put(
    `http://localhost:3600/product/updatePicture/${id}`,
    { image: image }
  );
};