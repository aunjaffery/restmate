import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { memo, useState } from "react";
import ParamsTab from "../reqOptions/ParamsTab";
import BodyTab from "../reqOptions/BodyTab";
import RspComp from "../response/RspComp";
import HeadersTab from "../reqOptions/HeadersTab";
import ReqInput from "../reqOptions/ReqInput";
import { store } from "../../AppStore";

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
      borderColor: "fuse.300",
      color: "fuse.300",
    },
  };
  const activeTab = () => {
    return false;
  };
  const onSend = (e) => {
    e.preventDefault();
    let req = store.tabs.find((x) => x.id === tab_id);
    console.log(req.url);
  };
  return (
    <Box px="4">
      <ReqInput tab_id={tab_id} onSend={onSend} />
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
