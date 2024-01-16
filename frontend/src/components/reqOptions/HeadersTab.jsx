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

const HeadersTab = ({ reqHeaders, setReqHeaders }) => {
  const onChangeHandler = (e, id) => {
    let name = e.target.name;
    const findParams = reqHeaders.find((p) => p.id === id);
    findParams[name] = name === "active" ? e.target.checked : e.target.value;
    setReqHeaders([...reqHeaders]);
  };
  const findEmpty = () => {
    const findParams = reqHeaders.find((p) => p.key === "");
    if (findParams) return false;
    if (reqHeaders.length > 9) return false;
    return true;
  };
  const onAddReqParams = () => {
    if (reqHeaders.length > 9) return;
    let newParm = {
      id: nanoid(),
      key: "",
      value: "",
      active: true,
    };
    setReqHeaders([...reqHeaders, newParm]);
  };
  const onRmReqParams = (id) => {
    if (reqHeaders.length <= 1) return;
    let filter = reqHeaders.filter((p) => p.id !== id);
    setReqHeaders([...filter]);
  };
  return (
    <Box mt="2" pr="6">
      <Box mb="2">
        <Text color="gray.500" fontSize="xs">
          Headers
        </Text>
      </Box>
      {reqHeaders.map((p, i) => (
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
              onChange={(e) => onChangeHandler(e, p.id)}
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
              onChange={(e) => onChangeHandler(e, p.id)}
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
                onChange={(e) => onChangeHandler(e, p.id)}
              />
              {i === 0 ? null : (
                <InputRightElement>
                  <Box
                    cursor="pointer"
                    onClick={() => onRmReqParams(p.id)}
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
          <Box cursor="pointer" onClick={onAddReqParams} mt="2">
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
