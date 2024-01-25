import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { LuDownload, LuPencil, LuTrash } from "react-icons/lu";

const ColDetail = ({ isOpen, onClose, col }) => {
  const { isOpen: isOpenR, onToggle: onToggleR } = useDisclosure();
  console.log("---- ColDetail rerender ----");
  console.log(col);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("light.100", "dark.100")}>
        <ModalHeader
          borderBottomWidth="1px"
          borderColor={useColorModeValue("light.50", "dark.50")}
          color={useColorModeValue("gray.700", "gray.300")}
        >
          Collection
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p="4">
            {isOpenR ? (
              <Flex justify="space-between" align="center" mb="6">
                <Input
                  defaultValue="restmate"
                  size="sm"
                  p="1"
                  borderWidth={0}
                  borderBottomWidth="1px"
                  borderBottomColor="dark.300"
                  _focusVisible={{ outline: "none" }}
                  _hover={{ borderBottomColor: "dark.300" }}
                />
                <Button
                  bg="blue.400"
                  size="sm"
                  ml="4"
                  px="4"
                  onClick={onToggleR}
                >
                  Rename
                </Button>
              </Flex>
            ) : (
              <Flex
                justify="space-between"
                align="center"
                mb="6"
                pb="1"
                borderBottomWidth="1px"
                borderColor={useColorModeValue("light.50", "dark.50")}
              >
                <Text
                  color={useColorModeValue("gray.600", "gray.400")}
                  fontSize="sm"
                >
                  Restmate
                </Text>
                <Box
                  p="2"
                  color="blue.400"
                  _hover={{ bg: "blue.400", color: "white" }}
                  borderRadius="md"
                  onClick={onToggleR}
                  cursor="pointer"
                >
                  <LuPencil size="16" />
                </Box>
              </Flex>
            )}
            <Flex
              justify="space-between"
              align="center"
              mb="6"
              pb="1"
              borderBottomWidth="1px"
              borderColor={useColorModeValue("light.50", "dark.50")}
            >
              <Text
                color={useColorModeValue("gray.600", "gray.400")}
                fontSize="sm"
              >
                Export Collection to JSON
              </Text>
              <Box
                p="2"
                color="blue.400"
                _hover={{ bg: "blue.400", color: "white" }}
                borderRadius="md"
                cursor="pointer"
              >
                <LuDownload size="16" />
              </Box>
            </Flex>
            <Flex
              justify="space-between"
              align="center"
              mb="6"
              pb="1"
              borderBottomWidth="1px"
              borderColor={useColorModeValue("light.50", "dark.50")}
            >
              <Text
                color={useColorModeValue("gray.600", "gray.400")}
                fontSize="sm"
              >
                Delete Collection
              </Text>
              <Box
                p="2"
                color="red.400"
                _hover={{ bg: "red.400", color: "white" }}
                borderRadius="md"
                cursor="pointer"
              >
                <LuTrash size="16" />
              </Box>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ColDetail;
