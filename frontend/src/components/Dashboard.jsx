import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
 
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
 
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetDoubt, deleteDoubt, editDoubt } from "../redux/doubt/action";
import { ToastContainer } from "react-toastify";
import { BeatLoader } from 'react-spinners';
const Dashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.doubt.isLoading);
  const loading1 = useSelector((state) => state);
  console.log(loading1)
  const data = useSelector((state) => state.doubt.Doubt);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    id: "", // Add a field to store the doubt id
    subject: "",
    query: "",
    details: "",
  });

  const [id, setId] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterChange = (e) => {
    setSubjectFilter(e.target.value);
  };

  const handleEdit = (doubt) => {
    setId(doubt._id);
    setFormData({
      subject: doubt.subject,
      query: doubt.query,
      details: doubt.details,
    });
    onOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch editDoubt action
    await dispatch(editDoubt(id, formData));
    await dispatch(GetDoubt(subjectFilter));
    // Close the modal
    onClose();
  };

  useEffect(() => {
    dispatch(GetDoubt(subjectFilter));
  }, [dispatch]);

  const handleDelete = async (doubtId) => {
    await dispatch(deleteDoubt(doubtId));

    await dispatch(GetDoubt(subjectFilter));
  };







  const slides = [
    {
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      img: "https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      img: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = "right";
  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);

  return (
    <Box bg="gray.100">
      
     <Box  > <Flex
      w="90%"
     m="auto"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={10}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" overflow="hidden">
        <Flex pos="relative" h="400px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
                whiteSpace="nowrap"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide.img}
                alt="carousel image"
                boxSize="full"
                backgroundSize="cover"
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex></Box>
  <Container py={2} px={51} maxW="container.lg" mt={8} bg="gray.200" >
   
   <Flex w="50%" mt="50" gap={10}>
     <Link to="/doubt">
       <Button colorScheme="yellow" >Ask your Doubt</Button>
     </Link>
     <FormControl>
       <FormLabel>Filter by Subject</FormLabel>
       <Input
         type="text"
         value={subjectFilter}
         onChange={handleFilterChange}
         placeholder="Enter subject name"
       />
     </FormControl>
   </Flex>
   <Box mt={10}>
     <Text fontSize="2xl" mb={4}>
       Doubt History
     </Text>
     {data && data.length > 0 ? (
       <Table borderRadius={10} bg="linear-gradient(135deg, #66ea6a 0%, #764ba2 100%)" variant="simple" mb="20">
         <Thead>
           <Tr>
             <Th>Subject</Th>
             <Th>Query</Th>
             <Th>Details</Th>
             <Th>Actions</Th>
           </Tr>
         </Thead>
         <Tbody>
           {data
             .filter((el) =>
               el.subject.toLowerCase().includes(subjectFilter.toLowerCase())
             )
             .map((el) => (
               <Tr key={el._id}>
                 <Td>{el.subject}</Td>
                 <Td>{el.query}</Td>
                 <Td>{el.details}</Td>
                 <Td>
                   <Flex gap={10}>
                     {/* Edit Button */}
                     <Button
                       colorScheme="teal"
                       isLoading={loading}
                       spinner={<BeatLoader size={8} color="white" />}
                       mr={2}
                       onClick={() => handleEdit(el)}
                     >
                       Edit
                     </Button>
                     {/* Delete Button */}
                     <Button
                       colorScheme="red"
                       isLoading={loading}
                       spinner={<BeatLoader size={8} color="white" />}
                       onClick={() => handleDelete(el._id)}
                     >
                       Delete
                     </Button>
                   </Flex>
                 </Td>
               </Tr>
             ))}
         </Tbody>
       </Table>
     ) : (
       <Heading >No Doubts Currently</Heading>
     )}
     {/* Edit Modal */}
     <Modal isOpen={isOpen} onClose={onClose}>
       <ModalOverlay />
       <ModalContent>
         <ModalHeader>Edit Doubt</ModalHeader>
         <ModalCloseButton />
         <ModalBody>
           <form onSubmit={handleSubmit}>
             <FormControl mb={4}>
               <FormLabel>Subject</FormLabel>
               <Input
                 type="text"
                 name="subject"
                 value={formData.subject}
                 onChange={handleChange}
                 placeholder="Enter subject"
               />
             </FormControl>

             <FormControl mb={4}>
               <FormLabel>Short Subject</FormLabel>
               <Input
                 type="text"
                 name="query"
                 value={formData.query}
                 onChange={handleChange}
                 placeholder="Enter your query"
               />
             </FormControl>

             <FormControl mb={4}>
               <FormLabel>Doubt in Details</FormLabel>
               <Textarea
                 name="details"
                 value={formData.details}
                 onChange={handleChange}
                 placeholder="Enter details"
               />
             </FormControl>

             <Button type="submit"   isLoading={loading}
         spinner={<BeatLoader size={8} color="white" />} colorScheme="teal" mt={4} w="100%">
               Update Doubt
             </Button>
           </form>
         </ModalBody>
       </ModalContent>
     </Modal>
   </Box>
   <ToastContainer />
 </Container>
    
    </Box>
   
  );
};

export default Dashboard;
