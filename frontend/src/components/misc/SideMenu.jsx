import { Box, Flex, Text } from "@chakra-ui/react";
import { LuBookmark, LuFileCog, LuSettings } from "react-icons/lu";

const SideMenu = ({ onToggle }) => {
  let menuStyle = {
    direction: "column",
    align: "center",
    borderRadius: "md",
    cursor: "pointer",
    py: "2",
    _hover: {
      color: "white",
      bg: "fuse.200",
    },
  };
  return (
    <Box borderColor="gray.700" borderRightWidth="1px" w="80px" maxW="80px">
      <Flex direction="column" gridRowGap="2" mt="2" color="gray.400">
        <Flex {...menuStyle} onClick={onToggle}>
          <LuBookmark size="18" />
          <Text fontSize="xs" mt="1">
            Collections
          </Text>
        </Flex>
        <Flex {...menuStyle}>
          <LuFileCog size="18" />
          <Text fontSize="xs" mt="1">
            Variables
          </Text>
        </Flex>
        <Flex {...menuStyle}>
          <LuSettings size="18" />
          <Text fontSize="xs" mt="1">
            Settings
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SideMenu;
