import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  Center,
} from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpFunc } from '../redux/auth/action';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.accountCreate);
  const loading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    classGrade: '',
    language: '',
    specialized: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(SignUpFunc(formData));

      setFormData({
        name: '',
        email: '',
        password: '',
        role: '',
        classGrade: '',
        language: '',
        specialized: '',
      });

    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  useEffect(() => {
    if (data) {
      const timeoutId = setTimeout(() => {
        navigate('/login');
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [data, navigate]);
  const backgroundImage = "https://plus.unsplash.com/premium_photo-1667391502030-89867e58f9cc?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <Box   backgroundImage={`url(${backgroundImage})`}
    backgroundSize="cover"
    backgroundPosition="center"
    minHeight="100vh">
 <Center h="100vh">
      <Box
        p={8}
        w="30%"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        bg="white"
      > 
      <Text  fontFamily="sans-serif" fontSize={50}  mb={3} >
         Register 
      </Text>
      <Text fontFamily="sans-serif"  fontSize={15}  as='b' mb={3} >
       Enjoy your Learning.....  
      </Text>
     
        <form  onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>

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

          <FormControl mb={4}>
            <FormLabel>Role</FormLabel>
            <Select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </Select>
          </FormControl>

          {formData.role === 'student' && (
            <FormControl mb={4}>
              <FormLabel>Class Grade</FormLabel>
              <Input
                type="text"
                name="classGrade"
                value={formData.classGrade}
                onChange={handleChange}
              />
            </FormControl>
          )}

          <FormControl mb={4}>
            <FormLabel>Language</FormLabel>
            <Input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
          </FormControl>

          {formData.role === 'tutor' && (
            <FormControl mb={4}>
              <FormLabel>Specialized</FormLabel>
              <Select
                name="specialized"
                value={formData.specialized}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="web-development">Web Development</option>
                <option value="android-development">Android Development</option>
                <option value="react-development">React Development</option>
              </Select>
            </FormControl>
          )}

          <Button
            colorScheme="teal"
            type="submit"
            isLoading={loading}
            spinner={<BeatLoader size={8} color="white" />}
          >
            Register
          </Button>

          <Text mt={4}>
            Already have an account? <Link to="/login"><Text color="green.500"  >Login</Text></Link>
          </Text>
        </form>
        <ToastContainer />
      </Box>
    </Center>
    </Box>
   
  );
};

export default RegistrationForm;
