import React, { useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { GetDoubt } from "../redux/doubt/action";

const DoubtHistory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.doubt.Doubt);


  useEffect(() => {
    dispatch(GetDoubt());
  }, [dispatch]);

  const handleEdit = (doubtId) => {
    // Add logic to handle edit action
    console.log("Edit Doubt:", doubtId);
  };

  const handleDelete = (doubtId) => {
    // Add logic to handle delete action
    console.log("Delete Doubt:", doubtId);
  };

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Doubt History
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Subject</Th>
            <Th>Query</Th>
            <Th>Details</Th>
            <Th>Status</Th>
            <Th>Actions</Th> {/* New column for actions */}
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((el) => (
              <Tr key={el._id}>
                <Td>{el.subject}</Td>
                <Td>{el.query}</Td>
                <Td>{el.details}</Td>
                <Td>{el.status}</Td>
                <Td>
                  {/* Edit Button */}
                  <Flex gap={10}>
                  <Button colorScheme="teal" mr={2} onClick={() => handleEdit(el._id)}>
                    Edit
                  </Button>
                  {/* Delete Button */}
                  <Button colorScheme="red" onClick={() => handleDelete(el._id)}>
                    Delete
                  </Button>
                  </Flex>
                 
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DoubtHistory;
