import { Box, Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React from "react";
import SideMenu from "./SideMenu";
import CollDrawer from "../collection/CollDrawer";

const Layout = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      bg={useColorModeValue(
        "none",
        "linear-gradient(90deg, rgb(18, 34, 48) 0px, rgb(9, 17, 24))",
      )}
    >
      <Box h="100vh" w="100vw">
        <Flex h="full" w="full">
          <SideMenu onToggle={onToggle} />
          {isOpen ? <CollDrawer /> : null}
          <Box w={isOpen ? "calc(100vw - 380px)" : "calc(100vw - 80px)"}>
            {children}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default Layout;
