import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { nanoid } from "nanoid";
import ParamsTab from "../reqOptions/ParamsTab";
import BodyTab from "../reqOptions/BodyTab";
import RspComp from "../response/RspComp";
import HeadersTab from "../reqOptions/HeadersTab";
import { Run } from "../../../wailsjs/go/main/App";

const ReqTab = ({ tabdata, onCrudChange }) => {
  const [url, setUrl] = useState("");
  const [rspObj, setRspObj] = useState(null);
  const [reqLoading, setReqLoading] = useState(false);
  const [reqBodyJson, setReqBodyJson] = useState("");
  const [reqHeaders, setReqHeaders] = useState([
    {
      id: nanoid(),
      key: "",
      value: "",
      active: true,
    },
  ]);
  const [reqParams, setReqParams] = useState([
    {
      id: nanoid(),
      key: "",
      value: "",
      active: true,
    },
  ]);
  const onSend = async (e) => {
    e.preventDefault();
    let urlString = e.target.url.value;
    if (!urlString) return;
    let method = e.target.method.value;
    if (method === "DEL") {
      method = "DELETE";
    }
    let prms = reqParams.filter((p) => p.active && p.key !== "");
    let andJoin = "";
    if (prms && prms.length) {
      let prmPairs = [];
      prms.map((x) => prmPairs.push(`${x.key}=${x.value}`));
      andJoin = prmPairs.join("&");
    }
    if (andJoin != "") {
      urlString = `${urlString}?${andJoin}`;
    }
    let contentType = "application/json";
    let heads = reqHeaders
      .filter((h) => h.active && h.key !== "")
      .map((h) => ({ key: h.key, value: h.value }));
    try {
      setReqLoading(true);
      let rsp = await Run(method, urlString, reqBodyJson, contentType, heads);
      setRspObj(rsp);
      setReqLoading(false);
    } catch (err) {
      setReqLoading(false);
    }
  };
  let reqTabStyle = {
    px: "1",
    mx: "2",
    _focusVisible: { outline: "none" },
    _selected: {
      borderBottomWidth: "2px",
      borderColor: "fuse.300",
      color: "fuse.300",
    },
  };
  const onUrlChange = (e) => {
    let val = e.target.value;
    setUrl(val);
  };
  const activeTab = () => {
    let a = reqParams.find((x) => x.key !== "" && x.active);
    return a ? true : false;
  };
  return (
    <Box pt="10" px="4">
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
              size="lg"
              onChange={(e) => onCrudChange(e.target.value, tabdata.id)}
              name="method"
              borderRightRadius="none"
              borderWidth={0}
              _focusVisible={{ outline: "none" }}
              defaultValue="get"
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
              size="lg"
              onChange={onUrlChange}
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
            isLoading={reqLoading}
          >
            Send
          </Button>
        </Flex>
      </form>
      <Box mt="4">
        <Flex w="full">
          <Box
            borderRightWidth="1px"
            borderColor="gray.700"
            w="full"
            flex={1}
            maxW="50%"
          >
            <Tabs size="sm">
              <TabList border="none">
                <Tab {...reqTabStyle}>
                  Params
                  {activeTab() && (
                    <Box
                      w="6px"
                      ml="5px"
                      mb="2"
                      h="6px"
                      borderRadius="full"
                      bg="green.400"
                    />
                  )}
                </Tab>
                <Tab {...reqTabStyle}>Headers</Tab>
                <Tab {...reqTabStyle}>Body</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p="2">
                  <ParamsTab
                    reqParams={reqParams}
                    setReqParams={setReqParams}
                  />
                </TabPanel>
                <TabPanel p="2">
                  <HeadersTab
                    reqHeaders={reqHeaders}
                    setReqHeaders={setReqHeaders}
                  />
                </TabPanel>
                <TabPanel p="2">
                  <BodyTab
                    reqBodyJson={reqBodyJson}
                    setReqBodyJson={setReqBodyJson}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <Box flex={1} maxW="50%">
            <RspComp reqLoading={reqLoading} rspObj={rspObj} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
export default ReqTab;
