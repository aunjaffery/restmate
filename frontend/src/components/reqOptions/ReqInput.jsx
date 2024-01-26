import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import { onChangeUrl, store } from "../../AppStore";
import { LuSave, LuUnplug } from "react-icons/lu";
import SaveReq from "../modal/SaveReq";

const ReqInput = ({ tab_id, onSend }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  console.log("__INPUT RERENDER__");
  let t = store.tabs.find((t) => t.id === tab_id);
  const { name, url, crud } = useSnapshot(t);
  const onChangeCrud = (val) => {
    t.crud = val;
  };
  return (
    <Box pt="5">
      <Box pb="3" ml="1">
        <Flex align="center" color="gray.500" maxW="600px">
          <Box mb="3px">
            <LuUnplug size="14" />
          </Box>
          <Text fontSize="sm" fontWeight="bold" ml="2" noOfLines={1}>
            {name}
          </Text>
        </Flex>
      </Box>
      <Flex justify="center" align="center">
        <Flex
          align="center"
          w="full"
          borderWidth="1px"
          borderColor={useColorModeValue("light.50", "dark.50")}
          h="50px"
          borderRadius="md"
        >
          <Select
            maxW="120px"
            size="md"
            onChange={(e) => onChangeCrud(e.target.value)}
            name="method"
            borderRightRadius="none"
            borderWidth={0}
            _focusVisible={{ outline: "none" }}
            value={crud}
          >
            <option value="GET" style={{ color: "#38A169" }}>
              GET
            </option>
            <option value="POST" style={{ color: "#D69E2E" }}>
              POST
            </option>
            <option value="PUT" style={{ color: "#3182CE" }}>
              PUT
            </option>
            <option value="DEL" style={{ color: "#D53F8C" }}>
              DELETE
            </option>
          </Select>
          <Box
            bg={useColorModeValue("gray.400", "gray.700")}
            minH="25px"
            w="1px"
          ></Box>
          <Input
            name="url"
            size="md"
            onChange={(e) => onChangeUrl(tab_id, e.target.value)}
            value={url}
            _focusVisible={{ outline: "none" }}
            borderLeftRadius="none"
            borderWidth={0}
          />
        </Flex>
        <Button onClick={onSend} size="lg" ml="4">
          Send
        </Button>
        <Button
          // bg={useColorModeValue("light.200", "dark.200")}
          size="lg"
          ml="4"
          p="0"
          onClick={onOpen}
          variant="second"
        >
          <LuSave size="20" />
        </Button>
      </Flex>
      {isOpen && <SaveReq isOpen={isOpen} onClose={onClose} req={t} />}
    </Box>
  );
};

export default ReqInput;
