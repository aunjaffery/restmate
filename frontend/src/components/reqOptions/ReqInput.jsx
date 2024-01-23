import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
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
        <Flex align="center" color="gray.400">
          <Box mb="3px">
            <LuUnplug size="14" />
          </Box>
          <Text fontSize="sm" fontWeight="bold" ml="2" color="gray.300">
            {name}
          </Text>
        </Flex>
      </Box>
      <form onSubmit={onSend}>
        <Flex justify="center" align="center">
          <Flex
            align="center"
            w="full"
            borderWidth="1px"
            borderColor="gray.700"
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
            <Box bg="gray.700" minH="25px" w="1px"></Box>
            <Input
              color="white"
              name="url"
              size="md"
              onChange={(e) => onChangeUrl(tab_id, e.target.value)}
              value={url}
              _focusVisible={{ outline: "none" }}
              borderLeftRadius="none"
              borderWidth={0}
            />
          </Flex>
          <Button
            type="submit"
            bg="fuse.300"
            size="lg"
            ml="4"
            borderRadius="md"
          >
            Send
          </Button>
          <Button
            bg="fuse.400"
            size="lg"
            ml="4"
            borderRadius="md"
            p="0"
            color="gray.400"
            onClick={onOpen}
          >
            <LuSave size="20" />
          </Button>
        </Flex>
      </form>
      {isOpen && <SaveReq isOpen={isOpen} onClose={onClose} req={t} />}
    </Box>
  );
};

export default ReqInput;
