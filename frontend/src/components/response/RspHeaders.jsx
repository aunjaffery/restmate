import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { LuCopy } from "react-icons/lu";

const RspHeaders = ({ headers }) => {
  console.log("heads -->", headers);
  const copyText = async () => {
    try {
      await navigator?.clipboard?.writeText(JSON.stringify(headers, null, 2));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box>
      <Flex
        mt="3"
        mb="1"
        justify="space-between"
        align="center"
        color="gray.500"
      >
        <Text fontWeight="bold" fontSize="sm">
          Header List
        </Text>
        <Flex align="center" mr="2">
          <Box
            p="1"
            cursor="pointer"
            borderRadius="md"
            onClick={copyText}
            _hover={{
              color: useColorModeValue("black", "white"),
            }}
          >
            <LuCopy size="16" />
          </Box>
        </Flex>
      </Flex>
      <Box
        borderTopWidth="1px"
        borderColor={useColorModeValue("light.50", "dark.50")}
        h="calc(100vh - 260px)"
        overflowY="auto"
      >
        {headers &&
          headers.map((h, id) => (
            <Flex
              key={id}
              borderWidth="1px"
              borderColor={useColorModeValue("light.50", "dark.50")}
              borderTopWidth={0}
              align="center"
              w="full"
              borderRadius="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              <Box
                borderRightWidth="1px"
                borderColor={useColorModeValue("light.50", "dark.50")}
                flex={1}
                w="50%"
                py="1"
                px="2"
              >
                <Text fontSize="sm" noOfLines={1} w="full">
                  {h.key}
                </Text>
              </Box>
              <Box flex={1} w="50%" px="2" py="1">
                <Text fontSize="sm" noOfLines={1} w="full">
                  {h.value}
                </Text>
              </Box>
            </Flex>
          ))}
      </Box>
    </Box>
  );
};

export default RspHeaders;
