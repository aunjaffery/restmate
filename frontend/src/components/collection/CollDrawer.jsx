import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { LuArrowUpRight, LuCheck, LuPlus, LuX } from "react-icons/lu";
import CrudIcon from "../misc/CrudIcon";
import { openColTab } from "../../AppStore";
import { useSnapshot } from "valtio";
import { collection } from "../../ColStore";
import { nanoid } from "nanoid";
import { CreateCollection } from "../../../wailsjs/go/main/App";
import { toast } from "react-toastify";
import ColDetail from "../modal/ColDetail";

const CollDrawer = () => {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isOpenM,
    onOpen: onOpenM,
    onClose: onCloseM,
  } = useDisclosure();
  let { cols } = useSnapshot(collection);
  console.log("real cols-->", cols);

  const createNewCol = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    if (!name) return;
    let id = nanoid();
    try {
      console.log(id, name);
      let c = await CreateCollection(id, name);
      collection.cols = [...c];
      onToggle();
    } catch (error) {
      //toast not working for error
      console.log("in error", error);
      toast.error("hello");
    }
  };

  return (
    <Box
      w="300px"
      minW="300px"
      borderColor={useColorModeValue("light.50", "dark.50")}
      borderRightWidth="1px"
    >
      <Box
        h="37px"
        borderColor={useColorModeValue("light.50", "dark.50")}
        borderBottomWidth="1px"
      >
        {isOpen ? (
          <form onSubmit={createNewCol}>
            <Flex h="full" align="center" justify="space-between">
              <Box w="full" pl="2">
                <Input
                  size="sm"
                  placeholder="Collection name"
                  p="1"
                  name="name"
                  borderWidth={0}
                  borderBottomWidth="1px"
                  borderBottomColor="dark.300"
                  _focusVisible={{ outline: "none" }}
                  _hover={{ borderBottomColor: "dark.300" }}
                />
              </Box>
              <IconButton
                type="submit"
                ml="1"
                color="gray.500"
                size="xs"
                icon={<LuCheck size="16" />}
                bg="none"
                _hover={{
                  color: useColorModeValue("black", "white"),
                  bg: useColorModeValue("light.200", "dark.200"),
                }}
              />
              <IconButton
                onClick={onToggle}
                mr="2"
                color="gray.500"
                size="xs"
                icon={<LuX size="16" />}
                bg="none"
                _hover={{
                  color: useColorModeValue("black", "white"),
                  bg: useColorModeValue("light.200", "dark.200"),
                }}
              />
            </Flex>
          </form>
        ) : (
          <Flex h="100%" align="center" pl="4" justify="space-between">
            <Text fontSize="sm" fontWeight="bold" color="gray.500">
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
                color: useColorModeValue("black", "white"),
                bg: useColorModeValue("light.200", "dark.200"),
              }}
            >
              <LuPlus />
            </Box>
          </Flex>
        )}
      </Box>
      <Box mt="4">
        {cols && cols.length ? (
          <Accordion allowToggle>
            {cols.map((d) => (
              <AccordionItem key={d.id} border="none">
                <Flex
                  align="center"
                  color={useColorModeValue("gray.600", "gray.400")}
                  _hover={{ color: useColorModeValue("black", "white") }}
                >
                  <AccordionButton
                    _expanded={{ color: useColorModeValue("black", "white") }}
                    px="1"
                    py="2"
                  >
                    <AccordionIcon mb="3px" />
                    <Box as="span" flex={1} textAlign="left" ml="1">
                      <Text noOfLines={1} fontSize="sm" maxW="220px">
                        {d.name}
                      </Text>
                    </Box>
                  </AccordionButton>
                  <Box
                    pr="4"
                    cursor="pointer"
                    _hover={{ color: "blue.400" }}
                    onClick={onOpenM}
                  >
                    <LuArrowUpRight size="16" />
                  </Box>
                </Flex>

                {d.requests && d.requests.length ? (
                  d.requests.map((r) => (
                    <AccordionPanel
                      p={1}
                      pl="8"
                      color={useColorModeValue("gray.600", "gray.400")}
                      key={r.id}
                      cursor="pointer"
                      _hover={{
                        color: useColorModeValue("black", "white"),
                        bg: useColorModeValue("light.200", "dark.200"),
                      }}
                      onClick={() => openColTab(d.id, r.id)}
                    >
                      <Flex align="center" gridColumnGap={2}>
                        <CrudIcon crud={r.crud} />
                        <Text noOfLines={1} fontSize="sm" maxW="200px">
                          {r.name}
                        </Text>
                      </Flex>
                    </AccordionPanel>
                  ))
                ) : (
                  <AccordionPanel p={1} pl="8" color="gray.400">
                    <Text fontSize="sm">No requests found</Text>
                  </AccordionPanel>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Flex h="200px" justify="center" align="center">
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.400", "gray.600")}
            >
              No Collections found
            </Text>
          </Flex>
        )}
      </Box>
      <ColDetail isOpen={isOpenM} onClose={onCloseM} />
    </Box>
  );
};

export default CollDrawer;
