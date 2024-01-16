import { Box, Flex, Text, useTab } from "@chakra-ui/react";
import React from "react";
import CrudIcon from "./CrudIcon";
import { LuX } from "react-icons/lu";

const CustomTab = React.forwardRef(({ t, onCloseTab }, ref) => {
  const tabProps = useTab({ ref });
  const isSelected = !!tabProps["aria-selected"];

  return (
    <Box w="200px">
      <Flex
        align="center"
        w="full"
        justify="space-between"
        borderTopColor="fuse.300"
        borderTopWidth={isSelected ? "2px" : "none"}
      >
        <Flex
          align="center"
          w="full"
          p="2"
          cursor="pointer"
          {...tabProps}
          _focusVisible={{ outline: "none" }}
          color={isSelected ? "white" : "gray.500"}
          _hover={{ color: "white" }}
        >
          <Box mr="1" mb="2px">
            <CrudIcon crud={t.crud} size="xs" />
          </Box>
          <Text fontSize="sm" noOfLines={1}>
            {t.title}
          </Text>
        </Flex>
        <Box borderRightWidth="1px" pr="1">
          <Flex
            p="1"
            _hover={{ bg: "gray.600", color: "white" }}
            color="gray.500"
            borderRadius="md"
            cursor="pointer"
            onClick={() => onCloseTab(t.id)}
          >
            <LuX size="14" />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
});
export default CustomTab;
