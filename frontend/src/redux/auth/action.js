import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignUpFunc = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const response = await axios.post("https://apirevly.onrender.com/auth/register", payload, { withCredentials: true });

    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    toast.success('Registration successful!', { position: toast.POSITION.TOP_CENTER });
    console.log(response);

  } catch (error) {
    dispatch({ type: REGISTER_FAIL });
    console.log(error);

    // Check if the error response contains specific information about duplicate email
    if (error.response && error.response.data && error.response.data.error) {
      toast.error(`Registration failed: ${error.response.data.error}`, { position: toast.POSITION.TOP_CENTER });
    } else {
      toast.error('Registration failed. Please try again later.', { position: toast.POSITION.TOP_CENTER });
    }
  }
};

export const Loginfunction = (data1) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  axios
    .post("https://apirevly.onrender.com/auth/login", data1, { withCredentials: true })
    .then((response) => {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      toast.success('Login successful!', { position: toast.POSITION.TOP_CENTER });

    })
    .catch((error) => {
      dispatch({ type: LOGIN_FAIL });
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`Login failed: ${error.response.data.error}`, { position: toast.POSITION.TOP_CENTER });
      } else {
        toast.error('Login failed. Please try again later.', { position: toast.POSITION.TOP_CENTER });
      }
    });
};
