import axios from 'axios';
import { ERRORS, SET_PROFILE, SET_PROFILES, DELETE_PROFILE, UPDATE_PROFILE, BAN_PROFILE } from '../types';
import { setAuth } from '../../util/setAuth';

export const AddProfile = (form, setShow, setMessage) => (dispatch) => {
  axios
    .post('/api/profiles', form)
    .then((res) => {
      setShow(true);
      setMessage('User added with success');
      dispatch({
        type: ERRORS,
        payload: {},
      });
      setTimeout(() => {
        setShow(false);
      }, 4000);
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

export const GetProfile = (userId) => (dispatch) => {
  console.log('getProfile', userId);
  axios
    .get('http://localhost:3600/api/getUser/' + userId)
    .then((res) => {
      console.log('res chfeha', res.data)
      dispatch({
        type: SET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

export const UpdateProfile = (user) => (dispatch) => {
  axios
    .put('http://localhost:3600/api/updateProfile/', user)
    .then((res) => {
      console.log('update profile', res.data)
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

// const token = {
//   Authorization: `${localStorage.getItem('jwt')}`,
// };
export const getUsers = () => (dispatch) => {
  axios
    .get(
      'http://localhost:3600/api/getUsers'
      // {
      //   headers: {
      //     Authorization: localStorage.getItem('jwt'), // Pass token in the Authorization header using Bearer scheme
      //   }
      // }
    )
    .then((res) => {
      dispatch({
        type: SET_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};

export const DeleteProfile = (id) => (dispatch) => {
  if (window.confirm('are you sure to delete this user?')) {
    axios
      .delete(`http://localhost:3600/api/profiles/` + id)
      .then((res) => {
        dispatch({
          type: DELETE_PROFILE,
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: ERRORS,
          payload: err.response,
        });
      });
  }

  
};

export const BanProfile = (_id, banDuration) => (dispatch) => {
  axios
    .post('/api/banProfile',{_id, banDuration} )
    .then((res) => {
      dispatch({
        type: BAN_PROFILE,
        payload: {},
      });
      console.log(res);
    })
    .catch((err) => {
      dispatch({
        type: ERRORS,
        payload: err.response.data,
      });
    });
};
