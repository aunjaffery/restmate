import {
  Box,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { LuX } from "react-icons/lu";
import { useSnapshot } from "valtio";
import { store } from "../../AppStore";

const HeadersTab = ({ tab_id }) => {
  console.log("__HEAD TAB__");
  let t = store.tabs.find((t) => t.id === tab_id);
  const { headers } = useSnapshot(t);
  const findEmpty = () => {
    if (t.headers) {
      const findHeaders = t.headers.find((p) => p.key === "");
      if (findHeaders) return false;
      if (t.headers.length > 9) return false;
      return true;
    } else return true;
  };
  const onChangeHeader = (e, hd_id) => {
    let name = e.target.name;
    let p = t.headers.find((p) => p.id === hd_id);
    p[name] = name === "active" ? e.target.checked : e.target.value;
  };
  const onAddNewHeader = () => {
    let newHead = {
      id: nanoid(),
      key: "",
      value: "",
      active: true,
    };
    t.headers.push(newHead);
  };
  const onRmHeader = (hd_id) => {
    const index = t.headers.findIndex((t) => t.id === hd_id);
    if (index >= 0) {
      t.headers.splice(index, 1);
    }
  };
  return (
    <Box mt="2" pr="6">
      <Box mb="2">
        <Text color="gray.500" fontSize="xs">
          Headers
        </Text>
      </Box>
      {headers &&
        headers.map((p, i) => (
          <Flex
            key={p.id}
            borderWidth="1px"
            borderColor="gray.700"
            align="center"
            w="full"
            borderRadius="sm"
          >
            <Flex px="2" borderRightWidth="1px" borderColor="gray.700" h="full">
              <Checkbox
                colorScheme="gray"
                isChecked={p.active}
                name="active"
                onChange={(e) => onChangeHeader(e, p.id)}
              />
            </Flex>
            <Box flex={2} borderRightWidth="1px" borderColor="gray.700">
              <Input
                size="sm"
                borderWidth={0}
                placeholder="Key"
                color={p.active ? "white" : "gray.600"}
                value={p.key}
                name="key"
                onChange={(e) => onChangeHeader(e, p.id)}
              />
            </Box>
            <Box flex={3}>
              <InputGroup size="sm">
                <Input
                  borderWidth={0}
                  placeholder="Value"
                  color={p.active ? "white" : "gray.600"}
                  value={p.value}
                  name="value"
                  onChange={(e) => onChangeHeader(e, p.id)}
                />
                {i === 0 ? null : (
                  <InputRightElement>
                    <Box
                      cursor="pointer"
                      onClick={() => onRmHeader(p.id)}
                      color="gray.600"
                      _hover={{ color: "white" }}
                    >
                      <LuX />
                    </Box>
                  </InputRightElement>
                )}
              </InputGroup>
            </Box>
          </Flex>
        ))}
      {findEmpty() ? (
        <Flex>
          <Box cursor="pointer" onClick={onAddNewHeader} mt="2">
            <Text
              color="fuse.300"
              fontSize="sm"
              _hover={{ textDecoration: "underline" }}
            >
              Add more
            </Text>
          </Box>
        </Flex>
      ) : null}
    </Box>
  );
};

export default HeadersTab;
