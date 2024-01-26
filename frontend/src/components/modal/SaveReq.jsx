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
  useColorModeValue,
} from "@chakra-ui/react";
import { collection } from "../../ColStore";
import { useSnapshot } from "valtio";
import { LuBookmark } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa";
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
      collection.cols = [...r];
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
      <ModalContent bg={useColorModeValue("light.100", "dark.100")}>
        <ModalHeader
          borderBottomWidth="1px"
          borderColor={useColorModeValue("light.50", "dark.50")}
          color={useColorModeValue("gray.700", "gray.300")}
        >
          Save Request
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSaveReq}>
          <ModalBody>
            <Box py="4">
              <Box>
                <Text
                  color={useColorModeValue("gray.600", "gray.400")}
                  fontSize="xs"
                  fontWeight="bold"
                  mb="1"
                >
                  Request name
                </Text>
                <Input
                  size="sm"
                  name="name"
                  borderRadius="md"
                  borderColor={useColorModeValue("light.50", "dark.50")}
                  defaultValue={
                    req.name === "Untitled Request" ? req?.url : req?.name
                  }
                  isRequired
                />
              </Box>
              <Box mt="4">
                <Flex mb="1">
                  <Text
                    color={useColorModeValue("gray.600", "gray.400")}
                    fontSize="xs"
                    fontWeight="bold"
                  >
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
                  borderColor={useColorModeValue("light.50", "dark.50")}
                  maxH="500px"
                  minH="200px"
                  overflowY="auto"
                >
                  {cols && cols.length ? (
                    cols.map((c) => (
                      <Box
                        key={c.id}
                        _hover={{
                          color: useColorModeValue("black", "white"),
                          bg: useColorModeValue("light.200", "dark.200"),
                        }}
                        px="2"
                        py="2"
                        cursor="pointer"
                        onClick={() => setSelectedID(c.id)}
                        bg={
                          selectedID === c.id
                            ? useColorModeValue("light.200", "dark.200")
                            : "none"
                        }
                        color={
                          selectedID === c.id
                            ? "dark.300"
                            : useColorModeValue("gray.600", "gray.400")
                        }
                      >
                        <Flex align="center" gridColumnGap={1}>
                          <Box mb="2px">
                            {selectedID === c.id ? (
                              <FaBookmark size="14" />
                            ) : (
                              <LuBookmark size="14" />
                            )}
                          </Box>
                          <Text fontSize="sm" noOfLines={1} maxW="80%">
                            {c.name}
                          </Text>
                        </Flex>
                      </Box>
                    ))
                  ) : (
                    <Flex h="200px" justify="center" align="center">
                      <Text
                        fontSize="sm"
                        color={useColorModeValue("gray.400", "gray.600")}
                      >
                        No Collections found
                      </Text>
                    </Flex>
                  )}
                </Box>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="solid"
              mr={3}
              size="sm"
              type="submit"
              isDisabled={!selectedID}
            >
              Save
            </Button>
            <Button
              size="sm"
              variant="second"
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
