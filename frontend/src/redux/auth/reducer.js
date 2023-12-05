import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes";


const initialState = {
    isLoading: false,
    isError: false,
    accountCreate: false,
    isAuth: false,
    User:[]
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case REGISTER_REQUEST:
        return {
          ...state,
         isLoading: true,
         accountCreate: false,
         isAuth: false,
         isError:false,
        };
  
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          accountCreate:true,
          isAuth: false,
         isError:false,
        };
  
      case REGISTER_FAIL:
        return {
          ...state,
          isLoading: false,
           isAuth: false,
           accountCreate: false,
         isError:true,
        };
  
      case LOGIN_REQUEST:
        return {
          ...state,
          isLoading: true,
          isAuth: false,
          isError:false,
          accountCreate: false,
        };
  
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isAuth: true,
          User: payload,
          isError: false,
        };
  
      case LOGIN_FAIL:
        return {
          ...state,
          isLoading: false,
          isError: true,
          isAuth: false,
        };
      
      default:
        return state;
    }
  };
  