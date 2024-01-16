import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Layout = ({ children }) => {
  return (
    <Box
      bg={useColorModeValue(
        "none",
        "linear-gradient(90deg, rgb(18, 34, 48) 0px, rgb(9, 17, 24))",
      )}
    >
      <Box h="100vh">{children}</Box>
    </Box>
  );
};
export default Layout;
