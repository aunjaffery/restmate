import { Box, Checkbox, Flex, Input, Text } from "@chakra-ui/react";

const ParamsTab = ({ paramStr, setParamStr, url, setUrl }) => {
  // issues: error if url is empty
  const onChangeHandler = (e, i) => {
    let name = e.target.name;
    let val = e.target.value;
    let u = url.split("?");
    if (u[1]) {
      //exp p = ["key1=val1", "key2=val2"]
      let p = u[1].split("&");
      //exp kv = ["key1", "val1"] for given index i
      if (p[i]) {
        let kv = p[i].split("=");
        if (name === "key") {
          kv[0] = val;
        }
        if (name === "value") {
          kv[1] = val;
        }
        //joing again with "=" after change key or value, format p
        p[i] = kv.join("=");
        let newUrl = u[0] + "?" + p.join("&");
        setUrl(newUrl);
        setParamStr(p);
      } else {
        if (name === "key") {
          p.push(val);
          let newUrl = u[0] + "?" + p.join("&");
          setUrl(newUrl);
          setParamStr(p);
        }
        if (name === "value") {
          p.push(`=${val}`);
          let newUrl = u[0] + "?" + p.join("&");
          setUrl(newUrl);
          setParamStr(p);
        }
      }
    } else {
      if (name === "key") {
        let newUrl = u[0] + "?" + val;
        setUrl(newUrl);
        setParamStr([val]);
      }
      if (name === "value") {
        let newUrl = u[0] + "?" + "=" + val;
        setUrl(newUrl);
        setParamStr([`=${val}`]);
      }
    }
  };

  const vals = (e, type) => {
    let sp = e.split("=");
    if (type === "key") return sp[0];
    if (type === "value") {
      sp.shift();
      return sp;
    }
    return "";
  };
  const onAddReqParams = () => {
    if (paramStr.length > 9) return;
    setParamStr([...paramStr, ""]);
  };
  return (
    <Box mt="2" pr="6">
      <Box mb="2">
        <Text color="gray.500" fontSize="xs">
          Query Params
        </Text>
      </Box>
      {paramStr.map((p, i) => (
        <Flex
          key={i}
          borderWidth="1px"
          borderColor="gray.700"
          align="center"
          w="full"
          borderRadius="sm"
        >
          <Flex px="2" borderRightWidth="1px" borderColor="gray.700" h="full">
            <Checkbox colorScheme="gray" name="active" />
          </Flex>
          <Box flex={2} borderRightWidth="1px" borderColor="gray.700">
            <Input
              size="sm"
              borderWidth={0}
              placeholder="Key"
              value={vals(p, "key")}
              name="key"
              onChange={(e) => onChangeHandler(e, i)}
            />
          </Box>
          <Box flex={3}>
            <Input
              size="sm"
              borderWidth={0}
              placeholder="Value"
              value={vals(p, "value")}
              name="value"
              onChange={(e) => onChangeHandler(e, i)}
            />
          </Box>
        </Flex>
      ))}
      {paramStr[paramStr.length - 1] !== "" &&
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
        }
    </Box>
  );
};

export default ParamsTab;
