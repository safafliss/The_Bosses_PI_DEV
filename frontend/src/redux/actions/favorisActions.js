import axios from "axios";

import { FETCH_FAVORIS_SUCCESS, FETCH_FAVORIS_ERROR, ERRORS } from "../types";

export const AddFavoris = (idUser, product) => async (dispatch) => {
  await axios
    .post(`http://localhost:3600/favoris/addFavoris`,
    { username: idUser, productsFavoris: product })
    .then((res) => {
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

export const fetchFavoris = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
        "http://localhost:3600/favoris/getFavoris/" + id
    );
    dispatch({
      type: FETCH_FAVORIS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_FAVORIS_ERROR,
      payload: error.message,
    });
  }
};
