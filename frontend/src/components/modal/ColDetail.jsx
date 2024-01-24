import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const ColDetail = ({ isOpen, onClose, col }) => {
  console.log("---- ColDetail rerender ----");
  console.log(col);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="fuse.200">
        <ModalHeader borderBottomWidth="1px" borderBottomColor="gray.700">
          Collection
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p="4">
            <Flex
              justify="space-between"
              align="center"
              mb="6"
              pb="1"
              borderBottomWidth="1px"
              borderBottomColor="gray.700"
            >
              <Text>Restmate</Text>
              <Text
                color="blue.400"
                _hover={{ textDecoration: "underline" }}
                cursor="pointer"
              >
                rename
              </Text>
            </Flex>
            <Flex
              justify="space-between"
              align="center"
              mb="6"
              pb="1"
              borderBottomWidth="1px"
              borderBottomColor="gray.700"
            >
              <Text>Export Collection to JSON</Text>
              <Text
                color="green.400"
                _hover={{ textDecoration: "underline" }}
                cursor="pointer"
              >
                export
              </Text>
            </Flex>
            <Flex
              justify="space-between"
              align="center"
              mb="6"
              pb="1"
              borderBottomWidth="1px"
              borderBottomColor="gray.700"
            >
              <Text>Delete Collection</Text>
              <Text
                color="red.400"
                _hover={{ textDecoration: "underline" }}
                cursor="pointer"
              >
                delete
              </Text>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ColDetail;
