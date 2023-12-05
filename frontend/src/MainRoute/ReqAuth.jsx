import React from 'react'

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';


const ReqAuth = ({ children }) => {
  const isAuthenticated = useSelector((store) => store.auth.isAuth);
  const location = useLocation();

 


  if (!isAuthenticated ) {
  
    return <Navigate to="/login" replace state={{ data: location.pathname }} />;
  }


  return children;
};


export default ReqAuth;
