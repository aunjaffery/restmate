import { Box, Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React from "react";
import SideMenu from "./SideMenu";
import CollDrawer from "../collection/CollDrawer";

const Layout = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box pt="1" bg={useColorModeValue("light.100", "dark.100")}>
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
