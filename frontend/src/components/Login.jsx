import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Center,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loginfunction } from '../redux/auth/action';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
const Login = () => {

  const dispatch = useDispatch()
  const data = useSelector((state)=>state.auth.isAuth)
  const loading = useSelector((state) => state.auth.isLoading);
  console.log(data)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log('Login form submitted:', formData);
    dispatch(Loginfunction(formData));
    console.log('Form submitted:', formData);
    setFormData({
     
      email: '',
      password: '',
     
    });
  };

  
  useEffect(() => {
    if (data) {
  
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 2000);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [data, navigate]);
        const backgroundImage = "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D"
  return (
    <Box backgroundImage={`url(${backgroundImage})`}
    backgroundSize="cover"
    backgroundPosition="center"
    minHeight="100vh">
     
      <Center  h="100vh">
      <Box bg="white" p={10} maxW="lg" borderWidth="1px" borderRadius="lg" boxShadow="md" >
      <Text fontFamily="sans-serif" as="b" fontSize={20}>Login</Text>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>

          <Button   colorScheme="teal"
            type="submit"
            isLoading={loading}
            spinner={<BeatLoader size={8} color="white" />}>
            Login
          </Button>

          <Text mt={4}>
        Don't have an account? <Link to="/register"><Text color="green"  >Register</Text></Link>
      </Text>
        </form>
        <ToastContainer />
      </Box>
     
    </Center>
    </Box>
    
  );
};



export default Login;
