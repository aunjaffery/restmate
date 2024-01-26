import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { memo, useState } from "react";
import ParamsTab from "../reqOptions/ParamsTab";
import BodyTab from "../reqOptions/BodyTab";
import RspComp from "../response/RspComp";
import HeadersTab from "../reqOptions/HeadersTab";
import ReqInput from "../reqOptions/ReqInput";
import { store } from "../../AppStore";
import { Run } from "../../../wailsjs/go/main/App";

const ReqTab = memo(({ tab_id }) => {
  console.log("__REQTAB reRENDER__");
  const [rspObj, setRspObj] = useState(null);
  const [reqLoading, setReqLoading] = useState(false);

  let reqTabStyle = {
    px: "1",
    mx: "2",
    _focusVisible: { outline: "none" },
    _selected: {
      borderBottomWidth: "2px",
      borderColor: "dark.300",
      color: "dark.300",
    },
  };
  const activeTab = () => {
    return false;
  };
  const onSend = async () => {
    //why not send whole tab
    let o = store.tabs.find((t) => t.id === tab_id);
    let t = { ...o };
    let prms = t.params.filter((p) => p.active && p.key !== "");
    let urlString = t.url;
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
    let heads = t.headers
      .filter((h) => h.active && h.key !== "")
      .map((h) => ({ key: h.key, value: h.value }));
    let reqBodyJson = t.body.payload;
    let method = t.crud;
    try {
      setReqLoading(true);
      let rsp = await Run(method, urlString, reqBodyJson, contentType, heads);
      setRspObj(rsp);
      setReqLoading(false);
    } catch (err) {
      setReqLoading(false);
    }
  };
  return (
    <Box px="4">
      <ReqInput tab_id={tab_id} onSend={onSend} />
      <Box mt="4">
        <Flex w="full">
          <Box
            borderRightWidth="1px"
            borderColor={useColorModeValue("light.50", "dark.50")}
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
                  <ParamsTab tab_id={tab_id} />
                </TabPanel>
                <TabPanel p="2">
                  <HeadersTab tab_id={tab_id} />
                </TabPanel>
                <TabPanel p="2">
                  <BodyTab tab_id={tab_id} />
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
});
export default ReqTab;
