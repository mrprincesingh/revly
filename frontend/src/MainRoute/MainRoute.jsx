
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import ReqAuth from "./ReqAuth";
import Doubt from "../components/Doubt";


const MainRoutes = () => {
    return (
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
       
        <Route path="/" element={ <ReqAuth> <Dashboard /></ReqAuth>} /> 
        <Route path="/doubt" element={ <ReqAuth> <Doubt /></ReqAuth>} /> 
      </Routes>
    );
  };
  export { MainRoutes };