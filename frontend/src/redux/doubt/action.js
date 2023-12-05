import axios from "axios";
import * as types from "./actionTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GetDoubt = (subjectFilter) => (dispatch) => {
  dispatch({ type: types.GET_DOUBT_REQUEST });
  return axios
    .get(`https://apirevly.onrender.com/doubt/history?subject=${subjectFilter}`, { withCredentials: true })
    .then((res) => {
      dispatch({ type: types.GET_DOUBT_SUCCESS, payload: res.data.doubts  });
    })
    .catch((e) => {
      dispatch({ type: types.GET_DOUBT_FAILURE, payload: e });
    });
};


export const PostDoubt = (payload) => async (dispatch) => {
    try {
      dispatch({ type: types.POST_DOUBT_REQUEST });
      const response = await axios.post("https://apirevly.onrender.com/doubt/create", payload, { withCredentials: true });
  
      dispatch({ type: types.POST_DOUBT_SUCCESS, payload: response.data });
      toast.success('Doubt Successfully Posted ', { position: toast.POSITION.TOP_CENTER });
      console.log(response);
  
    } catch (error) {
      dispatch({ type: types.POST_DOUBT_FAILURE });
      console.log(error);
  
      // Check if the error response contains specific information about duplicate email
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Request failed Please enter all the fields : ${error.response.data.error}`, { position: toast.POSITION.TOP_CENTER });
      } else {
        toast.error('Request failed Please enter all the fields.', { position: toast.POSITION.TOP_CENTER });
      }
    }
  };

  export const deleteDoubt = (id) => (dispatch) => {
    dispatch({ type: types.DELETE_DOUBT_REQUEST });
  
    return axios
      .delete(`https://apirevly.onrender.com/doubt/delete/${id}`)
      .then((res) => {
        dispatch({ type: types.DELETE_DOUBT_SUCCESS, payload: res.data });
        toast.success('Doubt Successfully Deleted', { position: toast.POSITION.TOP_CENTER });
        console.log(res);
      })
      .catch((e) => {
        dispatch({ type: types.DELETE_DOUBT_FAILURE, payload: e });
        toast.error('Failed to delete the doubt. Please try again.', { position: toast.POSITION.TOP_CENTER });
        console.log(e);
      });
  };
  
  export const editDoubt = (id, payload) => (dispatch) => {
    dispatch({ type: types.EDIT_DOUBT_REQUEST });
    return axios
      .put(`https://apirevly.onrender.com/doubt/edit/${id}`, payload)
      .then((r) => {
        dispatch({ type: types.EDIT_DOUBT_SUCCESS, payload: r.data });
        toast.success('Doubt Successfully Edited', { position: toast.POSITION.TOP_CENTER });
      })
      .catch((e) => {
        dispatch({ type: types.EDIT_DOUBT_FAILURE, payload: e });
        toast.error('Failed to edit the doubt. Please try again.', { position: toast.POSITION.TOP_CENTER });
        console.log(e);
      });
  };
  
