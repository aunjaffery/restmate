import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { LuMoreHorizontal, LuPlus } from "react-icons/lu";
import Data from "./fake";
import CrudIcon from "../misc/CrudIcon";
import { openColTab } from "../../AppStore";

const CollDrawer = () => {
  let onAdd = (r) => {
		console.log(Data)
    if (r.id !== "pop01" && r.id !== "pop02") return;
    openColTab(r);
  };
  return (
    <Box w="300px" minW="300px" borderColor="gray.700" borderRightWidth="1px">
      <Flex
        borderColor="gray.700"
        borderBottomWidth="1px"
        h="37px"
        align="center"
        pl="4"
        justify="space-between"
      >
        <Text fontSize="sm" fontWeight="bold">
          Collections
        </Text>
        <Box
          p="1"
          mr="2"
          borderRadius="lg"
          color="gray.500"
          cursor="pointer"
          _hover={{
            bg: "gray.600",
            color: "white",
          }}
        >
          <LuPlus />
        </Box>
      </Flex>
      <Box mt="4">
        <Accordion allowToggle>
          {Data.map((d) => (
            <AccordionItem key={d.id} border="none">
              <Flex
                align="center"
                pr="4"
                color="gray.400"
                _hover={{ color: "white" }}
              >
                <AccordionButton _expanded={{ color: "white" }} px="1" py="2">
                  <AccordionIcon />
                  <Box as="span" flex={1} textAlign="left" ml="1">
                    <Text fontSize="sm">{d.name}</Text>
                  </Box>
                </AccordionButton>
                <Box cursor="pointer">
                  <LuMoreHorizontal />
                </Box>
              </Flex>
              {d.reqs &&
                d.reqs.map((r) => (
                  <AccordionPanel
                    p={1}
                    pl="8"
                    color="gray.400"
                    key={r.id}
                    cursor="pointer"
                    _hover={{ color: "white", bg: "fuse.400" }}
                    onClick={() => onAdd(r)}
                  >
                    <Flex align="center" gridColumnGap={2}>
                      <CrudIcon crud={r.crud} />
                      <Text noOfLines={1} fontSize="sm">
                        {r.name}
                      </Text>
                    </Flex>
                  </AccordionPanel>
                ))}
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};

export default CollDrawer;
