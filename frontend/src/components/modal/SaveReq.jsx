import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { collection, getCollections } from "../../ColStore";
import { useSnapshot } from "valtio";
import { LuBookmark } from "react-icons/lu";
import { useState } from "react";
import { SaveToCollection } from "../../../wailsjs/go/main/App";

const SaveReq = ({ isOpen, onClose, req }) => {
  console.log("---- inModal rerender ----");
  const [selectedID, setSelectedID] = useState(null);
  const { cols } = useSnapshot(collection);
  const onSaveReq = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    if (!selectedID || !name || !req) return;
    req.col_id = selectedID;
    req.name = name;
    try {
      let r = await SaveToCollection(req);
      console.log("Rsp ->", r);
      setSelectedID(null);
      onClose();
      await getCollections();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSelectedID(null);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent bg="fuse.200">
        <ModalHeader>Save Request</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSaveReq}>
          <ModalBody>
            <Box>
              <Box>
                <Text color="gray.400" fontSize="xs" fontWeight="bold" mb="1">
                  Request name
                </Text>
                <Input
                  size="sm"
                  bg="gray.700"
                  name="name"
                  borderRadius="md"
                  borderWidth={0}
                  defaultValue={
                    req.name === "Untitled Request" ? req?.url : req?.name
                  }
                  isRequired
                />
              </Box>
            </Box>
            <Box mt="4">
              <Flex mb="1">
                <Text color="gray.400" fontSize="xs" fontWeight="bold">
                  Save to
                </Text>
                <Text color="gray.500" fontSize="xs" ml="1">
                  Select a collection
                </Text>
              </Flex>
              <Box
                bg="none"
                py="2"
                borderWidth="1px"
                borderColor="gray.700"
                maxH="500px"
                overflowY="auto"
              >
                {cols &&
                  cols.length &&
                  cols.map((c) => (
                    <Box
                      key={c.id}
                      _hover={{ bg: "gray.800" }}
                      px="2"
                      py="2"
                      cursor="pointer"
                      onClick={() => setSelectedID(c.id)}
                      bg={selectedID === c.id ? "gray.800" : "none"}
                      color={selectedID === c.id ? "fuse.300" : "gray.200"}
                    >
                      <Flex align="center" gridColumnGap={1}>
                        <Box mb="5px">
                          <LuBookmark size="14" />
                        </Box>
                        <Text fontSize="sm">{c.name}</Text>
                      </Flex>
                    </Box>
                  ))}
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              bg="fuse.300"
              color="white"
              mr={3}
              size="sm"
              type="submit"
              isDisabled={!selectedID}
            >
              Save
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setSelectedID(null);
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default SaveReq;
