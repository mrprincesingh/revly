import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { PostDoubt } from "../redux/doubt/action";
import { Link, useNavigate } from "react-router-dom";

const Doubt = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector((state)=>state.doubt)

    console.log(data)
  const [formData, setFormData] = useState({
    subject: "",
    query: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log("Form Data:", formData);
    dispatch(PostDoubt(formData));
    setFormData({
        subject: "",
        query: "",
        details: "",
      });
     setTimeout(() => {
        navigate('/');
      }, 2000);

  };
  const backgroundImage = "https://images.unsplash.com/photo-1559667671-ac3a86ceeb4a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <>
  <Box backgroundImage={`url(${backgroundImage})`}
    backgroundSize="cover"
    backgroundPosition="center"
    minHeight="100vh">
     <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh" // Set minimum height to take up the entire viewport
      
    >
      <Box
        maxW="500px"
        p="50"
     
      
        width="100%" 
        border="1px solid #999"
        bg="#fff"
        borderRadius="22px"
        boxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0.06), 1px 2px 5px 0px rgba(0, 0, 0, 0.06), 4px 8px 9px 0px rgba(0, 0, 0, 0.05), 9px 18px 12px 0px rgba(0, 0, 0, 0.03), 16px 32px 14px 0px rgba(0, 0, 0, 0.01), 25px 49px 16px 0px rgba(0, 0, 0, 0.00)"
      >
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel fontWeight="bold" fontSize="lg" color="teal.500">
              Subject
            </FormLabel>
            <Select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Select subject"
            
             
            >
              <option value="web-development">Web Development</option>
              <option value="android-development">Android Development</option>
              <option value="react-development">React Development</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontWeight="bold" fontSize="lg" color="teal.500">
              Short Subject
            </FormLabel>
            <Input
              type="text"
              name="query"
              value={formData.query}
              onChange={handleChange}
              placeholder="Enter your query"
         
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel fontWeight="bold" fontSize="lg" color="teal.500">
              Doubt in Details
            </FormLabel>
            <Textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter details"
            
            />
          </FormControl>

          {/* Add more form controls as needed for other fields */}
          
          <Button type="submit" colorScheme="teal" mt={4} w="100%">
            Submit
          </Button>
        </form>
        <ToastContainer />
      </Box>
      <Box mt="10" w="100%" alignItems="center">
        <Link to="/">
        <Button colorScheme='yellow'>Home</Button>
        </Link>
      
    </Box>
    </Box>
  </Box>
   
    </>
    
  );
};

export default Doubt;
