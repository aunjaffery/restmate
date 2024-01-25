import {
  Box,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { LuX } from "react-icons/lu";
import { useSnapshot } from "valtio";
import { store } from "../../AppStore";

const ParamsTab = ({ tab_id }) => {
  console.log("__PARAMS TAB__");
  let t = store.tabs.find((t) => t.id === tab_id);
  const { params } = useSnapshot(t);
  const findEmpty = () => {
    if (t.params) {
      const findParams = t.params.find((p) => p.key === "");
      if (findParams) return false;
      if (t.params.length > 9) return false;
      return true;
    } else return true;
  };
  const onAddNewParam = () => {
    let newParam = {
      id: nanoid(),
      key: "",
      value: "",
      active: true,
    };
    t.params.push(newParam);
  };

  const onChangeParam = (e, prm_id) => {
    let name = e.target.name;
    let p = t.params.find((p) => p.id === prm_id);
    p[name] = name === "active" ? e.target.checked : e.target.value;
  };
  const onRmParam = (prm_id) => {
    const index = t.params.findIndex((t) => t.id === prm_id);
    if (index >= 0) {
      t.params.splice(index, 1);
    }
  };
  return (
    <Box mt="2" pr="6">
      <Box mb="2">
        <Text color="gray.500" fontSize="xs">
          Query Params
        </Text>
      </Box>
      <Box
        borderTopWidth="1px"
        borderColor={useColorModeValue("light.50", "dark.50")}
      >
        {params &&
          params.map((p, i) => (
            <Flex
              key={p.id}
              borderWidth="1px"
              borderColor={useColorModeValue("light.50", "dark.50")}
              borderTopWidth={0}
              align="center"
              w="full"
              borderRadius="sm"
            >
              <Flex
                px="2"
                borderRightWidth="1px"
                h="full"
                borderColor={useColorModeValue("light.50", "dark.50")}
              >
                <Checkbox
                  colorScheme="gray"
                  isChecked={p.active}
                  name="active"
                  onChange={(e) => onChangeParam(e, p.id)}
                />
              </Flex>
              <Box
                flex={2}
                borderRightWidth="1px"
                borderColor={useColorModeValue("light.50", "dark.50")}
              >
                <Input
                  size="sm"
                  borderWidth={0}
                  placeholder="Key"
                  color={
                    p.active
                      ? useColorModeValue("gray.800", "white")
                      : "gray.500"
                  }
                  value={p.key}
                  name="key"
                  onChange={(e) => onChangeParam(e, p.id)}
                />
              </Box>
              <Box flex={3}>
                <InputGroup size="sm">
                  <Input
                    borderWidth={0}
                    placeholder="Value"
                    color={
                      p.active
                        ? useColorModeValue("gray.800", "white")
                        : "gray.500"
                    }
                    value={p.value}
                    name="value"
                    onChange={(e) => onChangeParam(e, p.id)}
                  />
                  {i === 0 ? null : (
                    <InputRightElement>
                      <Box
                        cursor="pointer"
                        onClick={() => onRmParam(p.id)}
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
      </Box>
      {findEmpty() ? (
        <Flex>
          <Box cursor="pointer" onClick={onAddNewParam} mt="2">
            <Text
              color="dark.300"
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

export default ParamsTab;
