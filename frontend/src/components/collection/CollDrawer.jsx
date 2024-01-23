import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LuCheck, LuMoreHorizontal, LuPlus, LuX } from "react-icons/lu";
import CrudIcon from "../misc/CrudIcon";
import { openColTab } from "../../AppStore";
import { useSnapshot } from "valtio";
import { collection } from "../../ColStore";

const CollDrawer = () => {
  const { isOpen, onToggle } = useDisclosure();
  let { cols } = useSnapshot(collection);
  console.log("real cols-->", cols);
  let onAdd = (r) => {
    if (r.id !== "pop01" && r.id !== "pop02") return;
    openColTab(r);
  };
  return (
    <Box w="300px" minW="300px" borderColor="gray.700" borderRightWidth="1px">
      <Box h="37px" borderColor="gray.700" borderBottomWidth="1px">
        {isOpen ? (
          <Flex h="full" align="center" justify="space-between">
            <Box w="full" pl="2">
              <Input
                size="sm"
                placeholder="Collection name"
                p="1"
                borderWidth={0}
                borderBottomWidth="1px"
                borderBottomColor="fuse.300"
                _focusVisible={{ outline: "none" }}
                _hover={{ borderBottomColor: "fuse.300" }}
              />
            </Box>
            <Box
              onClick={onToggle}
              p="1"
              ml="2"
              borderRadius="lg"
              color="gray.500"
              cursor="pointer"
              _hover={{
                bg: "gray.600",
                color: "white",
              }}
            >
              <LuCheck />
            </Box>
            <Box
              onClick={onToggle}
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
              <LuX />
            </Box>
          </Flex>
        ) : (
          <Flex h="100%" align="center" pl="4" justify="space-between">
            <Text fontSize="sm" fontWeight="bold">
              Collections
            </Text>
            <Box
              p="1"
              onClick={onToggle}
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
        )}
      </Box>
      <Box mt="4">
        <Accordion allowToggle>
          {cols &&
            cols.length &&
            cols.map((d) => (
              <AccordionItem key={d.id} border="none">
                <Flex
                  align="center"
                  pr="4"
                  color="gray.400"
                  _hover={{ color: "white" }}
                >
                  <AccordionButton _expanded={{ color: "white" }} px="1" py="2">
                    <AccordionIcon mb="3px" />
                    <Box as="span" flex={1} textAlign="left" ml="1">
                      <Text fontSize="sm">{d.name}</Text>
                    </Box>
                  </AccordionButton>
                  <Box cursor="pointer">
                    <LuMoreHorizontal />
                  </Box>
                </Flex>
                {d.requests &&
                  d.requests.map((r) => (
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
