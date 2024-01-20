import { Box, Flex, Text } from "@chakra-ui/react";
import { LuBookmark, LuFileCog, LuSettings } from "react-icons/lu";

const NavMenu = () => {
  return (
    <Box px="2" borderBottom="1px" borderColor="gray.700" h="35px">
      <Flex w="full" justify="space-between" align="center" color="gray.400" h="full">
        <Box></Box>
        <Flex align="center">
          <Flex align="center" _hover={{ color: "fuse.300" }} cursor="pointer">
            <LuBookmark size="14" />
            <Text fontSize="xs" ml="1">
              collections
            </Text>
          </Flex>
          <Flex
            align="center"
            ml="4"
            _hover={{ color: "fuse.300" }}
            cursor="pointer"
          >
            <LuFileCog size="14" />
            <Text fontSize="xs" ml="1">
              environments
            </Text>
          </Flex>
          <Flex
            align="center"
            ml="4"
            _hover={{ color: "fuse.300" }}
            cursor="pointer"
          >
            <LuSettings size="14" />
            <Text fontSize="xs" ml="1">
              settings
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavMenu;
