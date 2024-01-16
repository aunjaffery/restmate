import { Text } from "@chakra-ui/react";
import React from "react";

const CrudIcon = ({ crud, size = "xs" }) => {
  const getColor = () => {
    if (crud === "GET") {
      return "green.500";
    }
    if (crud === "POST") {
      return "yellow.500";
    }
    if (crud === "PUT") {
      return "blue.500";
    }
    if (crud === "DEL") {
      return "pink.500";
    }
    return "gray.500";
  };
  return (
    <Text
      color={getColor}
      fontSize={size}
      fontWeight="bold"
      textTransform="uppercase"
    >
      {crud}
    </Text>
  );
};

export default CrudIcon;
